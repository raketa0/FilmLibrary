
using Domain.Entities.HistoryOfViewFilm;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class HistoryOfViewFilmRepository : IHistoryOfViewFilmRepository
    {
        private readonly FilmLibraryDbContext _context;

        public HistoryOfViewFilmRepository(FilmLibraryDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(HistoryOfViewFilm history)
        {
            _context.HistoryOfViews.Add(history);
            await _context.SaveChangesAsync();
        }

        public async Task<HistoryOfViewFilm?> GetAsync(Guid userId, int filmId)
        {
            return await _context.HistoryOfViews
                .FirstOrDefaultAsync(h => h.UserId == userId && h.FilmId == filmId);
        }

        public async Task<IEnumerable<HistoryOfViewFilm>> GetByUserIdAsync(Guid userId)
        {
            return await _context.HistoryOfViews
                .Where(h => h.UserId == userId)
                .ToListAsync();
        }

        public async Task<int> CountViewsByFilmIdAsync(int filmId)
        {
            return await _context.HistoryOfViews
                .CountAsync(h => h.FilmId == filmId);
        }


    }

}
