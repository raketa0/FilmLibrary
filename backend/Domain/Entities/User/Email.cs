using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.User
{
    public class Email : ValueObject
    {
        public string Value { get; private set; }
        private Email(string value)
        {
            Value = value;
        }
        public static Email Create(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email не может быть пустым");
            var emailAttribute = new EmailAddressAttribute();
            if (!emailAttribute.IsValid(email))
                throw new ArgumentException("Некорректный формат email");
            return new Email(email);
        }
        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
    }


  
}
