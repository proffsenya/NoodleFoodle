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

    [Column("kcal")]
    public int Kcal { get; set; }

    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();
}
