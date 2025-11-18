using Application.DTOs;
using Application.User.DTOs;
using Application.User.Services;
using Application.User.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FilmLibrary.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterUserDto dto)
        {
            try
            {
                var user = await _service.RegisterAsync(dto);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto?>> Login([FromBody] LoginDto dto)
        {
            var user = await _service.LoginAsync(dto);
            if (user == null)
                return Unauthorized("Неверный email или пароль");

            return Ok(user);
        }

        [HttpPut("{id}/profile")]
        public async Task<ActionResult<UserDto>> UpdateProfile(Guid id, [FromBody] UpdateProfileDto dto)
        {
            try
            {
                var user = await _service.UpdateProfileAsync(id, dto);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> Get(Guid id)
        {
            var user = await _service.GetByIdAsync(id);
            return Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var result = await _service.GetAllAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}