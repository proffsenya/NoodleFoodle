import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../src/features/cart/cartSlice';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dishes } from "../data/data";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { productid } = useParams();
  const product = dishes.find((item) => item.id === parseInt(productid, 10));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    alert('Товар добавлен в корзину!');
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <Header />
      <section className="relative pt-10 dark:bg-gray-900">
        <div className="h-[600px] text-center flex flex-col items-center justify-center relative dark:bg-gray-900">
          <img
            src={product.image}
            alt="Delicious Noodles"
            className="relative w-[800px] h-[450px] brightness-50 rounded-3xl bg-black mx-auto"
          />
          <div className="absolute flex flex-col items-start text-left text-white bottom-20">
            <h1 className="mb-2 text-4xl font-bold dark:text-gray-100">{product.name}</h1>
            <p className="max-w-[45rem] mb-8 text-start text-m dark:text-gray-300">
              {product.description}
            </p>
            <button
              onClick={handleAddToCart}
              className="max-w-[45rem] px-3 py-2 mb-8 text-left text-black bg-white rounded-md text-m 
                         dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Добавить в корзину - {product.price}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}