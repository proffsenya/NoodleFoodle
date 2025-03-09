using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NoodleFoodle.Models;

[Table("orders")]
[Index("ClientId", Name = "client_id")]
public partial class Order
{
    [Key]
    [Column("id", TypeName = "int(11)")]
    public int Id { get; set; }

    [Column("client_id", TypeName = "int(11)")]
    public int ClientId { get; set; }

    [Column("order_date")]
    public DateTime OrderDate { get; set; }

    [Column("sum", TypeName = "decimal(10,2)")]
    public decimal TotalSum { get; set; }

    [Column("order_status")]
    [StringLength(50)]
    public string OrderStatus { get; set; } = "Draft"; //Draft - черновик, Created - заказ создан

    [Column("amount_dishes", TypeName = "int(11)")]
    public int AmountDishes { get; set; }

    [ForeignKey("ClientId")]
    public virtual Client? Client { get; set; }
    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();
}
