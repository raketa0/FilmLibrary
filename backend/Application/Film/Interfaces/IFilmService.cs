using Application.Film.DTOs;


namespace Application.Film.Interfaces
{
    public interface IFilmService
    {
        Task<FilmDto> CreateAsync(CreateFilmDto dto);
        Task<FilmDto> GetByIdAsync(int id);
        Task<IEnumerable<FilmDto>> GetAllAsync();
        Task<IEnumerable<FilmDto>> SearchAsync(string? name, IEnumerable<int>? genreIds);
        Task<FilmDto> UpdateAsync(int filmId, UpdateFilmDto dto);
        Task DeleteAsync(int id);
        Task RateAsync(int filmId, int value);
        Task UpdatePersonsAsync(
            int filmId, IEnumerable<FilmPersonDto> persons);
        Task<IEnumerable<MyFilmStatsDto>> GetMyFilmsStatsAsync(Guid userId);
        Task AddViewAsync(int filmId, Guid userId);
    
    }
}
