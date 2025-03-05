using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NoodleFoodle.Models;

[Table("ingredients")]
public partial class Ingredient
{
    [Key]
    [Column("id", TypeName = "int(11)")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Column("price", TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [Column("weight")]
    public double Weight { get; set; }

    [Column("dish_id", TypeName = "int(11)")]
    public int? DishId { get; set; }

    [Column("kcal")]
    public int Kcal { get; set; }

    [ForeignKey("DishId")]
    [InverseProperty("Ingredients")]
    public virtual Dish? Dish { get; set; }
}
