using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;

namespace NoodleFoodle.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Dish> Dishes { get; set; } = null!;
        public DbSet<Ingredient> Ingredients { get; set; } = null!;
        public DbSet<Client> Clients { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Связь многие ко многим: Блюда <-> Ингредиенты
            modelBuilder.Entity<Dish>()
                .HasMany(d => d.Ingredients)
                .WithOne(i => i.Dish)
                .HasForeignKey(i => i.DishId)
                .OnDelete(DeleteBehavior.Cascade);

            // Связь многие ко многим: Заказы <-> Блюда
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Dishes)
                .WithOne(d => d.Order)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Связь один ко многим: Клиенты <-> Заказы
            modelBuilder.Entity<Client>()
                .HasMany(c => c.Orders)
                .WithOne(o => o.Client)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
