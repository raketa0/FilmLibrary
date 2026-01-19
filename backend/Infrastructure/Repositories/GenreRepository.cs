using Domain.Entities.Genre;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly FilmLibraryDbContext _context;

        public GenreRepository(FilmLibraryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Genre>> GetAllAsync()
        {
            return await _context.Genres
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Genre?> GetByIdAsync(int id)
        {
            return await _context.Genres
                .FirstOrDefaultAsync(g => g.Id == id);
        }
    }
}
