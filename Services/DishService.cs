using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;
using NoodleFoodle.Models.DTO;
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
            return await _context.Dishes.Include(d => d.Ingredients) // Загружаем ингредиенты сразу
        .FirstOrDefaultAsync(d => d.Id == id);
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
        public async Task<Dish?> CreateCustomDishAsync(CustomDishDTO customDishDto)
        {
            var ingredients = await _context.Ingredients
                .Where(i => customDishDto.Ingredients.Select(dto => dto.Id).Contains(i.Id))
                .ToListAsync();
            var totalWeight = ingredients.Sum(i => i.Weight);
            var totalKcal = ingredients.Sum(i => i.Kcal);
            var totalPrice = ingredients.Sum(i => i.Price);

            var customDish = new Dish
            {
                Title = customDishDto.Name,
                Price = totalPrice,
                Weight = totalWeight,
                Kcal = totalKcal,
                Type = "custom",
                ClientId = customDishDto.ClientId,
                Ingredients = ingredients
            };

            _context.Dishes.Add(customDish);
            await _context.SaveChangesAsync();

            return customDish;
        }
    }
}
