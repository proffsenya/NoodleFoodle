using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;
using Microsoft.EntityFrameworkCore;
using NoodleFoodle;
using NoodleFoodle.Models.DTO;
using NoodleFoodle.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController : ControllerBase
{
    private readonly IngredientService _ingredientService;
    private readonly Test1Context _context;

    public IngredientsController(IngredientService ingredientService, Test1Context context)
    {
        _ingredientService = ingredientService;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<IngredientDTO>>> GetIngredients()
    {
        return await _context.Ingredients
                .Select(i => new IngredientDTO
                {
                    Id = i.Id,
                    Name = i.Name,
                    Price = i.Price,
                    Weight = i.Weight,
                    Kcal = i.Kcal
                }).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<IngredientDTO?> GetIngredientByIdAsync(int id)
    {
        var ingredient = await _context.Ingredients.FindAsync(id);
        if (ingredient == null) return null;

        return new IngredientDTO
        {
            Id = ingredient.Id,
            Name = ingredient.Name,
            Price = ingredient.Price,
            Weight = ingredient.Weight,
            Kcal = ingredient.Kcal
        };
    }

    [HttpPost]
    public async Task<ActionResult> CreateIngredient(IngredientDTO ingredientDto)
    {
        var ingredient = new Ingredient
        {
            Name = ingredientDto.Name,
            Price = ingredientDto.Price,
            Weight = ingredientDto.Weight,
            Kcal = ingredientDto.Kcal
        };

        var createdClient = await _ingredientService.CreateIngredientAsync(ingredient);

        return CreatedAtAction(nameof(GetIngredientByIdAsync), new { id = ingredient.Id }, ingredient);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateIngredient(int id, IngredientDTO ingredientDto)
    {
        var ingredient = new Ingredient
        {
            Id = id,
            Name = ingredientDto.Name,
            Price = ingredientDto.Price,
            Weight = ingredientDto.Weight,
            Kcal = ingredientDto.Kcal
        };

        var updatedIngredient = await _ingredientService.UpdateIngredientAsync(id, ingredient);
        if (updatedIngredient == null)
            return NotFound();

        var updatedIngredientDto = new IngredientDTO
        {
            Id = updatedIngredient.Id,
            Name = updatedIngredient.Name,
            Price = updatedIngredient.Price,
            Weight = updatedIngredient.Weight,
            Kcal = updatedIngredient.Kcal
        };

        return Ok(updatedIngredientDto);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteIngredient(int id)
    {
        var deleted = await _ingredientService.DeleteIngredientAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
