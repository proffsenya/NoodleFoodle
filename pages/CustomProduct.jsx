import "../src/index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { ingredientsData } from "../data/data";
import { useDispatch } from "react-redux";
import { addToCart } from "../src/features/cart/cartSlice"; // Используем общий срез

const MAX_WEIGHT = 700;

export default function CustomProduct() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [weightError, setWeightError] = useState("");
  const [typeError, setTypeError] = useState("");
  const dispatch = useDispatch();

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

  // Функция для добавления кастомного блюда в корзину
  const handleOrder = () => {
    if (selectedIngredients.length === 0) {
      alert("Добавьте ингредиенты в рамен!");
      return;
    }

    // Генерируем уникальный номер блюда
    const customDishNumber = Date.now(); // Используем временную метку как номер блюда

    const customProduct = {
      id: `custom-${customDishNumber}`, // Уникальный ID для кастомного блюда
      name: `Блюдо #${customDishNumber}`, // Название с номером блюда
      description: "Состав: " + selectedIngredients.map(ing => ing.name).join(", "),
      price: totalPrice,
      image: "../img/custom-ramen.jpg", // Можно добавить изображение по умолчанию
      ingredients: selectedIngredients, // Сохраняем ингредиенты для отображения в корзине
      quantity: 1,
    };

    dispatch(addToCart(customProduct)); // Добавляем кастомное блюдо в корзину
    alert("Кастомный рамен добавлен в корзину!");
  };

  return (
    <section className="ramen-builder dark:bg-gray-900 dark:text-white">
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
          onOrder={handleOrder} // Передаем функцию заказа
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
    <div className="ingredients-panel md:sticky md:top-24 h-fit dark:bg-gray-800 dark:text-white">
      {renderIngredientCategory("Лапша", noodles, onDrop)}
      {renderIngredientCategory("Бульон", broths, onDrop)}
    </div>
  );
}

function RightPanel({ onDrop }) {
  const toppings = ingredientsData.filter((item) => item.type === "topping");
  const extras = ingredientsData.filter((item) => item.type === "extra");

  return (
    <div className="ingredients-panel md:sticky md:top-24 h-fit dark:bg-gray-800 dark:text-white">
      {renderIngredientCategory("Начинки", toppings, onDrop)}
      {renderIngredientCategory("Дополнительно", extras, onDrop)}
    </div>
  );
}

function renderIngredientCategory(title, ingredients, onDrop) {
  return (
    <div className="ingredients-category dark:bg-gray-700">
      <h3 className="mb-2 text-lg font-semibold dark:text-white">{title}</h3>
      <div className="flex gap-2 pb-2 overflow-x-auto md:flex-col md:overflow-visible">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="ingredient-item min-w-[200px] md:min-w-0 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("ingredient", JSON.stringify(ingredient))}
          >
            <span>{ingredient.name}</span>
            <div className="ingredient-weight dark:text-gray-400">{ingredient.weight}г</div>
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
  typeError,
  onOrder, // Принимаем функцию заказа
}) {
  const handleDropInBowl = (e) => {
    e.preventDefault();
    const ingredient = JSON.parse(e.dataTransfer.getData("ingredient"));
    if (currentWeight + ingredient.weight <= MAX_WEIGHT) {
      onDropInBowl(ingredient);
    }
  };

  return (
    <div className="bowl-container dark:bg-gray-800" onDrop={handleDropInBowl} onDragOver={(e) => e.preventDefault()}>
      <h2 className="mb-4 text-2xl font-bold text-center dark:text-white">Создайте свой собственный рамен</h2>
      <p className="mb-4 text-center text-gray-600 dark:text-gray-400">Возьмите и перетащите ингредиенты (Максимально 700г)</p>
      {typeError && <p className="mb-4 text-center text-red-600 dark:text-red-400">{typeError}</p>}

      <div className="wooden-bowl w-full max-w-[400px] mx-auto dark:bg-gray-700">
        <div className="bowl-content dark:bg-gray-600">
          <div className="selected-ingredients">
            {selectedIngredients.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-300">Перетащите ингредиенты сюда</p>
            ) : (
              selectedIngredients.map((ingredient, index) => (
                <div key={index} className="ingredient-badge dark:bg-gray-500">
                  <span className="dark:text-white">{ingredient.name}</span>
                  <button
                    onClick={() => onRemove(index)}
                    className="ml-2 text-red-500 hover:text-red-700 dark:text-red-300"
                  >
                    ⛌
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="weight-indicator dark:bg-gray-800 dark:text-white">
            {currentWeight}г / {MAX_WEIGHT}г
          </div>
        </div>
      </div>

      <div className="mt-8 price-summary dark:text-gray-200">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">Ваш рамен</h3>
        <div className="flex justify-between mb-2 total-price">
          <span>Общий вес:</span>
          <span>{currentWeight}г</span>
        </div>
        <div className="flex justify-between mb-4 total-price">
          <span>Итого:</span>
          <span className="font-bold">{totalPrice.toFixed(2)}₽</span>
        </div>
        <button
          className="w-full py-3 btn-primary dark:bg-red-600 dark:hover:bg-red-700"
          onClick={onClear}
        >
          Убрать всё
        </button>
        {/* Кнопка "Заказать" */}
        <button
          className="w-full py-3 mt-4 btn-primary dark:bg-green-600 dark:hover:bg-green-700"
          onClick={onOrder}
        >
          Заказать
        </button>
      </div>
    </div>
  );
}