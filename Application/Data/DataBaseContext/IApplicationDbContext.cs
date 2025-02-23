using Microsoft.EntityFrameworkCore;
using NoodlefoodleStore.Domain.Models;

namespace NoodlefoodleStore.Application.Data.DataBaseContext
{
    public interface IApplicationDbContext
    {
        DbSet<Dish> Dishes { get; }
    }
}
