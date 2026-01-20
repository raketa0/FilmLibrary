using Application.Film.DTOs;
using Application.Film.Interfaces;
using Domain.Entities.Film;
using Domain.Entities.Person;
using Domain.Repositories;

namespace Application.Film.Services
{
    public class FilmService : IFilmService
    {
        private readonly IFilmRepository _filmRepository;
        private readonly IFilmPersonRepository _filmPersonRepository;

        public FilmService(IFilmRepository filmRepository, IFilmPersonRepository filmPersonRepository)
        {
            _filmRepository = filmRepository;
            _filmPersonRepository = filmPersonRepository;
        }


        public async Task<FilmDto> CreateAsync(CreateFilmDto dto)
        {
            var film = Domain.Entities.Film.Film.Create(
                dto.CreatorId,
                dto.Name,
                dto.YearOfRelease,
                dto.Duration,
                dto.Description,
                dto.LinkToPoster,
                dto.LinkToFilm,
                dto.Country,
                AgeRestriction.Create(dto.AgeRestriction)
            );

            await _filmRepository.AddAsync(film);

            if (dto.GenreIds.Any())
                await _filmRepository.AddGenresAsync(film.Id, dto.GenreIds);

            return await MapToDtoAsync(film);
        }

        public async Task<FilmDto> GetByIdAsync(int id)
        {
            var film = await _filmRepository.GetByIdAsync(id)
                ?? throw new KeyNotFoundException("Фильм не найден");

            return await MapToDtoAsync(film);
        }

        public async Task<IEnumerable<FilmDto>> GetAllAsync()
        {
            var films = await _filmRepository.GetAllAsync();
            var result = new List<FilmDto>();

            foreach (var film in films)
                result.Add(await MapToDtoAsync(film));

            return result;
        }

        public async Task<IEnumerable<FilmDto>> SearchAsync(string? name, IEnumerable<int>? genreIds)
        {
            var films = await _filmRepository.SearchAsync(name, genreIds);
            var result = new List<FilmDto>();

            foreach (var film in films)
                result.Add(await MapToDtoAsync(film));

            return result;
        }

        public async Task<FilmDto> UpdateAsync(int filmId, UpdateFilmDto dto)
        {
            var film = await _filmRepository.GetByIdAsync(filmId)
                ?? throw new KeyNotFoundException("Фильм не найден");

            film.Update(
                dto.Name,
                dto.YearOfRelease,
                dto.Duration,
                dto.Description,
                dto.LinkToPoster,
                dto.LinkToFilm,
                dto.Country,
                AgeRestriction.Create(dto.AgeRestriction)
            );

            await _filmRepository.RemoveGenresAsync(film.Id);

            if (dto.GenreIds.Any())
                await _filmRepository.AddGenresAsync(film.Id, dto.GenreIds);

            await _filmRepository.UpdateAsync(film);

            return await MapToDtoAsync(film);
        }

        public async Task DeleteAsync(int id)
        {
            await _filmRepository.DeleteAsync(id);
        }

        public async Task RateAsync(int filmId, int value)
        {
            var film = await _filmRepository.GetByIdAsync(filmId)
                ?? throw new KeyNotFoundException("Фильм не найден");

            film.Rate(value);
            await _filmRepository.UpdateAsync(film);
        }

        public async Task UpdatePersonsAsync(
            int filmId,
            IEnumerable<FilmPersonDto> persons)
        {
            var film = await _filmRepository.GetByIdAsync(filmId)
                ?? throw new KeyNotFoundException("Фильм не найден");

            var existing = await _filmPersonRepository.GetByFilmIdAsync(filmId);

            foreach (var fp in existing)
                await _filmPersonRepository.RemoveAsync(fp.FilmId, fp.PersonId, fp.Career);

            foreach (var p in persons)
            {
                var fp = FilmPerson.Create(filmId, p.PersonId, p.Career);
                await _filmPersonRepository.AddAsync(fp);
            }
        }



        private async Task<FilmDto> MapToDtoAsync(Domain.Entities.Film.Film film)
        {
            var genreIds = await _filmRepository.GetGenreIdsAsync(film.Id);
            var persons = await _filmPersonRepository.GetByFilmIdAsync(film.Id);

            return new FilmDto
            {
                Id = film.Id,
                CreatorId = film.CreatorId,
                Name = film.Name,
                YearOfRelease = film.YearOfRelease,
                Duration = film.Duration,
                Description = film.Description,
                LinkToPoster = film.LinkToPoster,
                LinkToFilm = film.LinkToFilm,
                Country = film.Country,
                Rating = film.Rating.Average(),
                AgeRestriction = film.AgeRestriction.Value,
                GenreIds = genreIds.ToList(),
                Persons = persons.Select(p => new FilmPersonDto
                {
                    PersonId = p.PersonId,
                    Career = p.Career
                }).ToList()
            };
        }
    }
}
