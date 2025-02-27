using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NoodleFoodle.Models;

[Table("dishes")]
public partial class Dish
{
    [Key]
    [Column("id", TypeName = "int(11)")]
    public int Id { get; set; }

    [Column("title")]
    [StringLength(100)]
    public string Title { get; set; } = null!;

    [Column("price", TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [Column("weight")]
    public double Weight { get; set; }

    [Column("kcal")]
    public int Kcal { get; set; }

    [InverseProperty("Dish")]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
