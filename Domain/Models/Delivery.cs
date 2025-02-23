using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Delivery
{
    public List<int> DeliveryId { get; set; } = null!;

    public List<int>? OrderId { get; set; }

    public List<int>? CourierId { get; set; }

    public string? AddressDelivery { get; set; }

    public string? StatusDelivery { get; set; }

    public decimal? DataDelivery { get; set; }
}
