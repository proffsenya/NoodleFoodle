import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '../src/features/cart/cartSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ingredientsData } from '../data/data'; // Импортируем массив ингредиентов

export default function ProductDetails() {
  const { productid } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем данные о товаре
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dishes/${productid}`);
        setProduct(response.data);
      } catch (error) {
        setError('Ошибка при загрузке данных о товаре');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productid]);

  // Загружаем корзину при монтировании компонента
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      alert('Товар добавлен в корзину!');
    }
  };

  // Функция для получения данных об ингредиентах продукта
  const getProductIngredients = () => {
    if (!product || !product.ingredients) return [];

    // Фильтруем массив ингредиентов по названиям, которые есть в продукте
    return ingredientsData.filter((ingredient) =>
      product.ingredients.includes(ingredient.name)
    );
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  // Получаем ингредиенты продукта
  const productIngredients = getProductIngredients();

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <section className="relative pt-10 dark:bg-gray-900">
        <div className="h-[600px] text-center flex flex-col items-center justify-center relative dark:bg-gray-900">
          <img
            src={product.image}
            alt={product.name}
            className="relative w-[800px] h-[450px] brightness-50 rounded-3xl bg-black mx-auto"
          />
          <div className="absolute flex flex-col items-start text-left text-white bottom-20">
            {/* Название и цена в одну строку */}
            <div className="flex items-center mb-4 space-x-4">
              <h1 className="text-4xl font-bold dark:text-gray-100">{product.name}</h1>
              <span className="px-3 py-2 text-black bg-white rounded-md text-m dark:bg-gray-800 dark:text-white">
                {product.price} ₽
              </span>
            </div>

            {/* Описание блюда */}
            <p className="max-w-[45rem] mb-8 text-start text-m dark:text-gray-300">
              {product.description}
            </p>

            {/* Кнопка добавления в корзину */}
            <button
              onClick={handleAddToCart}
              className="max-w-[45rem] px-3 py-2 mb-8 text-left text-black bg-white rounded-md text-m 
                         dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Добавить в корзину
            </button>
          </div>
        </div>

        {/* Список ингредиентов */}
        <div className="w-full max-w-6xl p-6 mx-auto">
          <h2 className="mb-6 text-2xl font-bold dark:text-gray-100">Ингредиенты</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
              >
                {/* Картинка ингредиента */}
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="object-cover w-24 h-24 mb-4 rounded-lg"
                />
                {/* Название ингредиента */}
                <span className="text-lg font-medium text-center dark:text-gray-100">
                  {ingredient.name}
                </span>
                {/* Вес ингредиента */}
                <span className="px-3 py-1 mt-2 text-sm bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-100">
                  {ingredient.weight} г
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}