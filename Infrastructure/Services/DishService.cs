using NoodlefoodleStore.Domain.Models;
using NoodlefoodleStore.Domain.ValueObjects;

namespace NoodlefoodleStore.Infrastructure.Services
{
    public static class DishService
    {
        public static IEnumerable<Dish> Dishes => new List<Dish>
        {
            new Dish() { DishId = new List<int>(){ 1 }, Title = "Рамен 1", Price = 546, Weight = 600, Kcal = 728},
            new Dish() { DishId = new List<int>() { 2 }, Title = "Рамен 2", Price = 900, Weight = 600, Kcal = 670}
            /*Dish.Create(
                DishId.Of(Guid.Parse("001")),
                "Рамен 1", "Приготовленное", 546, 600, 728),
            Dish.Create(
                DishId.Of(Guid.Parse("002")),
                "Рамен 2", "Приготовленное", 900, 600, 670)*/
        };
    }
}
