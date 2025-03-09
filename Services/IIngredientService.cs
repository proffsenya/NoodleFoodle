using NoodleFoodle.Models;

namespace NoodleFoodle.Services.Interfaces
{
    public interface IIngredientService
    {
        Task<IEnumerable<Ingredient>> GetIngredientsAsync();
        Task<Ingredient?> GetIngredientByIdAsync(int id);
        Task<IEnumerable<Ingredient>> GetIngredientsByIdsAsync(List<int> ingredientIds);
        Task<Ingredient> CreateIngredientAsync(Ingredient ingredient);
        Task<Ingredient?> UpdateIngredientAsync(int id, Ingredient ingredient);
        Task<bool> DeleteIngredientAsync(int id);
    }
}
