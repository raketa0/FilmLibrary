using Application.Person.DTOs;

namespace Application.Person.Interfaces
{
    public interface ICareerService
    {
        Task<IEnumerable<CareerDto>> GetAllAsync();
        Task<CareerDto?> GetByIdAsync(int id);
    }
}
