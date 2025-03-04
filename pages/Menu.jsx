import Header from "../components/Header";
import Footer from "../components/Footer";
import {dishes} from "../data/data";
import {Link} from "react-router-dom";

export default function Menu() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <Layout />
            <Footer />
        </div>
    )
}

function Layout() {
    return (
      <section className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="mt-10 text-3xl font-bold text-center mb-11 dark:text-white">Меню</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {dishes.map((item) => (
              <MenuConst MenuObj={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    )
}

function MenuConst({MenuObj}){
    return(
        <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-700 transition-colors duration-300">
            <img 
                src={MenuObj.image} 
                alt={MenuObj.name} 
                className="object-cover w-full h-48 dark:brightness-90" 
            />
            <div className="flex flex-col flex-grow p-4">
                <h3 className="mb-2 text-xl font-semibold dark:text-white">{MenuObj.name}</h3>
                <p className="flex-grow text-gray-600 dark:text-gray-300">{MenuObj.description}</p>
                <div className="flex items-center justify-between pt-4 mt-auto">
                    <span className="text-xl font-bold dark:text-white">{MenuObj.price}</span>
                    <Link to={MenuObj.id === 1 ? `/customproduct` : `/productdetails/${MenuObj.id}`}>
                        <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600">
                            Перейти
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}