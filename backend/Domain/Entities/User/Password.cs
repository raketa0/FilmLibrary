using BCrypt.Net;
using Domain.Entities.User;

namespace Domain.Entities.User
{
    public class Password : ValueObject
    {
        public string HashedValue { get; private set; }

        private Password(string hashedValue)
        {
            HashedValue = hashedValue;
        }

        public static Password Create(string plainPassword)
        {
            if (string.IsNullOrWhiteSpace(plainPassword) || plainPassword.Length < 6)
                throw new ArgumentException("Пароль слишком слабый (минимум 6 символов)");

            var hashed = BCrypt.Net.BCrypt.HashPassword(plainPassword);
            return new Password(hashed);
        }

        public bool Verify(string plainPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainPassword, HashedValue);
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return HashedValue;
        }
    }
}