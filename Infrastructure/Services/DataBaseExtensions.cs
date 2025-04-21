using Microsoft.EntityFrameworkCore;
using NoodlefoodleStore.Infrastructure.Data.DataBaseContext;
using System.Runtime.CompilerServices;

namespace NoodlefoodleStore.Infrastructure.Services
{
    public static class DataBaseExtensions
    {
        public static async Task InitializeDatabaseAsync(this WebApplication application)
        {
            using IServiceScope scope = application.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            db.Database.MigrateAsync().GetAwaiter().GetResult();

            await SeedData(db);

        }

        private static async Task SeedData(ApplicationDbContext db)
        {
            await SeedDishAsync(db);
        }

        private static async Task SeedDishAsync(ApplicationDbContext db)
        {
            if (!await db.Dishes.AnyAsync()) { 
                await db.Dishes.AddRangeAsync(DishService.Dishes);
                await db.SaveChangesAsync();
            }
        }
    }
}
