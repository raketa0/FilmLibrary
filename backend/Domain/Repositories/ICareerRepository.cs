using Domain.Entities.Person;


namespace Domain.Repositories
{
    public interface ICareerRepository
    {
        Task<IEnumerable<Career>> GetAllAsync();
        Task<Career?> GetByIdAsync(int id);
    }
}
