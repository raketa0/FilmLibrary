using Domain.Entities.Person;


namespace Application.Film.DTOs
{
    public class FilmPersonDto
    {
        public int PersonId { get; set; }
        public Career Career { get; set; }
    }

}
