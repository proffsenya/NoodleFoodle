using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;
using NoodleFoodle.Models.DTO;

namespace NoodleFoodle.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly DishService _dishService;

        public MenuController(DishService dishService)
        {
            _dishService = dishService;
        }

        [HttpPost("custom")]
        public async Task<ActionResult> CreateCustomDish([FromBody] CustomDishDTO customDishDto)
        {
            if (customDishDto == null || customDishDto.Ingredients == null || !customDishDto.Ingredients.Any())
            {
                return BadRequest("Необходимо указать ингредиенты для кастомного блюда.");
            }

            var customDish = await _dishService.CreateCustomDishAsync(customDishDto);
            if (customDish == null)
            {
                return BadRequest("Ошибка при создании кастомного блюда.");
            }

            return CreatedAtAction(nameof(DishesController.GetDish), "Dishes", new { id = customDish.Id }, customDish);

        }

    }
}
