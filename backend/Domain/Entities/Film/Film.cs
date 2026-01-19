
namespace Domain.Entities.Film
{
    public class Film
    {
        private readonly List<int> _genreIds = new();
        public IReadOnlyCollection<int> GenreIds => _genreIds;

        public int Id { get; private set; }

        public Guid CreatorId { get; private set; }

        public string Name { get; private set; } = null!;
        public int YearOfRelease { get; private set; }
        public int Duration { get; private set; }

        public string Description { get; private set; } = null!;
        public string LinkToPoster { get; private set; } = null!;
        public string LinkToFilm { get; private set; } = null!;
        public string Country { get; private set; } = null!;
        
        public Rating Rating { get; private set; } = null!;
        public AgeRestriction AgeRestriction { get; private set; } = null!;

        private Film() {}

        private Film(
            Guid creatorId,
            string name,
            int yearOfRelease,
            int duration,
            string description,
            string linkToPoster,
            string linkToFilm,
            string country,
            Rating rating,
            AgeRestriction ageRestriction)
        {
            CreatorId = creatorId;
            Name = name;
            YearOfRelease = yearOfRelease;
            Duration = duration;
            Description = description;
            LinkToPoster = linkToPoster;
            LinkToFilm = linkToFilm;
            Country = country;
            Rating = rating;
            AgeRestriction = ageRestriction;
        }

        public static Film Create(
            Guid creatorId,
            string name,
            int yearOfRelease,
            int duration,
            string description,
            string linkToPoster,
            string linkToFilm,
            string country,
            AgeRestriction ageRestriction)
        {
            return new Film(
                creatorId,
                name,
                yearOfRelease,
                duration,
                description,
                linkToPoster,
                linkToFilm,
                country,
                Rating.Empty(),
                ageRestriction);
        }

        public void Rate(int value)
        {
            Rating = Rating.Add(value);
        }

        public void Update(
            string name,
            int yearOfRelease,
            int duration,
            string description,
            string linkToPoster,
            string linkToFilm,
            string country,
            Rating rating,
            AgeRestriction ageRestriction)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Film name is required");

            Name = name;
            YearOfRelease = yearOfRelease;
            Duration = duration;
            Description = description;
            LinkToPoster = linkToPoster;
            LinkToFilm = linkToFilm;
            Country = country;
            Rating = rating;
            AgeRestriction = ageRestriction;
        }

        public void AddGenre(int genreId)
        {
            if (_genreIds.Contains(genreId))
            {  
                return; 
            }

            _genreIds.Add(genreId);
        }

        public void RemoveGenre(int genreId)
        {
            _genreIds.Remove(genreId);
        }
    }
}
