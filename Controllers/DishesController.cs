using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;

namespace NoodleFoodle.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DishesController : ControllerBase
{
    private readonly AppDbContext _context;

    public DishesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Dish>>> GetDishes()
    {
        return await _context.Dishes.Include(d => d.Ingredients).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Dish>> GetDish(int id)
    {
        var dish = await _context.Dishes.Include(d => d.Ingredients).FirstOrDefaultAsync(d => d.Id == id);
        if (dish == null) return NotFound();
        return dish;
    }

    [HttpPost]
    public async Task<ActionResult<Dish>> CreateDish(Dish dish)
    {
        _context.Dishes.Add(dish);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, dish);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDish(int id, Dish dish)
    {
        if (id != dish.Id) return BadRequest();
        _context.Entry(dish).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDish(int id)
    {
        var dish = await _context.Dishes.FindAsync(id);
        if (dish == null) return NotFound();
        _context.Dishes.Remove(dish);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
