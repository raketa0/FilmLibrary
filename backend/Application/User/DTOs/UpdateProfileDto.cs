namespace Application.DTOs
{
	public class UpdateProfileDto
	{
		public string Name { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public string? Password { get; set; }
		public string? ConfirmPassword { get; set; }
		public DateTime DateOfBirth { get; set; }
		public string? AvatarLink { get; set; }
	}

}