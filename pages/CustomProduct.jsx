import "../src/index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { ingredientsData } from "../data/data";

const MAX_WEIGHT = 700; // Максимальный вес в граммах

// Все ингредиенты в одном массиве


export default function CustomProduct() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [weightError, setWeightError] = useState("");
  const [typeError, setTypeError] = useState("");
  const currentWeight = selectedIngredients.reduce((sum, ing) => sum + ing.weight, 0);
  const totalPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);

  const handleDrop = (ingredient) => {
    // Проверка на максимальный вес
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
      <div className="ramen-builder-container">
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
        <h2>Создайте свой собственный рамен</h2>
        <p className="mb-8 text-gray-600">Возьмите и перетащите ингредиенты (Максимально 700г)</p>
        {typeError && <p className="mb-8 text-red-600 error ">{typeError}</p>}
        <div className="wooden-bowl" id="bowl-dropzone">
          <div className="bowl-content">
            <div className="selected-ingredients">
              {selectedIngredients.length === 0 ? (
                <p className="text-gray-500">Перетащите ингредиенты сюда</p>
              ) : (
                selectedIngredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-badge">
                    <span>{ingredient.name}</span>
                    <button onClick={() => onRemove(index)}>⛌
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="weight-indicator">{currentWeight}г / 700г</div>
          </div>
        </div>
        <div className="price-summary">
          <h3>Ваш рамен</h3>
          <div className="total-price">
            <span>Общий вес:</span>
            <span> {currentWeight}г</span>
          </div>
          <div className="total-price">
            <span>Итого: </span>
            <span> {totalPrice.toFixed(2)}₽</span>
          </div>
          <button className="btn-primary btn-large" onClick={onClear}>Убрать всё</button>
        </div>
      </div>
    );
  }

