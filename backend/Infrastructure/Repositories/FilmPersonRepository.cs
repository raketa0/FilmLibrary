using Domain.Entities.Film;
using Domain.Entities.Person;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class FilmPersonRepository : IFilmPersonRepository
{
    private readonly FilmLibraryDbContext _context;

    public FilmPersonRepository(FilmLibraryDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(FilmPerson filmPerson)
    {
        _context.FilmPersons.Add(filmPerson);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveAsync(int filmId, int personId, int career)
    {
        var fp = await _context.FilmPersons
            .FirstOrDefaultAsync(x =>
                x.FilmId == filmId &&
                x.PersonId == personId &&
                x.CareerId == career);

        if (fp != null)
        {
            _context.FilmPersons.Remove(fp);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<FilmPerson>> GetByFilmIdAsync(int filmId)
    {
        return await _context.FilmPersons
            .Where(fp => fp.FilmId == filmId)
            .ToListAsync();
    }
}
