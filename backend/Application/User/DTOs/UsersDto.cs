

namespace Application.User.DTOs
{
    public class UsersDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Password { get; set; } = null;
        public DateTime DateOfBirth { get; set; }
        public DateTime RegistrationDate { get; set; } 
        public string? LinkToAvatar { get; set; }
    }
}
