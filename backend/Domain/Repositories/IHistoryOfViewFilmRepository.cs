using Domain.Entities.HistoryOfViewFilm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IHistoryOfViewFilmRepository
    {
        Task AddAsync(HistoryOfViewFilm history);
        Task<HistoryOfViewFilm?> GetAsync(Guid userId, int filmId);
        Task<IEnumerable<HistoryOfViewFilm>> GetByUserIdAsync(Guid userId);
    }

}
