using Application.Film.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
