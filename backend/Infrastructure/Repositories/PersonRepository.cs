using Domain.Entities.Person;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly FilmLibraryDbContext _context;

        public PersonRepository(FilmLibraryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Person>> GetAllAsync()
        {
            return await _context.Persons.AsNoTracking().ToListAsync();
        }

        public async Task<Person?> GetByIdAsync(int id)
        {
            return await _context.Persons.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Person person)
        {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Person person)
        {
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Person person)
        {
            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
        }
    }
}
