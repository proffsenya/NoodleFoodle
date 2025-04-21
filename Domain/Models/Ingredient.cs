using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Ingredient
{
    public int IngredientId { get; set; }

    public string? Name { get; set; }

    public int? Price { get; set; }

    public int? Weight { get; set; }
}
