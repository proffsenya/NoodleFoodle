using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Client
{
    public List<int> ClientId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Adress { get; set; }

    public string Password { get; set; } = null!;
}
