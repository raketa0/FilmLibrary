using Domain.Exceptions;
using System;

namespace Domain.Entities.User
{
    public class User : AggregateRoot<Guid>
    {
        public new Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public Email Email { get; private set; }
        public Password Password { get; private set; }
        public DateTime DateOfBirth { get; private set; }
        public DateTime RegistrationDate { get; private set; } = DateTime.Now;
        public string? LinkToAvatar { get; private set; }

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

        public void UpdateProfile(string newName, string? newAvatarLink)
        {
            if (string.IsNullOrEmpty(newName)) throw new ArgumentException("Новое имя обязательно");
            Name = newName;
            LinkToAvatar = newAvatarLink;
        }

        public bool IsAdult() => DateTime.Now.Year - DateOfBirth.Year >= 18; 

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