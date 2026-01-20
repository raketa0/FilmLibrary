using Domain.Entities.Person;

namespace Domain.Entities.Film
{
    public class FilmPerson
    {
        public int FilmId { get; private set; }
        public int PersonId { get; private set; }
        public Career Career { get; private set; }

        private FilmPerson() { }

        private FilmPerson(int filmId, int personId, Career career)
        {
            FilmId = filmId;
            PersonId = personId;
            Career = career;
        }

        public static FilmPerson Create(
            int filmId,
            int personId,
            Career career)
        {
            return new FilmPerson(filmId, personId, career);
        }
    }
}
