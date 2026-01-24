using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Person
{
    public class Person
    {
        public int Id { get; private set; }
        public string Name { get; private set; } = null!;

        [Column("ID_Career")]
        public int CareerId { get; private set; }
        public Career Career { get; private set; } = null!;
        public DateTime DateOfBirth { get; private set; }
        public string? LinkToPhoto { get; private set; }

        private Person() { }

        private Person(
            string name,
            int careerId,
            DateTime dateOfBirth,
            string? linkToPhoto)
        {
            Name = name;
            CareerId = careerId;
            DateOfBirth = dateOfBirth;
            LinkToPhoto = linkToPhoto;
        }

        public static Person Create(
            string name,
            int careerId,
            DateTime dateOfBirth,
            string? linkToPhoto)
            => new(name, careerId, dateOfBirth, linkToPhoto);

        public void Update(
            string name,
            DateTime dateOfBirth,
            string? linkToPhoto)
        {
            Name = name;
            DateOfBirth = dateOfBirth;
            LinkToPhoto = linkToPhoto;
        }
    }
}
