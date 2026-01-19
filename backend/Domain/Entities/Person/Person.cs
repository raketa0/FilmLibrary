
namespace Domain.Entities.Person
{
    public class Person
    {
        public int Id { get; private set; }

        public string Name { get; private set; } = null!;
        public Career Career { get; private set; }
        public DateTime DateOfBirth { get; private set; }
        public string? LinkToPhoto { get; private set; }

        private Person() {}

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

        public Person Create(
            string name,
            Career career,
            DateTime dateOfBirth,
            string? linkToPhoto)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Person name is required.");

            return new Person(name, career, dateOfBirth, linkToPhoto);
        }
    }
}
