using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;
using Microsoft.EntityFrameworkCore;
using NoodleFoodle;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController : ControllerBase
{
    private readonly IngredientService _ingredientService;

    public IngredientsController(IngredientService ingredientService)
    {
        _ingredientService = ingredientService;       
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ingredient>>> GetIngredients()
    {
        return Ok(await _ingredientService.GetIngredientsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Ingredient>> GetIngredient(int id)
    {
        var ingredient = await _ingredientService.GetIngredientByIdAsync(id);
        if (ingredient == null)
            return NotFound();
        return Ok(ingredient);
    }



    [HttpPost]
    public async Task<ActionResult> CreateIngredient(Ingredient ingredient)
    {
        await _ingredientService.CreateIngredientAsync(ingredient);
        return CreatedAtAction(nameof(GetIngredient), new { id = ingredient.Id }, ingredient);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateIngredient(int id, Ingredient ingredient)
    {
        if (id != ingredient.Id)
            return BadRequest();

        var updatedIngredient = await _ingredientService.UpdateIngredientAsync(id, ingredient);
        if (updatedIngredient == null)
            return NotFound();

        return NoContent();
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
