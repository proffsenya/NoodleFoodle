using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace NoodleFoodle.Models { 


    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone_number { get; } = string.Empty;
        public string Address { get; } = string.Empty;
        public string Password { get; } = string.Empty;
    }
}
