using Application.DTOs;
using Application.User.DTOs;

namespace Application.User.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> RegisterAsync(RegisterUserDto dto);
        Task<UserDto?> LoginAsync(LoginDto dto);


        Task<UserDto> UpdateProfileAsync(Guid userId, UpdateProfileDto dto);
        Task<UserDto> GetByIdAsync(Guid id);
        Task<GetAllUserDto> GetAllAsync();
    }
}
