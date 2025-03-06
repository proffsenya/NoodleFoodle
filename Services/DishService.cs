using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;
using NoodleFoodle.Services.Interfaces;
using System;

namespace NoodleFoodle.Services
{
    public class DishService : IDishService
    {
        private readonly Test1Context _context;

        public DishService(Test1Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Dish>> GetDishesAsync()
        {
            return await _context.Dishes.ToListAsync();
        }

        public async Task<Dish?> GetDishByIdAsync(int id)
        {
            return await _context.Dishes.FindAsync(id);
        }

        public async Task<Dish> CreateDishAsync(Dish dish)
        {
            _context.Dishes.Add(dish);
            await _context.SaveChangesAsync();
            return dish;
        }

        public async Task<Dish?> UpdateDishAsync(int id, Dish dish)
        {
            var existingDish = await _context.Dishes.FindAsync(id);
            if (existingDish == null) return null;

            existingDish.Title = dish.Title;
            existingDish.Price = dish.Price;
            existingDish.Weight = dish.Weight;
            existingDish.Kcal = dish.Kcal;

            await _context.SaveChangesAsync();
            return existingDish;
        }

        public async Task<bool> DeleteDishAsync(int id)
        {
            var dish = await _context.Dishes.FindAsync(id);
            if (dish == null) return false;

            _context.Dishes.Remove(dish);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Dish?> CreateCustomDishAsync(string name, int clientId, List<int> ingredientIds)
        {
            var ingredients = await _context.Ingredients
                .Where(i => ingredientIds.Contains(i.Id))
                .ToListAsync();

            if (ingredients.Count != ingredientIds.Count)
            {
                return null; // Один или несколько ингредиентов не найдены
            }

            var totalWeight = ingredients.Sum(i => i.Weight);
            var totalKcal = ingredients.Sum(i => i.Kcal);
            var totalPrice = ingredients.Sum(i => i.Price);

            var customDish = new Dish
            {
                Title = name,
                Price = totalPrice,
                Weight = totalWeight,
                Kcal = totalKcal,
                Type = "custom",
                ClientId = clientId
            };

            _context.Dishes.Add(customDish);
            await _context.SaveChangesAsync();

            return customDish;
        }
    }
}
