using System;
using System.Collections.Generic;

namespace NoodlefoodleStore.Domain.Models;

public partial class Ingredient
{
    public List<int> IngredientId { get; set; } = null!;

    public string? IngredientName { get; set; }

    public int? IngredientPrice { get; set; }

    public int? IngredientWeight { get; set; }
}
