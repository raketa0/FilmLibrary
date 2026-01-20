using Application.Person.DTOs;
using Application.Person.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/persons")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _service;

        public PersonController(IPersonService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
            => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Create(CreatePersonDto dto)
            => Ok(await _service.CreateAsync(dto));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdatePersonDto dto)
            => Ok(await _service.UpdateAsync(id, dto));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
