using NoodlefoodleStore.Domain.Abstractions;
using NoodlefoodleStore.Domain.ValueObjects;

namespace NoodlefoodleStore.Domain.Models
{
    public class Dish : Entity<DishId>
    {
        public string Title { get; set; } = default!;
        public string Type { get; set; } = default!;
        public decimal Price { get; set; } = default!;
        public int Weight { get; set; } = default!;
        public int Kcal { get; set; } = default!;


        public static Dish Create(DishId id, string title, string type, decimal price, int weight, int kcal)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(title);
            ArgumentException.ThrowIfNullOrWhiteSpace(type);

            Dish dish = new()
            {
                Id = id,
                Title = title,
                Type = type,
                Price = price,
                Weight = weight,
                Kcal = kcal

            };
            return dish;
        }
    }

    
}
