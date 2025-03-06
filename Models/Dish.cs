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

    [Column("order_id", TypeName = "int(11)")]
    public int? OrderId { get; set; }

    [Column("type")]
    [StringLength(50)]
    public string Type { get; set; } = "standard"; // standard / custom

    [Column("client_id", TypeName = "int(11)")]
    public int? ClientId { get; set; }

    [ForeignKey("ClientId")]
    public virtual Client? Client { get; set; }

    [ForeignKey("OrderId")]
    [InverseProperty("Dishes")]
    public virtual Order? Order { get; set; }

    public virtual ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
}
