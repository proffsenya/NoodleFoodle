export default function CustomProduct() {
    return (
        <div>
            customproduct
        </div>
    )
}

function LeftPanel({ onDrop }) {
    const noodles = ingredientsData.filter((item) => item.type === "noodles");
    const broths = ingredientsData.filter((item) => item.type === "broth");
  
    return (
      <div className="ingredients-panel">
        {renderIngredientCategory("Лапша", noodles, onDrop)}
        {renderIngredientCategory("Бульон", broths, onDrop)}
      </div>
    );
  }
  
  function RightPanel({ onDrop }) {
    const toppings = ingredientsData.filter((item) => item.type === "topping");
    const extras = ingredientsData.filter((item) => item.type === "extra");
  
    return (
      <div className="ingredients-panel">
        {renderIngredientCategory("Начинки", toppings, onDrop)}
        {renderIngredientCategory("Дополнительно", extras, onDrop)}
      </div>
    );
  }

  function renderIngredientCategory(title, ingredients, onDrop) {
    return (
      <div className="ingredients-category">
        <h3>{title}</h3>
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="ingredient-item"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("ingredient", JSON.stringify(ingredient))}
          >
            <span>{ingredient.name}</span>
            <div className="ingredient-weight">{ingredient.weight}г</div>
          </div>
        ))}
      </div>
    );
  }

