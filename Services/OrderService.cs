using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;
using NoodleFoodle.Services.Interfaces;
using System;

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


        public async Task<bool> AddDishToOrder(int orderId, int dishId)
        {
            var order = await _context.Orders.Include(o => o.Dishes).FirstOrDefaultAsync(o => o.Id == orderId);
            var dish = await _context.Dishes.FindAsync(dishId);

            if (order == null || dish == null) return false;

            order.Dishes.Add(dish);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveDishFromOrder(int orderId, int dishId)
        {
            var order = await _context.Orders.Include(o => o.Dishes).FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) return false;

            var dish = order.Dishes.FirstOrDefault(d => d.Id == dishId);
            if (dish == null) return false;

            order.Dishes.Remove(dish);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Dish>> GetOrderContents(int orderId)
        {
            var order = await _context.Orders.Include(o => o.Dishes).FirstOrDefaultAsync(o => o.Id == orderId);
            return order?.Dishes ?? new List<Dish>();
        }
        public async Task<bool> ClearOrder(int orderId)
        {
            var order = await _context.Orders.Include(o => o.Dishes).FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) return false;

            _context.Orders.Remove(order); // Удаляем сам заказ
            return await _context.SaveChangesAsync() > 0;
        }

    }
}