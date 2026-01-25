using Application.Person.DTOs;
using Application.Person.Interfaces;
using Domain.Repositories;
using PersonEntity = Domain.Entities.Person.Person;

namespace Application.Person.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _repository;

        public PersonService(IPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PersonDto>> GetAllAsync()
        {
            var persons = await _repository.GetAllAsync();
            return persons.Select(Map);
        }

        public async Task<PersonDto> GetByIdAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id)
                ?? throw new KeyNotFoundException("Person not found");

            return Map(person);
        }

        public async Task<PersonDto> CreateAsync(CreatePersonDto dto)
        {
            var person = PersonEntity.Create(
                dto.Name,
                dto.CareerId,
                dto.DateOfBirth,
                dto.LinkToPhoto);

            await _repository.AddAsync(person);
            return Map(person);
        }

        public async Task<PersonDto> UpdateAsync(int id, UpdatePersonDto dto)
        {
            var person = await _repository.GetByIdAsync(id)
                ?? throw new KeyNotFoundException("Person not found");

            person.Update(dto.Name, dto.DateOfBirth, dto.LinkToPhoto);
            await _repository.UpdateAsync(person);

            return Map(person);
        }

        public async Task DeleteAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id)
                ?? throw new KeyNotFoundException("Person not found");

            await _repository.DeleteAsync(person);
        }

        public async Task UpdatePhotoAsync(int personId, string path)
        {
            var person = await _repository.GetByIdAsync(personId);
            if (person == null) throw new KeyNotFoundException("Person not found");

            person.Update(person.Name, person.DateOfBirth, path);
            await _repository.UpdateAsync(person);
        }


        private static PersonDto Map(PersonEntity p) => new()
        {
            Id = p.Id,
            Name = p.Name,
            Career = p.Career?.Name ?? "Неизвестно",
            LinkToPhoto = p.LinkToPhoto
        };
    }
}
