

namespace Application.Film.DTOs
{
    public class AddViewDto
    {
        public Guid UserId { get; set; }
        public int Duration { get; set; }
        public int? Evaluation { get; set; }
    }
}
