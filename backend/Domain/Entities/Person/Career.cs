namespace Domain.Entities.Person
{
    public class Career
    {
        public int Id { get; private set; }
        public string Name { get; private set; } = null!;

        private Career() { }

        public Career(string name)
        {
            Name = name;
        }
    }
}
