import "../src/index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { ingredientsData } from "../data/data";

const MAX_WEIGHT = 700;

export default function CustomProduct() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [weightError, setWeightError] = useState("");
  const [typeError, setTypeError] = useState("");
  const currentWeight = selectedIngredients.reduce((sum, ing) => sum + ing.weight, 0);
  const totalPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);

  const handleDrop = (ingredient) => {
    if (currentWeight + ingredient.weight > MAX_WEIGHT) {
      setWeightError("Ошибка: общий вес не может превышать 700г.");
      return;
    } else {
      setWeightError("");
    }

    if (
      (ingredient.type === "noodles" || ingredient.type === "broth") &&
      selectedIngredients.some((ing) => ing.type === ingredient.type)
    ) {
      setTypeError("Ошибка: только один тип лапши или бульона может быть добавлен.");
      return;
    } else {
      setTypeError("");
    }

    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const removeIngredient = (index) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const clearBowl = () => {
    setSelectedIngredients([]);
    setWeightError("");
    setTypeError("");
  };

  return (
    <section className="ramen-builder">
      <Header />
      <div className="ramen-builder-container flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] gap-4 p-4">
        <LeftPanel onDrop={handleDrop} />
        <CenterBowl
          selectedIngredients={selectedIngredients}
          totalPrice={totalPrice}
          currentWeight={currentWeight}
          onRemove={removeIngredient}
          onClear={clearBowl}
          onDropInBowl={handleDrop}
          weightError={weightError}
          typeError={typeError}
        />
        <RightPanel onDrop={handleDrop} />
      </div>
      <Footer />
    </section>
  );
}

function LeftPanel({ onDrop }) {
  const noodles = ingredientsData.filter((item) => item.type === "noodles");
  const broths = ingredientsData.filter((item) => item.type === "broth");

  return (
    <div className="ingredients-panel md:sticky md:top-24 h-fit">
      {renderIngredientCategory("Лапша", noodles, onDrop)}
      {renderIngredientCategory("Бульон", broths, onDrop)}
    </div>
  );
}

function RightPanel({ onDrop }) {
  const toppings = ingredientsData.filter((item) => item.type === "topping");
  const extras = ingredientsData.filter((item) => item.type === "extra");

  return (
    <div className="ingredients-panel md:sticky md:top-24 h-fit">
      {renderIngredientCategory("Начинки", toppings, onDrop)}
      {renderIngredientCategory("Дополнительно", extras, onDrop)}
    </div>
  );
}

function renderIngredientCategory(title, ingredients, onDrop) {
  return (
    <div className="ingredients-category">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="ingredient-item min-w-[200px] md:min-w-0"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("ingredient", JSON.stringify(ingredient))}
          >
            <span>{ingredient.name}</span>
            <div className="ingredient-weight">{ingredient.weight}г</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CenterBowl({
  selectedIngredients,
  totalPrice,
  currentWeight,
  onRemove,
  onClear,
  onDropInBowl,
  weightError,
  typeError
}) {
  const handleDropInBowl = (e) => {
    e.preventDefault();
    const ingredient = JSON.parse(e.dataTransfer.getData("ingredient"));
    if (currentWeight + ingredient.weight <= MAX_WEIGHT) {
      onDropInBowl(ingredient);
    }
  };

  return (
    <div className="bowl-container" onDrop={handleDropInBowl} onDragOver={(e) => e.preventDefault()}>
      <h2 className="text-2xl font-bold text-center mb-4">Создайте свой собственный рамен</h2>
      <p className="mb-4 text-gray-600 text-center">Возьмите и перетащите ингредиенты (Максимально 700г)</p>
      {typeError && <p className="text-red-600 text-center mb-4">{typeError}</p>}

      <div className="wooden-bowl w-full max-w-[400px] mx-auto">
        <div className="bowl-content">
          <div className="selected-ingredients">
            {selectedIngredients.length === 0 ? (
              <p className="text-gray-500 text-center">Перетащите ингредиенты сюда</p>
            ) : (
              selectedIngredients.map((ingredient, index) => (
                <div key={index} className="ingredient-badge">
                  <span>{ingredient.name}</span>
                  <button 
                    onClick={() => onRemove(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ⛌
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="weight-indicator">
            {currentWeight}г / {MAX_WEIGHT}г
          </div>
        </div>
      </div>

      <div className="price-summary mt-8">
        <h3 className="text-xl font-semibold mb-4">Ваш рамен</h3>
        <div className="total-price flex justify-between mb-2">
          <span>Общий вес:</span>
          <span>{currentWeight}г</span>
        </div>
        <div className="total-price flex justify-between mb-4">
          <span>Итого:</span>
          <span className="font-bold">{totalPrice.toFixed(2)}₽</span>
        </div>
        <button 
          className="btn-primary w-full py-3"
          onClick={onClear}
        >
          Убрать всё
        </button>
      </div>
    </div>
  );
}
