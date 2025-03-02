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
        {/* <IngredientsLayout MenuObj={product}/> */}
        
        <Footer />
        </>
    )
}


