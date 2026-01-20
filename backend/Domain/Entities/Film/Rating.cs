namespace Domain.Entities.Film
{
    public class Rating
    {
        public int Total { get; }
        public int Votes { get; }

        private Rating(int total, int votes)
        {
            Total = total;
            Votes = votes;
        }

        public static Rating Empty()
            => new Rating(0, 0);

        public Rating Add(int value)
        {
            if (value < 1 || value > 10)
                throw new ArgumentException("Rating must be between 1 and 10");

            return new Rating(Total + value, Votes + 1);
        }

        public double Average()
        {
            if (Votes == 0)
                return 0;

            return (double)Total / Votes;
        }
    }
}
