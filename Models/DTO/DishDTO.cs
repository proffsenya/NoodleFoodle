namespace NoodleFoodle.Models.DTO
{
    public class DishDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public double Weight { get; set; }
        public int Kcal { get; set; }
        public string Type { get; set; } = "custom"; // standard / custom
    }
}
