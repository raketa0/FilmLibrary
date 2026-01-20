namespace Application.Person.DTOs
{
    public class UpdatePersonDto
    {
        public string Name { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string? LinkToPhoto { get; set; }
    }
}
