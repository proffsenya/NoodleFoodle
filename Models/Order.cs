using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NoodleFoodle.Models;

[Table("orders")]
[Index("DishId", Name = "dish_id")]
[Index("UserId", Name = "user_id")]
public partial class Order
{
    [Key]
    [Column("id", TypeName = "int(11)")]
    public int Id { get; set; }

    [Column("user_id", TypeName = "int(11)")]
    public int UserId { get; set; }

    [Column("order_date")]
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    [Column("sum", TypeName = "decimal(10,2)")]
    public decimal Sum { get; set; }

    [Column("order_status")]
    [StringLength(50)]
    public string OrderStatus { get; set; } = "Pending";

    [Column("dish_id", TypeName = "int(11)")]
    public int DishId { get; set; }

    [Column("amount_dishes", TypeName = "int(11)")]
    public int AmountDishes { get; set; }

    [ForeignKey("DishId")]
    [InverseProperty("Orders")]
    public virtual Dish? Dish { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Orders")]
    public virtual Client? Client { get; set; }
}
