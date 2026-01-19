
namespace Domain.Entities.HistoryOfViewFilm
{
    public class Evaluation
    {
        public int Value { get; }

        private Evaluation(int value)
        {
            Value = value;
        }

        public static Evaluation Create(int value)
        {
            if (value < 1 || value > 10)
                throw new ArgumentException("Evaluation must be between 1 and 10.");

            return new Evaluation(value);
        }

        public override bool Equals(object? obj)
        {
            return obj is Evaluation e && Value == e.Value;
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }
    }
}
