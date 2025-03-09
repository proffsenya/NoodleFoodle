using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoodleFoodle.Models;

namespace NoodleFoodle;

public partial class Test1Context : DbContext
{
    public Test1Context()
    {
    }

    public Test1Context(DbContextOptions<Test1Context> options)
        : base(options)
    {
    }
    public DbSet<Client> Client { get; set; }
    public DbSet<Dish> Dishes { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<Ingredient> Ingredients { get; set; } = null!;
    public DbSet<Client> Clients { get; set; } = null!;
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=test1;Username=postgres;Password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.ApplyConfiguration(new ClientCOnfiguration());

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Dish>()
            .HasMany(d => d.Ingredients)
            .WithMany(i => i.Dishes)
            .UsingEntity<Dictionary<string, object>>(
                "dish_ingredients",
                j => j
                    .HasOne<Ingredient>()
                    .WithMany()
                    .HasForeignKey("ingredient_id")
                    .HasPrincipalKey(i => i.Id),
                j => j
                    .HasOne<Dish>()
                    .WithMany()
                    .HasForeignKey("dish_id")
                    .HasPrincipalKey(d => d.Id)
            );

        //modelBuilder.Entity<Order>()
        //    .HasMany(o => o.Dishes)
        //    .WithOne(d => d.Order)
        //    .HasForeignKey(d => d.OrderId)
        //    .OnDelete(DeleteBehavior.Cascade);

        // Связь один ко многим: Клиенты <-> Заказы
        modelBuilder.Entity<Client>()
            .HasMany(c => c.Orders)
            .WithOne(o => o.Client)
            .HasForeignKey(o => o.ClientId)
            .OnDelete(DeleteBehavior.Cascade);

        //modelBuilder.Entity<Dish>()
        //    .HasMany(d => d.Ingredients)
        //    .WithOne(i => i.Dishes)
        //    .HasForeignKey(i => i.DishId)
        //    .OnDelete(DeleteBehavior.Cascade);

        //// Связь многие ко многим: Заказы <-> Блюда
        //modelBuilder.Entity<Order>()
        //    .HasMany(o => o.Dishes)
        //    .WithOne(d => d.Order)
        //    .HasForeignKey(d => d.OrderId)
        //    .OnDelete(DeleteBehavior.Cascade);

        //// Связь один ко многим: Клиенты <-> Заказы
        //modelBuilder.Entity<Client>()
        //    .HasMany(c => c.Orders)
        //    .WithOne(o => o.Client)
        //    .HasForeignKey(o => o.UserId)
        //    .OnDelete(DeleteBehavior.Cascade);

        OnModelCreatingPartial(modelBuilder);

    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    
}


public class ClientCOnfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder.HasKey(x => x.Id);
    }
}