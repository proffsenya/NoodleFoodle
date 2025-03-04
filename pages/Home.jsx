import {whychoose, populardishes} from "../data/data";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../src/index.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PopularDishes />
      <ContactSection />
      <Footer />
    </div>
  );
}

function HeroSection(){
  return (
    <section id="home" className="relative pt-20 dark:bg-gray-800">
      <div className="h-[600px] relative">
        <img
          src="../img/video5.gif"
          alt="Delicious Noodles"
          className="object-cover w-full h-full dark:opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white bg-black bg-opacity-50 dark:bg-opacity-70">
          <h1 className="mb-4 text-5xl font-bold">Добро пожаловать в NoodleFoodle</h1>
          <p className="max-w-2xl mb-8 text-xl text-center">
            Попробуйте настоящую азиатскую лапшу, которую доставят прямо к вам на дом.
          </p>
          <div className="relative flex items-center justify-center w-full max-w-md">    
            <Link to={"/customproduct"}>
              <button className="px-4 py-2 text-black bg-white rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                Конструктор блюда
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyChoose({ProdObj}) {
  return (
    <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
      <img 
        className="object-cover w-full h-64 mb-4 rounded-lg dark:brightness-90" 
        src={ProdObj.photoname} 
        alt={ProdObj.name} 
      />
      <h3 className="mb-2 text-xl font-semibold dark:text-white">{ProdObj.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{ProdObj.description}</p>
    </div>
  );
}

function PopularDishesConst({ProdObj}){
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 transition-colors duration-300">
      <img 
        src={ProdObj.image} 
        alt={ProdObj.name} 
        className="object-cover w-full h-48 dark:brightness-90" 
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="mb-2 text-xl font-semibold dark:text-white">{ProdObj.name}</h3>
        <p className="flex-grow text-gray-600 dark:text-gray-300">{ProdObj.description}</p>
        <div className="flex items-center justify-between pt-4 mt-auto">
          <span className="text-xl font-bold dark:text-white">{ProdObj.price}</span>
          <Link to={`/productdetails/${ProdObj.id}`}>
            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
              Перейти
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeaturesSection() {
  return (
    <section className="px-4 py-16 text-center dark:bg-gray-800">
      <h2 className="mb-12 text-3xl font-bold dark:text-white">Почему выбирают NoodleFoodle?</h2>
      <div className="container grid grid-cols-1 gap-10 mx-auto md:grid-cols-3">
        {whychoose.map((item) => (
          <WhyChoose ProdObj={item} key={item.name}/>
        ))}
      </div>
    </section>
  )
}

function PopularDishes() {
  return (
    <section id="menu" className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center dark:text-white">Популярные блюда</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {populardishes.map((item) => (
            <PopularDishesConst ProdObj={item} key={item.name} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection(){
  return (
    <section id="contact" className="px-4 py-16 dark:bg-gray-900">
      <div className="container max-w-4xl mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center dark:text-white">О нас</h2>
        <div className="p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">Имя</label>
              <input
                placeholder="Введите имя"
                type="text"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">Почта</label>
              <input
                placeholder="Введите почту"
                type="email"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">Комментарий</label>
              <textarea 
                className="w-full h-32 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                placeholder="Введите комментарий"
              />
            </div>
            <button className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}