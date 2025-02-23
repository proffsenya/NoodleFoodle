using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public List<int> UserId { get; set; } = null!;

    public decimal DataOrder { get; set; }

    public int? Sum { get; set; }

    public string? OrderStatus { get; set; }

    public List<int>? RamenId { get; set; }
}
