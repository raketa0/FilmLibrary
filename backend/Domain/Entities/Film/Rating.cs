
namespace Domain.Entities.Film
{
    public class Rating
    {
        public int Value { get; }

        private Rating(int value)
        {
            Value = value;
        }

        public Rating Create(int value)
        {
            if (value < 1 || value > 10)
                throw new ArgumentException("Rating must be between 1 and 10.");

            return new Rating(value);
        }

        public override bool Equals(object? obj)
        {
            return obj is Rating rating && Value == rating.Value;
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }
    }
}
