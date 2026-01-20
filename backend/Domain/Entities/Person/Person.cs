namespace Domain.Entities.Person
{
    public class Person
    {
        public int Id { get; private set; }

        public string Name { get; private set; } = null!;
        public Career Career { get; private set; }
        public DateTime DateOfBirth { get; private set; }
        public string? LinkToPhoto { get; private set; }

        private Person() { }

        private Person(
            string name,
            Career career,
            DateTime dateOfBirth,
            string? linkToPhoto)
        {
            Name = name;
            Career = career;
            DateOfBirth = dateOfBirth;
            LinkToPhoto = linkToPhoto;
        }

        public static Person Create(
            string name,
            Career career,
            DateTime dateOfBirth,
            string? linkToPhoto)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Person name is required.");

            if (dateOfBirth > DateTime.UtcNow)
                throw new ArgumentException("Invalid date of birth.");

            return new Person(name, career, dateOfBirth, linkToPhoto);
        }

        public void Update(
            string name,
            DateTime dateOfBirth,
            string? linkToPhoto)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Person name is required.");

            Name = name;
            DateOfBirth = dateOfBirth;
            LinkToPhoto = linkToPhoto;
        }
    }
}
