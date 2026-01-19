using Application.Person.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Person.Interfaces
{
    public interface IPersonService
    {
        Task<IEnumerable<PersonDto>> GetAllAsync();
    }
}
