using Application.Film.DTOs;
using Application.Film.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/films")]
    public class FilmController : ControllerBase
    {
        private readonly IFilmService _filmService;

        public FilmController(IFilmService filmService)
        {
            _filmService = filmService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFilmDto dto)
        {
            var film = await _filmService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = film.Id }, film);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var film = await _filmService.GetByIdAsync(id);
            return Ok(film);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var films = await _filmService.GetAllAsync();
            return Ok(films);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(
            [FromQuery] string? name,
            [FromQuery] List<int>? genreIds)
        {
            var films = await _filmService.SearchAsync(name, genreIds);
            return Ok(films);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateFilmDto dto)
        {
            var film = await _filmService.UpdateAsync(id, dto);
            return Ok(film);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _filmService.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("{id:int}/rate")]
        public async Task<IActionResult> Rate(int id, [FromQuery] int value)
        {
            await _filmService.RateAsync(id, value);
            return Ok();
        }

        [HttpPut("{id:int}/persons")]
        public async Task<IActionResult> UpdatePersons(int id,
            [FromBody] UpdateFilmPersonsDto dto)
        {
            await _filmService.UpdatePersonsAsync(id, dto.Persons);
            return NoContent();
        }

        [HttpGet("my/{userId}")]
        public async Task<IActionResult> GetMyFilms(Guid userId)
        {
            var stats = await _filmService.GetMyFilmsStatsAsync(userId);
            return Ok(stats);
        }

        [HttpPost("{id:int}/view")]
        public async Task<IActionResult> AddView(int id)
        {
            var userId = Guid.Parse(User.FindFirst("sub")!.Value);

            await _filmService.AddViewAsync(id, userId);
            return Ok();
        }

    }
}
