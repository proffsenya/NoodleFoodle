using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Client
{
    public int ClientId { get; set; }

    public string Name { get; set; } = null!;

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Adress { get; set; }

    public string Password { get; set; } = null!;
}
