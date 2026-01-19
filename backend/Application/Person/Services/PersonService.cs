
using Application.Person.DTOs;
using Application.Person.Interfaces;
using Domain.Repositories;

namespace Application.Person.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _personRepository;

        public PersonService(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public async Task<IEnumerable<PersonDto>> GetAllAsync()
        {
            var persons = await _personRepository.GetAllAsync();
            return persons.Select(p => new PersonDto
            {
                Id = p.Id,
                FullName = p.Name
            });
        }
    }
}
