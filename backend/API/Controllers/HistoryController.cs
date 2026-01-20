using Application.HistoryOfViewFilm.DTOs;
using Application.HistoryOfViewFilm.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/history")]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryOfViewFilmService _service;

        public HistoryController(IHistoryOfViewFilmService service)
        {
            _service = service;
        }

        [HttpPost("start")]
        public async Task<IActionResult> Start(StartViewDto dto)
        {
            await _service.StartViewAsync(dto);
            return Ok();
        }

        [HttpPost("rate")]
        public async Task<IActionResult> Rate(RateViewDto dto)
        {
            await _service.RateAsync(dto);
            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(Guid userId)
            => Ok(await _service.GetUserHistoryAsync(userId));
    }

}
