
namespace Domain.Entities.HistoryOfViewFilm
{
    public class HistoryOfViewFilm
    {
        public Guid UserId { get; private set; }
        public int FilmId { get; private set; }

        public DateTime DateView { get; private set; }
        public int Duration { get; private set; }

        public Evaluation? Evaluation { get; private set; }

        private HistoryOfViewFilm() {}

        private HistoryOfViewFilm
        (
            Guid userId,
            int filmId,
            DateTime dateView,
            int duration)
        {
            UserId = userId;
            FilmId = filmId;
            DateView = dateView;
            Duration = duration;
        }

        public static HistoryOfViewFilm Create(
            Guid userId,
            int filmId,
            DateTime dateView,
            int duration)
        {
            if (duration < 0)
                throw new ArgumentException("Duration must be positive.");

            return new HistoryOfViewFilm(
                userId,
                filmId,
                dateView,
                duration);
        }

        public void Rate(Evaluation evaluation)
        {
            if (Duration <= 0)
                throw new InvalidOperationException("Cannot rate without viewing.");

            Evaluation = evaluation;
        }
    }
}
