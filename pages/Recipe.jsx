import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function Recipe() {

      const [recipes, setRecipes] = useState([
        {
          id: 1,
          name: "Рецепт 1: Лапша с креветками",
          ingredients: ["Лапша", "Креветки", "Овощи", "Соевый соус", "Имбирь"],
        },
        {
          id: 2,
          name: "Рецепт 2: Рамен с курицей",
          ingredients: ["Рамен", "Курица", "Яйцо", "Зеленый лук", "Чеснок"],
        },
        {
          id: 3,
          name: "Рецепт 3: Вьетнамская лапша с говядиной",
          ingredients: ["Вьетнамская лапша", "Говядина", "Огурец", "Морковь", "Перец чили"],
        },
        {
          id: 4,
          name: "Рецепт 4: Соба с тофу",
          ingredients: ["Соба", "Тофу", "Шпинат", "Кунжут", "Соевый соус"],
        },
        {
          id: 5,
          name: "Рецепт 5: Якисоба с морепродуктами",
          ingredients: ["Якисоба", "Морепродукты", "Капуста", "Морковь", "Соус Якисоба"],
        },
      ]);
      
    return (
        <>
        <div className="flex flex-col min-h-screen text-black bg-white">
            <div className="flex flex-col items-center flex-grow p-10 space-y-12">
                <h1 className="mt-16 mb-8 text-4xl font-bold text-gray-900">Рецепты из конструктора</h1>
                <div className="w-full max-w-4xl space-y-6">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="p-6 transition-transform transform bg-white shadow-xl rounded-xl hover:scale-105"
                            >
                            <h2 className="text-2xl font-semibold text-gray-800">{recipe.name}</h2>
                            <ul className="pl-4 mt-2 list-disc list-inside">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="text-gray-700">
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
        <Footer />
        </>
    )
}

