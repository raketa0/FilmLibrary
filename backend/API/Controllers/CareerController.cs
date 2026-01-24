using Application.Person.DTOs;
using Application.Person.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/careers")]
    public class CareerController : ControllerBase
    {
        private readonly ICareerService _careerService;

        public CareerController(ICareerService careerService)
        {
            _careerService = careerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var careers = await _careerService.GetAllAsync();
            return Ok(careers);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var career = await _careerService.GetByIdAsync(id);
            if (career == null) return NotFound();
            return Ok(career);
        }
    }
}
