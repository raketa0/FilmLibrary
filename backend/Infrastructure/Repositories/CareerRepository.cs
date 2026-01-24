using Domain.Entities.Person;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CareerRepository : ICareerRepository
    {
        private readonly FilmLibraryDbContext _context;

        public CareerRepository(FilmLibraryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Career>> GetAllAsync()
            => await _context.Careers.ToListAsync();


        public async Task<Career?> GetByIdAsync(int id)
            => await _context.Careers.FirstOrDefaultAsync(c => c.Id == id);
    }
}
