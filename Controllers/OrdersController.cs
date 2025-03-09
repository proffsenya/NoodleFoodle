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

    [HttpGet("/client/{clientId}")] 
    public async Task<IActionResult> GetClientOrders(int clientId)
    {
        var orders = await _orderService.GetClientOrdersAsync(clientId);
        return Ok(orders);
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
    /// <summary>
    /// информация о черновике (корзине) клиента
    /// </summary>
    /// 
    [HttpGet("draft/{clientId}")]
    public async Task<IActionResult> GetDraftOrder(int clientId)
    {
        var order = await _orderService.GetDraftOrderAsync(clientId);
        if (order == null) return NotFound("Черновик заказа не найден");

        return Ok(order);
    }

    /// <summary>
    /// добавить блюдо в корзину
    /// </summary>
    /// 
    [HttpPost("{clientId}/add-dish/{dishId}")]
    public async Task<ActionResult> AddDishToOrder(int clientId, int dishId)
    {
        var success = await _orderService.AddDishToDraftOrderAsync(clientId, dishId);
        if (!success) return BadRequest("Ошибка при добавлении блюда");

        return Ok("Блюдо добавлено в заказ");
    }

    /// <summary>
    /// удалить блюдо из корзины
    /// </summary>
    /// 
    [HttpDelete("{clientId}/remove-dish/{dishId}")]
    public async Task<ActionResult> RemoveDishFromOrder(int clientId, int dishId)
    {
        var success = await _orderService.RemoveDishFromDraftOrderAsync(clientId, dishId);
        if (!success) return BadRequest("Ошибка при удалении блюда");
        return Ok("Блюдо удалено из заказа");
    }

    //[HttpGet("{orderId}/contents")]
    //public async Task<ActionResult<IEnumerable<Dish>>> GetOrderContents(int orderId)
    //{
    //    return Ok(await _orderService.GetOrderContents(orderId));
    //}

    /// <summary>
    /// очистить корзину
    /// </summary>
    /// 
    [HttpDelete("{clientId}/clear")]
    public async Task<ActionResult> ClearOrder(int clientId)
    {
        var success = await _orderService.ClearOrder(clientId);
        if (!success) return BadRequest("Ошибка при очистке заказа");
        return Ok("Заказ очищен");
    }

    /// <summary>
    /// оформить заказ (подтвердить корзину)
    /// </summary>
    /// 
    [HttpPost("finalize/{clientId}")]
    public async Task<IActionResult> FinalizeOrder(int clientId)
    {
        var (success, message) = await _orderService.FinalizeOrderAsync(clientId);
        if (!success) return BadRequest(message);

        return Ok(new { Message = message });
    }
}
