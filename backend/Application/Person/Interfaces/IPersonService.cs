using Application.Person.DTOs;

namespace Application.Person.Interfaces
{
    public interface IPersonService
    {
        Task<IEnumerable<PersonDto>> GetAllAsync();
        Task<PersonDto> GetByIdAsync(int id);
        Task<PersonDto> CreateAsync(CreatePersonDto dto);
        Task<PersonDto> UpdateAsync(int id, UpdatePersonDto dto);
        Task DeleteAsync(int id);
    }
}
