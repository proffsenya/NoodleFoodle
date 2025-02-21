import Header from "../components/Header";
import Footer from "../components/Footer";
import {dishes} from "../data/data";

import {Link, useParams, useSearchParams} from "react-router-dom";

export default function ProductDetails() {
    const {productid} = useParams();
    console.log(productid)

    const product = dishes.find((item) => item.id === parseInt(productid, 10));

    console.log(product.name);

    return (
        <>
        <Header />
            <div className="h-[600px] relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white bg-black bg-opacity-50">
                    <p>{product.name}<br/> {product.price}<br/> {product.ingredients}<br/> {product.description}<br/> {product.weight}</p>
                </div>
            </div>
        <Footer />
        </>
    )
}



