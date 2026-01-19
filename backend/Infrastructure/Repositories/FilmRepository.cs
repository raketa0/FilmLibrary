using Domain.Entities.Film;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class FilmRepository : IFilmRepository
    {
        private readonly FilmLibraryDbContext _context;

        public FilmRepository(FilmLibraryDbContext context)
        {
            _context = context;
        }

        public async Task<Film?> GetByIdAsync(int id)
        {
            return await _context.Films
                .FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<IEnumerable<Film>> GetAllAsync()
        {
            return await _context.Films.ToListAsync();
        }

        public async Task AddAsync(Film film)
        {
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Film film)
        {
            _context.Films.Update(film);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var film = await GetByIdAsync(id);
            if (film != null)
            {
                _context.Films.Remove(film);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Film>> SearchAsync(
            string? name,
            IEnumerable<int>? genreIds)
        {
            IQueryable<Film> query = _context.Films;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(f => f.Name.Contains(name));

            if (genreIds != null && genreIds.Any())
            {
                query = query.Where(f =>
                    _context.FilmGenres.Any(fg =>
                        fg.FilmId == f.Id &&
                        genreIds.Contains(fg.GenreId)));
            }

            return await query.ToListAsync();
        }

        public async Task AddGenresAsync(int filmId, IEnumerable<int> genreIds)
        {
            var filmGenres = genreIds.Select(genreId => new FilmGenre
            {
                FilmId = filmId,
                GenreId = genreId
            });

            _context.FilmGenres.AddRange(filmGenres);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveGenresAsync(int filmId)
        {
            var filmGenres = _context.FilmGenres
                .Where(fg => fg.FilmId == filmId);
            _context.FilmGenres.RemoveRange(filmGenres);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<int>> GetGenreIdsAsync(int filmId)
        {
            return await _context.FilmGenres
                .Where(fg => fg.FilmId == filmId)
                .Select(fg => fg.GenreId)
                .ToListAsync();
        }


    }
}
