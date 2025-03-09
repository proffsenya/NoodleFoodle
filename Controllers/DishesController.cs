using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;
using NoodleFoodle.Models.DTO;

[ApiController]
[Route("api/[controller]")]
public class DishesController : ControllerBase
{
    private readonly DishService _dishService;

    public DishesController(DishService dishService)
    {
        _dishService = dishService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DishDTO>>> GetDishes()
    {
        return Ok(await _dishService.GetDishesAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DishDTO>> GetDish(int id)
    {
        var dish = await _dishService.GetDishByIdAsync(id);
        if (dish == null)
            return NotFound();
        return Ok(dish);
    }

    [HttpPost]
    public async Task<ActionResult> CreateDish(DishDTO dishDto)
    {

        var dish = new Dish
        {
            Title = dishDto.Name,
            Price = dishDto.Price,
            Weight = dishDto.Weight,
            Kcal = dishDto.Kcal,
            Type = dishDto.Type 
        };

        await _dishService.CreateDishAsync(dish);
        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, dish);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateDish(int id, DishDTO dishDto)
    {
        var dish = new Dish
        {
            Title = dishDto.Name,
            Price = dishDto.Price,
            Weight = dishDto.Weight,
            Kcal = dishDto.Kcal,
            Type = dishDto.Type,
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
