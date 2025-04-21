using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int UserId { get; set; }

    public decimal DataOrder { get; set; }

    public int? Sum { get; set; }

    public string? OrderStatus { get; set; }

    public int DishId { get; set; }

    public int? AmountDishes { get; set; }
}
