using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Delivery
{
    public int DeliveryId { get; set; }

    public int OrderId { get; set; }

    public int CourierId { get; set; }

    public string? Address { get; set; }

    public string? Status { get; set; }

    public decimal? Data { get; set; }
}
