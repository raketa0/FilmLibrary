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
            return MapToDto(user);
        }
        public async Task<UserDto?> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !user.Password.Verify(dto.Password))
                throw new UnauthorizedAccessException("Неверный логин");

            return MapToDto(user);
        }

        public async Task<UserDto> UpdateProfileAsync(Guid userId, UpdateProfileDto dto)
        {
            var user = await _userRepository.GetByIdAsync(userId)
                ?? throw new KeyNotFoundException("Пользователь не найден");

            user.UpdateProfile(dto.Name, dto.AvatarLink);
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
