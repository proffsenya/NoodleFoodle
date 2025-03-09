using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;
using NoodleFoodle.Models.DTO;
using NoodleFoodle.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class DishesController : ControllerBase
{
    private readonly DishService _dishService;
    private readonly IngredientService _ingredientService;

    public DishesController(DishService dishService, IngredientService ingredientService)
    {
        _dishService = dishService;
        _ingredientService = ingredientService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DishDTO>>> GetDishes()
    {
        var dishes = await _dishService.GetDishesAsync();

        var dishDTOs = dishes.Select(dish => new DishDTO
        {
            Id = dish.Id,
            Name = dish.Title,
            Price = dish.Price,
            Weight = dish.Weight,
            Kcal = dish.Kcal,
            Type = dish.Type,
            Ingredients = dish.Ingredients.Select(i => new IngredientDTO
            {
                Id = i.Id,
                Name = i.Name,
                Price = i.Price,
                Weight = i.Weight,
                Kcal = i.Kcal
            }).ToList() 
        }).ToList();

        return Ok(dishDTOs);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DishDTO>> GetDish(int id)
    {
        var dish = await _dishService.GetDishByIdAsync(id);
        if (dish == null)
            return NotFound();

        var dishDTO = new DishDTO
        {
            Id = dish.Id,
            Name = dish.Title,
            Price = dish.Price,
            Weight = dish.Weight,
            Kcal = dish.Kcal,
            Type = dish.Type,
            Ingredients = dish.Ingredients.Select(i => new IngredientDTO
            {
                Id = i.Id,
                Name = i.Name,
                Price = i.Price,
                Weight = i.Weight,
                Kcal = i.Kcal
            }).ToList()
        };

        return Ok(dishDTO);
    }

    [HttpPost]
    public async Task<ActionResult> CreateDish(DishDTO dishDto)
    {

        var ingredientIds = dishDto.Ingredients.Select(i => i.Id).ToList();
        var ingredients = await _ingredientService.GetIngredientsByIdsAsync(ingredientIds);

        var dish = new Dish
        {
            Title = dishDto.Name,
            Price = dishDto.Price,
            Weight = dishDto.Weight,
            Kcal = dishDto.Kcal,
            Type = dishDto.Type,
            Ingredients = ingredients.ToList()
        };

        await _dishService.CreateDishAsync(dish);
        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, dish);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateDish(int id, DishDTO dishDto)
    {
        var ingredientIds = dishDto.Ingredients.Select(i => i.Id).ToList();
        var ingredients = await _ingredientService.GetIngredientsByIdsAsync(ingredientIds);

        var dish = new Dish
        {
            Title = dishDto.Name,
            Price = dishDto.Price,
            Weight = dishDto.Weight,
            Kcal = dishDto.Kcal,
            Type = dishDto.Type,
            Ingredients = ingredients.ToList()
        };

        var updatedDish = await _dishService.UpdateDishAsync(id, dish);
        if (updatedDish == null)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDish(int id)
    {
        var deleted = await _dishService.DeleteDishAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }


}
