namespace Application.Film.DTOs
{
    public class MyFilmStatsDto
    {
        public int FilmId { get; set; }
        public string Name { get; set; } = null!;
        public double Rating { get; set; }
        public int ViewsCount { get; set; }
    }
}