namespace NoodleFoodle.Models.DTO
{
    public class CustomDishDTO
    {
        public string Name { get; set; } = string.Empty;
        public int ClientId { get; set; }
        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    }
}
