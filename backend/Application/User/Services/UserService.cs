using Application.User.DTOs;
using Application.User.Interfaces;
using Domain.Repositories;
using Domain.Entities.User;
using Application.DTOs;

namespace Application.User.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
		private string _storePath = "D:\\studies\\FilmLibrary\\store";

		public UserService(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public async Task<UserDto> RegisterAsync(RegisterUserDto dto)
        {
            var existing = await _userRepository.GetByEmailAsync(dto.Email);
            if (existing != null)
                throw new InvalidOperationException("Email уже занят");
            
            var user = Domain.Entities.User.User.Create(dto.Name, dto.Email, dto.Password, dto.DateOfBirth);

            await _userRepository.AddAsync(user);
			var userFolder = Path.Combine(_storePath, dto.Email);
			Directory.CreateDirectory(userFolder);
			var userSubFolder = Path.Combine(userFolder, "user");
			Directory.CreateDirectory(userSubFolder);

			return MapToDto(user);
        }
        public async Task<UserDto?> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !user.Password.Verify(dto.Password))
                throw new UnauthorizedAccessException("Неверный логин");

            return MapToDto(user);
        }

        	public async Task<UserDto> UpdateProfileAsync(Guid id, UpdateProfileDto dto)
		    {
			    var user = await _userRepository.GetByIdAsync(id)
				    ?? throw new KeyNotFoundException("Пользователь не найден");

			    if (!string.IsNullOrEmpty(dto.Password) && dto.Password != dto.ConfirmPassword)
				    throw new ArgumentException("Пароли не совпадают");

			    user.UpdateProfile(dto.Name, dto.AvatarLink, dto.Email, dto.Password, dto.DateOfBirth); 

			    await _userRepository.UpdateAsync(user);
			    return MapToDto(user);
		    }

		public async Task<UserDto> GetByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id)
                ?? throw new KeyNotFoundException("Пользователь не найден");
            return MapToDto(user);
        }

        public async Task<GetAllUserDto> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            var userDtos = users.Select(user => new UsersDto
            {

                Id = user.Id,
                Name = user.Name,
                Email = user.Email.Value,
                Password = user.Password.HashedValue,
                RegistrationDate = user.RegistrationDate,
                DateOfBirth = user.DateOfBirth,
                LinkToAvatar = user.LinkToAvatar


            }).ToList();
            return new GetAllUserDto
            {
                Users = userDtos
            };
        }
		public async Task UpdateAvatarAsync(Guid id, string relativePath)
		{
			var user = await _userRepository.GetByIdAsync(id)
				?? throw new KeyNotFoundException("Пользователь не найден");

			user.UpdateAvatar(relativePath);
			await _userRepository.UpdateAsync(user);
		}

		public async Task DeleteAsync(Guid id)
		{
			var user = await _userRepository.GetByIdAsync(id)
				?? throw new KeyNotFoundException("Пользователь не найден");

			var userEmail = user.Email.Value;
			var userFolder = Path.Combine(_storePath, userEmail);
			if (Directory.Exists(userFolder))
			{
				Directory.Delete(userFolder, recursive: true); 
			}

			await _userRepository.DeleteAsync(id);
		}

		

		private UserDto MapToDto(Domain.Entities.User.User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email.Value,
                DateOfBirth = user.DateOfBirth,
                LinkToAvatar = user.LinkToAvatar
            };
        }
    }
}
