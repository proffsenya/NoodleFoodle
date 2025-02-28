using NoodleFoodle.Models;

namespace NoodleFoodle.Services.Interfaces
{
    public interface IDishService
    {
        Task<IEnumerable<Dish>> GetDishesAsync();
        Task<Dish?> GetDishByIdAsync(int id);
        Task<Dish> CreateDishAsync(Dish dish);
        Task<Dish?> UpdateDishAsync(int id, Dish dish);
        Task<bool> DeleteDishAsync(int id);
    }
}
