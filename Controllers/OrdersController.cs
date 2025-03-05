using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrderService _orderService;

    public OrdersController(OrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return Ok(await _orderService.GetOrdersAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id);
        if (order == null)
            return NotFound();
        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult> CreateOrder(Order order)
    {
        await _orderService.CreateOrderAsync(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateOrder(int id, Order order)
    {
        if (id != order.Id)
            return BadRequest();

        var updatedOrder = await _orderService.UpdateOrderAsync(id, order);
        if (updatedOrder == null)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOrder(int id)
    {
        var deleted = await _orderService.DeleteOrderAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }

    // Методы для работы с корзиной внутри заказа

    [HttpPost("{orderId}/add-dish/{dishId}")]
    public async Task<ActionResult> AddDishToOrder(int orderId, int dishId)
    {
        var success = await _orderService.AddDishToOrder(orderId, dishId);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpDelete("{orderId}/remove-dish/{dishId}")]
    public async Task<ActionResult> RemoveDishFromOrder(int orderId, int dishId)
    {
        var success = await _orderService.RemoveDishFromOrder(orderId, dishId);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpGet("{orderId}/contents")]
    public async Task<ActionResult<IEnumerable<Dish>>> GetOrderContents(int orderId)
    {
        return Ok(await _orderService.GetOrderContents(orderId));
    }

    [HttpDelete("{orderId}/clear")]
    public async Task<ActionResult> ClearOrder(int orderId)
    {
        var success = await _orderService.ClearOrder(orderId);
        if (!success) return NotFound();
        return NoContent();
    }
}
