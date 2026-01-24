namespace Domain.Entities.Film
{
    public class FilmPerson
    {
        public int FilmId { get; private set; }
        public int PersonId { get; private set; }
        public int CareerId { get; private set; }

        private FilmPerson() { }

        private FilmPerson(int filmId, int personId, int careerId)
        {
            FilmId = filmId;
            PersonId = personId;
            CareerId = careerId;
        }

        public static FilmPerson Create(int filmId, int personId, int careerId)
            => new(filmId, personId, careerId);
    }
}
