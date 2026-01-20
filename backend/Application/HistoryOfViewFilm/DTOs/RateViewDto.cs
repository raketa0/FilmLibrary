

namespace Application.HistoryOfViewFilm.DTOs
{
    public class RateViewDto
    {
        public Guid UserId { get; set; }
        public int FilmId { get; set; }
        public int Value { get; set; }
    }
}
