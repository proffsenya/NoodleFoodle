using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;

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
    public async Task<ActionResult<IEnumerable<Dish>>> GetDishes()
    {
        return Ok(await _dishService.GetDishesAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Dish>> GetDish(int id)
    {
        var dish = await _dishService.GetDishByIdAsync(id);
        if (dish == null)
            return NotFound();
        return Ok(dish);
    }

    [HttpPost]
    public async Task<ActionResult> CreateDish(Dish dish)
    {
        await _dishService.CreateDishAsync(dish);
        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, dish);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateDish(int id, Dish dish)
    {
        if (id != dish.Id)
            return BadRequest();

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
