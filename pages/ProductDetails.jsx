import Header from "../components/Header";
import Footer from "../components/Footer";
import {dishes} from "../data/data";

import { ingredientsData } from "../data/data";

import {Link, useParams, useSearchParams} from "react-router-dom";

export default function ProductDetails() {
    const {productid} = useParams();
    const product = dishes.find((item) => item.id === parseInt(productid, 10));

    return (
        <>
        <Header />
        <section className="relative pt-10">
          <div className="h-[600px] text-center flex flex-col items-center justify-center relative">
            <img
              src={product.image}
              alt="Delicious Noodles"
              className="relative w-[800px] h-[450px] brightness-50 rounded-3xl bg-black mx-auto"
            />
            <div className="absolute flex flex-col items-start text-left text-white bottom-20">
              <h1 className="mb-2 text-4xl font-bold">{product.name}</h1>
              <p className="max-w-[45rem] mb-8 text-start text-m ">
              {product.description}
              </p>
              <button className="max-w-[45rem] px-3 py-2 mb-8 text-left text-black bg-white rounded-md text-m">
              {product.price}
              </button>
            </div>
          </div>
        </section>
        <IngredientsLayout MenuObj={product}/>
        
        <Footer />
        </>
    )
}

function IngredientsLayout({ MenuObj }) {
  return (
    <section className="px-4 py-10 pb-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="mt-10 text-3xl font-bold text-center mb-11">Ингредиенты</h2>
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
    return <div>Ингредиент не найден</div>;
  }

  return(
      <div className="container flex items-center justify-center h-full overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex flex-col justify-center flex-grow p-4 text-center">
              <div className="flex flex-row items-center justify-between">
              <img src = {ingredient.image} alt={Ingredient} width="50" height="50" className="rounded-lg" ></img>
                  <span className="text-xl">{Ingredient}</span>
                  <span className="text-gray-600 text-l">{ingredient.weight}г</span>

              </div>
          </div>
      </div>
  )
}



