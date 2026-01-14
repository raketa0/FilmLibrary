
namespace Domain.Entities.Genre
{
    public class Genre
    {
        public int Id { get; private set; }
        public string Name { get; private set; } = null!;

        private Genre() { }

        private Genre(string name)
        {
            Name = name;
        }

        public static Genre Create(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Genre name is required.");

            return new Genre(name);
        }
    }
}
