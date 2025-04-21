using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Courier
{
    public int CourierId { get; set; }

    public string Name { get; set; } = null!;

    public string? PhoneNumber { get; set; }
}
