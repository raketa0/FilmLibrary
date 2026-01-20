namespace Application.Person.DTOs
{
    public class CreatePersonDto
    {
        public string Name { get; set; } = string.Empty;
        public int Career { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? LinkToPhoto { get; set; }
    }
}
