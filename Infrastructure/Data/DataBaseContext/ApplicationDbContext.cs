using Microsoft.EntityFrameworkCore;
using NoodlefoodleStore.Application.Data.DataBaseContext;
using NoodlefoodleStore.Domain.Models;

namespace NoodlefoodleStore.Infrastructure.Data.DataBaseContext
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<Dish> Dishes => Set<Dish>();

        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {

        }
    }
}
