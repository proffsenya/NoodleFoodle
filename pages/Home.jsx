import {whychoose, populardishes} from "../data/data";


import Header from "../components/Header";
import Footer from "../components/Footer";

import "../src/index.css";


export default function Home() {

  return (
    <div className="min-h-screen bg-white">
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
    <section id="home" className="relative pt-20">
        <div className="h-[600px] relative">
          <img
            src="../img/video5.gif"
            alt="Delicious Noodles"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white bg-black bg-opacity-50">
            <h1 className="mb-4 text-5xl font-bold">Добро пожаловать в NoodleFoodle</h1>
            <p className="max-w-2xl mb-8 text-xl text-center">
            Попробуйте настоящую азиатскую лапшу, которую доставят прямо к вам на дом.
            </p>
            <div className="relative flex items-center justify-center w-full max-w-md">    
              <button className="px-4 py-2 text-black bg-white rounded-md">
                Конструктор блюда
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

function WhyChoose({ProdObj}) {
  return (
    <div className="text-center">
      <img className = "object-cover w-full h-64 mb-4 rounded-lg" src={ProdObj.photoname} alt={ProdObj.name} />
        <h3 className="mb-2 text-xl font-semibold">{ProdObj.name}</h3>
        <p className="text-gray-600">{ProdObj.description}</p>
    </div>
  );
}
  
function FeaturesSection() {
  return (
    <section className="items-center justify-between px-4 py-16 text-center">
        <h2 className="mb-12 text-3xl font-bold text-center">
         Почему выбирают NoodleFoodle?
        </h2>
        <div className="container grid mx-auto md:gap-10 justify-evenly md:grid-cols-16">
          {whychoose.map((item) => (
            <WhyChoose ProdObj={item} key = {item.name}/>
          ))}
        </div>
      </section>
  )
}

function PopularDishesConst({ProdObj}){
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md">
            <img src={ProdObj.image} alt={ProdObj.name} className="object-cover w-full h-48" />
            <div className="flex flex-col flex-grow p-4">
                <h3 className="mb-2 text-xl font-semibold">{ProdObj.name}</h3>
                <p className="flex-grow text-gray-600">{ProdObj.description}</p>
                <div className="flex items-center justify-between pt-4 mt-auto">
                    <span className="text-xl font-bold">{ProdObj.price}</span>
                    <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
                    Перейти
                    </button>
                </div>
            </div>
        </div>
  )
}
  
function PopularDishes(){
  return (
    <section id="menu" className="px-4 py-20 bg-gray-50">
        <div className="container mx-auto ">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Популярные блюда
          </h2>
          <div className="container grid gap-10 mx-auto overflow-x-scroll justify-evenly grid-cols-16">
            {populardishes.map((item) => (
              <PopularDishesConst ProdObj = {item} key = {item.name} />
            ))}

            </div>
        </div>
    </section>
  )
}
  
function ContactSection(){
  return (
    <section id="contact" className="px-4 py-16">
        <div className="container max-w-4xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">О нас</h2>
          <div className="p-8 bg-white rounded-lg shadow-xl">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Имя</label>
                <input
                placeholder="Введите имя"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Почта</label>
                <input
                placeholder="Введите почту"
                  type="email"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Комментарий</label>
                <textarea className="w-full h-32 px-4 py-2 border rounded-md" placeholder="Введите комментарий"></textarea>
              </div>
              <button className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>
  )
}