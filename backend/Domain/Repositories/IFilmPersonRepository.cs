using Domain.Entities.Film;
using Domain.Entities.Person;

public interface IFilmPersonRepository
{
    Task AddAsync(FilmPerson filmPerson);
    Task RemoveAsync(int filmId, int personId, Career career);
    Task<IEnumerable<FilmPerson>> GetByFilmIdAsync(int filmId);
}
