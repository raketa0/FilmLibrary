
namespace Application.Film.DTOs
{
    public class FilmDto
    {
        public int Id { get; set; }
        public Guid CreatorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int YearOfRelease { get; set; }
        public int Duration { get; set; }
        public string Description { get; set; } = string.Empty;
        public string LinkToPoster { get; set; } = string.Empty;
        public string LinkToFilm { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public double Rating { get; set; }
        public int AgeRestriction { get; set; }
        public List<int> GenreIds { get; set; } = new();
        public List<FilmPersonDto> Persons { get; set; } = new();


    }
}
