using Application.Genre.DTOs;
using Application.Genre.Interfaces;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Genre.Services
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepository;

        public GenreService(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        public async Task<IEnumerable<GenreDto>> GetAllAsync()
        {
            var genres = await _genreRepository.GetAllAsync();
            return genres.Select(g => new GenreDto
            {
                Id = g.Id,
                Name = g.Name
            });
        }

        public async Task<GenreDto?> GetByIdAsync(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id);
            if (genre == null) return null;

            return new GenreDto
            {
                Id = genre.Id,
                Name = genre.Name
            };
        }

    }
}
