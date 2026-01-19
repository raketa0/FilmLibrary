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
		private readonly string _storePath;

		public UsersController(IUserService service)
		{
			_service = service;
			_storePath = "D:\\studies\\FilmLibrary\\store";
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register([FromBody] RegisterUserDto dto)
		{
			try
			{
				var user = await _service.RegisterAsync(dto);

				var userFolder = Path.Combine(_storePath, user.Email, "user");
				if (!Directory.Exists(userFolder))
					Directory.CreateDirectory(userFolder);

				return Ok(user);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
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
				var userUpdated = await _service.UpdateProfileAsync(id, dto);
				return Ok(userUpdated);
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

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			var user = await _service.GetByIdAsync(id);
			if (user == null) return NotFound("Пользователь не найден");

			var userFolder = Path.Combine(_storePath, user.Email);
			if (Directory.Exists(userFolder))
				Directory.Delete(userFolder, true);

			await _service.DeleteAsync(id);
			return Ok(new { success = true });
		}
        /* Загрузка аватара пользователя 
        [HttpPost("{id}/UploadAvatar")]
		public async Task<IActionResult> UploadAvatar(Guid id, [FromForm] IFormFile avatar)
		{
			if (avatar == null || avatar.Length == 0)
				return BadRequest("Файл не выбран");

			var user = await _service.GetByIdAsync(id);
			if (user == null) return NotFound("Пользователь не найден");

			try
			{
				var userFolder = Path.Combine(_storePath, user.Email, "user");
				if (!Directory.Exists(userFolder))
					Directory.CreateDirectory(userFolder);

				var fileExtension = Path.GetExtension(avatar.FileName);
				var fileName = $"avatar{fileExtension}";
				var filePath = Path.Combine(userFolder, fileName);

				using var stream = new FileStream(filePath, FileMode.Create);
				await avatar.CopyToAsync(stream);

				var relativePath = Path.Combine(user.Email, "user", fileName).Replace("\\", "/");
				await _service.UpdateAvatarAsync(id, relativePath);

				return Ok(new { success = true, linkToAvatar = relativePath });
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Ошибка загрузки аватара: {ex.Message}");
			}
        }
		*/
	}
}
