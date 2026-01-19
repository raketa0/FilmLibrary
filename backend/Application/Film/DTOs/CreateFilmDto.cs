
namespace Application.Film.DTOs
{
    public class CreateFilmDto
    {
        public Guid CreatorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int YearOfRelease { get; set; }
        public int Duration { get; set; }
        public string Description { get; set; } = string.Empty;
        public string LinkToPoster { get; set; } = string.Empty;
        public string LinkToFilm { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int AgeRestriction { get; set; }

        public List<int> GenreIds { get; set; } = new();

    }

}
