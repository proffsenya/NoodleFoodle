import Header from "../components/Header";
import Footer from "../components/Footer";
import {dishes} from "../data/data";


export default function Menu() {
    return (
        <>
        <Header />
        <Layout />
        <Footer />
        </>
    )
}

function Layout() {
    return (
        <section id="menu" className="px-4 py-20 bg-gray-50">
                <div className="container mx-auto">
                  <h2 className="mt-10 text-3xl font-bold text-center mb-11">
                    Меню
                  </h2>
                  <div className="grid gap-8 md:grid-cols-3">
                    {dishes.map((item) => (
                      <MenuConst MenuObj = {item} key = {item.name} />
                    ))}
                    </div>
                </div>
            </section>
    )
}

function MenuConst({MenuObj}){
    return(
        <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md">
            <img src={MenuObj.image} alt={MenuObj.name} className="object-cover w-full h-48" />
            <div className="flex flex-col flex-grow p-4">
                <h3 className="mb-2 text-xl font-semibold">{MenuObj.name}</h3>
                <p className="flex-grow text-gray-600">{MenuObj.description}</p>
                <div className="flex items-center justify-between pt-4 mt-auto">
                    <span className="text-xl font-bold">{MenuObj.price}</span>
                    <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
                    Заказать
                    </button>
                </div>
            </div>
        </div>
    )
}



