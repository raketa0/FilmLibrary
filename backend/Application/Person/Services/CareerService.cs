using Application.Person.DTOs;
using Application.Person.Interfaces;
using Domain.Repositories;

namespace Application.Person.Services
{
    public class CareerService : ICareerService
    {
        private readonly ICareerRepository _repository;

        public CareerService(ICareerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CareerDto>> GetAllAsync()
        {
            var careers = await _repository.GetAllAsync();
            return careers.Select(c => new CareerDto { Id = c.Id, Name = c.Name });
        }

        public async Task<CareerDto?> GetByIdAsync(int id)
        {
            var career = await _repository.GetByIdAsync(id);
            if (career == null) return null;
            return new CareerDto { Id = career.Id, Name = career.Name };
        }
    }
}
