using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;
using NoodleFoodle.Services.Interfaces;

namespace NoodleFoodle.Services
{
    public class OrderService : IOrderService
    {
        private readonly Test1Context _context;

        public OrderService(Test1Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<IEnumerable<Order>> GetClientOrdersAsync(int clientId) //получить все заказы клиента
        {
            return await _context.Orders
                .Where(o => o.ClientId == clientId)
                .Include(o => o.Dishes)
                .ToListAsync();
        }

        public async Task<Order?> GetDraftOrderAsync(int clientId)
        {
            return await _context.Orders
                .Where(o => o.ClientId == clientId && o.OrderStatus == "Draft")
                .Include(o => o.Dishes)
                .FirstOrDefaultAsync();
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> UpdateOrderAsync(int id, Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder == null) return null;

            existingOrder.OrderDate = order.OrderDate;
            existingOrder.TotalSum = order.TotalSum;
            existingOrder.OrderStatus = order.OrderStatus;
            existingOrder.Dishes = order.Dishes;
            existingOrder.AmountDishes = order.AmountDishes;

            await _context.SaveChangesAsync();
            return existingOrder;
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> AddDishToDraftOrderAsync(int clientId, int dishId) //добавить блюдо в черновик заказа (в коризну)
        {
            var order = await GetDraftOrderAsync(clientId);
            if (order == null)
            {
                order = new Order
                {
                    ClientId = clientId,
                    //OrderDate = null,
                    OrderStatus = "Draft",
                    //Dishes = new List<Dish>()
                };
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
            }

            var dish = await _context.Dishes.FindAsync(dishId);
            if (dish == null) return false;

            order.Dishes.Add(dish);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> RemoveDishFromDraftOrderAsync(int clientId, int dishId) //удалить блюдо из корзины (черновика)
        {
            var order = await GetDraftOrderAsync(clientId);
            if (order == null) return false;

            var dish = order.Dishes.FirstOrDefault(d => d.Id == dishId);
            if (dish == null) return false;

            order.Dishes.Remove(dish);
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<IEnumerable<Dish>> GetOrderContents(int orderId) //получить данные из заказа
        {
            var order = await _context.Orders.Include(o => o.Dishes).FirstOrDefaultAsync(o => o.Id == orderId);
            return order?.Dishes ?? new List<Dish>();
        }
        public async Task<bool> ClearOrder(int clientId) //очистить корзину (черновик заказа)
        {
            var order = await GetDraftOrderAsync(clientId);
            if (order == null) return false;

            _context.Orders.Remove(order); 
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<(bool success, string message)> FinalizeOrderAsync(int clientId) //оформить заказ
        {
            var order = await GetDraftOrderAsync(clientId);
            if (order == null || !order.Dishes.Any())
                return (false, "Невозможно оформить пустой заказ");

            order.OrderStatus = "Created";
            order.OrderDate = DateTime.UtcNow;
            //order.Address = address;

            await _context.SaveChangesAsync();
            return (true, "Заказ успешно оформлен");
        }
    }
}