using Domain.Entities.Person;

namespace Domain.Repositories
{
    public interface IPersonRepository
    {
        Task<IEnumerable<Person>> GetAllAsync();
        Task<Person?> GetByIdAsync(int id);
        Task AddAsync(Person person);
        Task UpdateAsync(Person person);
        Task DeleteAsync(Person person);
    }
}
