using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using NoodlefoodleStore.Application.Data.DataBaseContext;
using NoodlefoodleStore.Domain.Models;
using NoodlefoodleStore.Domain.ValueObjects;

namespace NoodlefoodleStore.Infrastructure.Data.DataBaseContext;

public partial class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Courier> Couriers { get; set; }

    public virtual DbSet<Delivery> Deliveries { get; set; }

    public virtual DbSet<Dish> Dishes { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.ClientId).HasName("client_pk");

            entity.ToTable("client");

            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.Adress)
                .HasColumnType("character varying")
                .HasColumnName("adress");
            entity.Property(e => e.Email)
                .HasColumnType("character varying")
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasColumnType("character varying")
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasColumnType("character varying")
                .HasColumnName("phone_number");
        });

        modelBuilder.Entity<Courier>(entity =>
        {
            entity.HasKey(e => e.CourierId).HasName("courier_pk");

            entity.ToTable("courier");

            entity.Property(e => e.CourierId).HasColumnName("courier_id");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
            entity.Property(e => e.PhoneNumber)
                .HasColumnType("character varying")
                .HasColumnName("phone_number");
        });

        modelBuilder.Entity<Delivery>(entity =>
        {
            entity.HasKey(e => e.DeliveryId).HasName("delivery_pk");

            entity.ToTable("delivery");

            entity.Property(e => e.DeliveryId).HasColumnName("delivery_id");
            entity.Property(e => e.Address)
                .HasColumnType("character varying")
                .HasColumnName("address");
            entity.Property(e => e.CourierId).HasColumnName("courier_id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Status)
                .HasColumnType("character varying")
                .HasColumnName("status");
        });

        modelBuilder.Entity<Dish>(entity =>
        {
            entity.HasKey(e => e.DishId[0]).HasName("ramen_pk");

            entity.ToTable("dish");

            entity.Property(dish => dish.DishId[0]).HasColumnName("dish_id");
            entity.Property(e => e.Kcal).HasColumnName("kcal");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Title)
                .HasColumnType("character varying")
                .HasColumnName("title");
            entity.Property(e => e.Weight).HasColumnName("weight");
        });

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.IngredientId).HasName("ingredient_pk");

            entity.ToTable("ingredient");

            entity.Property(e => e.IngredientId).HasColumnName("ingredient_id");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Weight).HasColumnName("weight");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("order_pk");

            entity.ToTable("order");

            entity.HasIndex(e => e.UserId, "order_unique").IsUnique();

            entity.Property(e => e.OrderId)
                .ValueGeneratedNever()
                .HasColumnName("order_id");
            entity.Property(e => e.AmountDishes).HasColumnName("amount_dishes");
            entity.Property(e => e.DataOrder).HasColumnName("data_order");
            entity.Property(e => e.DishId).HasColumnName("dish_id");
            entity.Property(e => e.OrderStatus)
                .HasColumnType("character varying")
                .HasColumnName("order_status");
            entity.Property(e => e.Sum).HasColumnName("sum");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
