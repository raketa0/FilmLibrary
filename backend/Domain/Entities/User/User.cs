using Domain.Exceptions;
using System;

namespace Domain.Entities.User
{
    public class User : AggregateRoot<Guid>
    {
        public ICollection<HistoryOfViewFilm.HistoryOfViewFilm> HistoryOfViews { get; private set; } = 
            new List<HistoryOfViewFilm.HistoryOfViewFilm>();
        public new Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Email? Email { get; set; }
        public Password? Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime RegistrationDate { get; private set; } = DateTime.Now;
        public string? LinkToAvatar { get; set; }

        private User() { }

        public static User Create(string name, string emailValue, string plainPassword, DateTime dateOfBirth)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentException("Имя обязательно");

            var email = Email.Create(emailValue);
            var password = Password.Create(plainPassword);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = name,
                Email = email,
                Password = password,
                DateOfBirth = dateOfBirth
            };

            user.ValidateAge();
            return user;
        }

        public void UpdateProfile(
            string newName,
            string? newAvatarLink = null,
            string? newEmail = null,
            string? newPassword = null,
            DateTime? newBirthDate = null)
        {
            if (string.IsNullOrEmpty(newName))
            {
                Name = newName;
            }

            if (!string.IsNullOrEmpty(newEmail)) 
            {
                Email = Email.Create(newEmail);
            }

            if (!string.IsNullOrEmpty(newPassword)) 
            {
                UpdatePassword(newPassword);
            }

            if (newBirthDate.HasValue) 
            {
                UpdateDateOfBirth(newBirthDate.Value);
            }

            if (newAvatarLink != null) 
            {
                LinkToAvatar = newAvatarLink;
            }
        }

        public bool IsAdult() => DateTime.Now.Year - DateOfBirth.Year >= 18;

		public void UpdatePassword(string newPassword)
		{
			Password = Password.Create(newPassword);
		}

		public void UpdateDateOfBirth(DateTime newDob)
		{
			DateOfBirth = newDob;
		}

		public void UpdateAvatar(string link)
		{
			LinkToAvatar = link;
		}


		private void ValidateAge()
        {
            if (!IsAdult())
                throw new DomainException("Несовершеннолетний: ограничения на контент");
        }
    }

    public abstract class AggregateRoot<TId> 
    {
        public TId Id { get; protected set; } = default!;
    }
}