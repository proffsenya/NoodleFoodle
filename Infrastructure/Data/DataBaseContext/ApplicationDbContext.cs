using Microsoft.EntityFrameworkCore;
using NoodlefoodleStore.Application.Data.DataBaseContext;
using NoodlefoodleStore.Domain.Models;
using NoodlefoodleStore.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using NoodlefoodleStore.Domain.Models;

namespace NoodlefoodleStore.Infrastructure.Data.DataBaseContext
{
    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //   => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=");

    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<Dish> Dishes => Set<Dish>();
        public virtual DbSet<Client> Clients { get; set; }

        public virtual DbSet<Delivery> Deliveries { get; set; }

        public virtual DbSet<Ingredient> Ingredients { get; set; }

        public virtual DbSet<Order> Orders { get; set; }

        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Dish>()
                .Property(dish => dish.Id)
                .HasConversion(
                    id => id.Value,
                    value => DishId.Of(value)
                );

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

            modelBuilder.Entity<Delivery>(entity =>
            {
                entity.HasKey(e => e.DeliveryId).HasName("delivery_pk");

                entity.ToTable("delivery");

                entity.Property(e => e.DeliveryId).HasColumnName("delivery_id");
                entity.Property(e => e.AddressDelivery)
                    .HasColumnType("character varying")
                    .HasColumnName("address_delivery");
                entity.Property(e => e.CourierId).HasColumnName("courier_id");
                entity.Property(e => e.DataDelivery).HasColumnName("data_delivery");
                entity.Property(e => e.OrderId).HasColumnName("order_id");
                entity.Property(e => e.StatusDelivery)
                    .HasColumnType("character varying")
                    .HasColumnName("status_delivery");
            });

            modelBuilder.Entity<Dish>(entity =>
            {
                entity.HasKey(e => e.DishId).HasName("ramen_pk");

                entity.ToTable("dish");

                entity.Property(e => e.DishId).HasColumnName("dish_id");
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
                entity.Property(e => e.IngredientName)
                    .HasColumnType("character varying")
                    .HasColumnName("ingredient_name");
                entity.Property(e => e.IngredientPrice).HasColumnName("ingredient_price");
                entity.Property(e => e.IngredientWeight).HasColumnName("ingredient_weight");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OrderId).HasName("order_pk");

                entity.ToTable("order");

                entity.HasIndex(e => e.UserId, "order_unique").IsUnique();

                entity.Property(e => e.OrderId)
                    .ValueGeneratedNever()
                    .HasColumnName("order_id");
                entity.Property(e => e.DataOrder).HasColumnName("data_order");
                entity.Property(e => e.OrderStatus)
                    .HasColumnType("character varying")
                    .HasColumnName("order_status");
                entity.Property(e => e.RamenId).HasColumnName("ramen_id");
                entity.Property(e => e.Sum).HasColumnName("sum");
                entity.Property(e => e.UserId).HasColumnName("user_id");
            });

            OnModelCreatingPartial(modelBuilder);

            
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
