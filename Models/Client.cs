using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;


namespace NoodleFoodle.Models {

    [Table("client")]
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id", TypeName = "int")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; } = string.Empty;
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("address")]
        public string Address { get; set; } = string.Empty;
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [InverseProperty("Client")]
        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
