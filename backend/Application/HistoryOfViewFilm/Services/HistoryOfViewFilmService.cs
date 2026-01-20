using Application.HistoryOfViewFilm.DTOs;
using Application.HistoryOfViewFilm.Interfaces;
using Domain.Entities.HistoryOfViewFilm;
using Domain.Repositories;


namespace Application.HistoryOfViewFilm.Services
{
    public class HistoryOfViewFilmService : IHistoryOfViewFilmService
    {
        private readonly IHistoryOfViewFilmRepository _repository;

        public HistoryOfViewFilmService(IHistoryOfViewFilmRepository repository)
        {
            _repository = repository;
        }

        public async Task StartViewAsync(StartViewDto dto)
        {
            var history = Domain.Entities.HistoryOfViewFilm.HistoryOfViewFilm.Create(
                dto.UserId,
                dto.FilmId,
                DateTime.UtcNow,
                0);

            await _repository.AddAsync(history);
        }

        public async Task RateAsync(RateViewDto dto)
        {
            var history = await _repository.GetAsync(dto.UserId, dto.FilmId)
                ?? throw new KeyNotFoundException("Просмотр не найден");

            history.Rate(Evaluation.Create(dto.Value));
            await _repository.AddAsync(history);
        }

        public async Task<IEnumerable<Domain.Entities.HistoryOfViewFilm.HistoryOfViewFilm>> GetUserHistoryAsync(Guid userId)
            => await _repository.GetByUserIdAsync(userId);
    }

}
