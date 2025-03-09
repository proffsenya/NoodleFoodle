import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartItemQuantity, applyDiscount, setTip, setPackagingType, setDeliveryTime } from '../src/features/cart/cartSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatherIcon from 'feather-icons-react';

const CartItem = ({ item, handleQuantityChange, removeItem }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center">
      <img src={item.image} alt={item.name} className="object-cover w-16 h-16 rounded-lg" />
      <div className="ml-4">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="text-gray-700">{item.price} ₽ x {item.quantity}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <FeatherIcon icon="minus" className="w-[16px] h-[16px]" />
      </button>
      <span className="text-xl">{item.quantity}</span>
      <button
        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <FeatherIcon icon="plus" className="w-[16px] h-[16px]" />
      </button>
    </div>
    <button
      onClick={() => removeItem(item.id)}
      className="text-red-600 hover:text-red-700"
    >
      <FeatherIcon icon="trash-2" className="w-[18px] h-[18px]" />
    </button>
  </div>
);

const PromoCodeSection = ({ discountCode, setDiscountCode, applyDiscount }) => (
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Промокод</label>
    <div className="flex mt-2 space-x-4">
      <input
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Введите промокод"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={applyDiscount}
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Применить
      </button>
    </div>
  </div>
);

const TipSection = ({ selectedTip, handleTipSelection }) => (
  <div className="mt-6 mb-6">
    <label className="block text-sm font-medium text-gray-700">Добавить чаевые</label>
    <div className="flex mt-2 space-x-4">
      {[10, 15, 20].map(tip => (
        <button
          key={tip}
          onClick={() => handleTipSelection(tip)}
          className={`px-4 py-2 rounded-lg ${
            selectedTip === tip
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {tip}%
        </button>
      ))}
      <button
        onClick={() => handleTipSelection(null)}
        className={`px-4 py-2 rounded-lg ${
          selectedTip === null
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Нет
      </button>
    </div>
  </div>
);

const PackagingSection = ({ packagingType, setPackagingType }) => (
  <div className="mt-6 mb-6">
    <label className="block text-sm font-medium text-gray-700">Тип упаковки</label>
    <div className="flex mt-2 space-x-4">
      {['standard', 'eco'].map(type => (
        <button
          key={type}
          onClick={() => setPackagingType(type)}
          className={`px-4 py-2 rounded-lg ${
            packagingType === type
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {type === 'standard' ? 'Стандартная' : 'Эко-упаковка'}
        </button>
      ))}
    </div>
  </div>
);

const DeliveryTimeSection = ({ deliveryTime, setDeliveryTime }) => (
  <div className="mt-6 mb-6">
    <label className="block text-sm font-medium text-gray-700">Время доставки</label>
    <div className="mt-2 overflow-x-auto">
      <div className="flex space-x-4">
        {Array.from({ length: 14 }, (_, i) => 10 + i).map(hour => (
          <button
            key={hour}
            onClick={() => setDeliveryTime(`${hour}:00`)}
            className={`px-4 py-2 rounded-lg ${
              deliveryTime === `${hour}:00`
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {`${hour}:00`}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const DeliveryInfoForm = ({ client }) => (
  <div className="mt-6">
    <h2 className="mb-6 text-2xl font-bold text-gray-900">Данные для доставки</h2>
    <form>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="name">
          Имя
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="name"
          type="text"
          placeholder="Введите ваше имя"
          defaultValue={client?.fullName || ''}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="address">
          Адрес
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="address"
          type="text"
          placeholder="Введите ваш адрес"
          defaultValue={client?.address || ''}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="phone">
          Телефон
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="phone"
          type="tel"
          placeholder="Введите ваш телефон"
          defaultValue={client?.phone || ''}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="email"
          type="email"
          placeholder="Введите ваш email"
          defaultValue={client?.email || ''}
          required
        />
      </div>
    </form>
  </div>
);

const OrderSummary = ({ discount, tips, finalPrice }) => (
  <div className="mt-6">
    <h2 className="mb-6 text-2xl font-bold text-gray-900">Итоговая сумма</h2>
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-700">Скидка</span>
        <span className="text-gray-900">-{discount.toFixed(2)} ₽</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-700">Чаевые</span>
        <span className="text-gray-900">{tips.toFixed(2)} ₽</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-700">Итого</span>
        <span className="font-bold text-gray-900">{finalPrice.toFixed(2)} ₽</span>
      </div>
    </div>
    <button
      className="w-full px-6 py-3 mt-6 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
    >
      Подтвердить заказ
    </button>
  </div>
);

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { items, discount, tip, packagingType, deliveryTime } = useSelector((state) => state.cart);
  const { client } = useSelector((state) => state.client); // Данные пользователя из профиля
  const [discountCode, setDiscountCode] = useState('');

  const totalPrice = items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const finalPrice = totalPrice - discount + (totalPrice * (tip / 100));

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Не позволяем количеству быть меньше 1
    dispatch(updateCartItemQuantity({ id, quantity })); // Вызываем действие
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleApplyDiscount = () => {
    if (discountCode === "WELCOME10") {
      dispatch(applyDiscount(totalPrice * 0.1));
      alert("Скидка 10% применена!");
    } else if (discountCode === "SUMMER20") {
      dispatch(applyDiscount(totalPrice * 0.2));
      alert("Скидка 20% применена!");
    } else {
      alert("Неверный код скидки.");
    }
  };

  const handleTipSelection = (tip) => {
    dispatch(setTip(tip));
  };

  const handlePackagingType = (type) => {
    dispatch(setPackagingType(type));
  };

  const handleDeliveryTime = (time) => {
    dispatch(setDeliveryTime(time));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center flex-grow p-12 space-y-12">
        <h1 className="mt-16 mb-8 text-4xl font-bold text-gray-900">Корзина</h1>

        {/* Если корзина пуста, показываем сообщение */}
        {items.length === 0 ? (
          <div className="w-full max-w-6xl p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Ваша корзина пуста</h2>
          </div>
        ) : (
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Левый столбец: Корзина и дополнительные опции */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Ваш заказ</h2>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  removeItem={removeItem}
                />
              ))}
              <PromoCodeSection
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                applyDiscount={handleApplyDiscount}
              />
              <TipSection
                selectedTip={tip}
                handleTipSelection={handleTipSelection}
              />
              <PackagingSection
                packagingType={packagingType}
                setPackagingType={handlePackagingType}
              />
              <DeliveryTimeSection
                deliveryTime={deliveryTime}
                setDeliveryTime={handleDeliveryTime}
              />
            </div>

            {/* Правый столбец: Данные покупателя и итоговая стоимость */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <DeliveryInfoForm client={client} />
              <div className="mt-6">
                <OrderSummary
                  discount={discount}
                  tips={totalPrice * (tip / 100)}
                  finalPrice={finalPrice}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}