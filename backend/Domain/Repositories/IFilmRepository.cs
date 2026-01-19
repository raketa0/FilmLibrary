
using Domain.Entities.Film;

namespace Domain.Repositories
{
    public interface IFilmRepository
    {
        Task<Film?> GetByIdAsync(int id);
        Task<IEnumerable<Film>> GetAllAsync();
        Task AddAsync(Film film);
        Task UpdateAsync(Film film);
        Task DeleteAsync(int id);

        Task<IEnumerable<Film>> SearchAsync(
            string? title,
            IEnumerable<int>? genreIds);

        Task AddGenresAsync(int filmId, IEnumerable<int> genreIds);
        Task RemoveGenresAsync(int filmId);
        Task<IEnumerable<int>> GetGenreIdsAsync(int filmId);

    }
}
