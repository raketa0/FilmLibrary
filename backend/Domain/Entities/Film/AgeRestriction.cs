

namespace Domain.Entities.Film
{
    public class AgeRestriction
    {
        public int Value { get; }

        private AgeRestriction(int value)
        {
            Value = value;
        }

        public static AgeRestriction Create(int value)
        {
            if (value < 0 || value > 21)
                throw new ArgumentException("Invalid age restriction.");

            return new AgeRestriction(value);
        }

        public bool IsAllowed(DateTime userBirthDate)
        {
            var age = DateTime.UtcNow.Year - userBirthDate.Year;
            return age >= Value;
        }

        public override bool Equals(object? obj)
        {
            return obj is AgeRestriction restriction && Value == restriction.Value;
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }
    }
}
