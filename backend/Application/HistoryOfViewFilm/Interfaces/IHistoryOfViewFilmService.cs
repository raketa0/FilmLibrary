using Application.HistoryOfViewFilm.DTOs;


namespace Application.HistoryOfViewFilm.Interfaces
{
    public interface IHistoryOfViewFilmService
    {
        Task StartViewAsync(StartViewDto dto);
        Task RateAsync(RateViewDto dto);
        Task<IEnumerable<Domain.Entities.HistoryOfViewFilm.HistoryOfViewFilm>> GetUserHistoryAsync(Guid userId);
    }
}
