import Header from "../components/Header";
import Footer from "../components/Footer";
import {dishes} from "../data/data";
import { ingredientsData } from "../data/data";
import {Link, useParams, useSearchParams} from "react-router-dom";

export default function ProductDetails() {
    const {productid} = useParams();
    const product = dishes.find((item) => item.id === parseInt(productid, 10));

    return (
        <div className="dark:bg-gray-900 min-h-screen transition-colors duration-300">
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
                        <button className="max-w-[45rem] px-3 py-2 mb-8 text-left text-black bg-white rounded-md text-m 
                                       dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300">
                            {product.price}
                        </button>
                    </div>
                </div>
            </section>
            <IngredientsLayout MenuObj={product}/>
            <Footer />
        </div>
    )
}

function IngredientsLayout({ MenuObj }) {
  return (
    <section className="px-4 py-10 pb-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto">
        <h2 className="mt-10 text-3xl font-bold text-center mb-11 dark:text-white">Ингредиенты</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {MenuObj.ingredients.map((ingredient) => (
            <IngredientsConst Ingredient={ingredient} key={ingredient} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IngredientsConst({Ingredient}){
  const ingredient = ingredientsData.find((item) => item.name === Ingredient);
  if (!ingredient) {
    return <div className="dark:text-white">Ингредиент не найден</div>;
  }

  return(
      <div className="container flex items-center justify-center h-full overflow-hidden bg-white rounded-lg shadow-md
                    dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300">
          <div className="flex flex-col justify-center flex-grow p-4 text-center">
              <div className="flex flex-row items-center justify-between">
                  <img 
                      src={ingredient.image} 
                      alt={Ingredient} 
                      width="50" 
                      height="50" 
                      className="rounded-lg dark:brightness-90"
                  />
                  <span className="text-xl dark:text-gray-200">{Ingredient}</span>
                  <span className="text-gray-600 text-l dark:text-gray-400">{ingredient.weight}г</span>
              </div>
          </div>
      </div>
  )
}