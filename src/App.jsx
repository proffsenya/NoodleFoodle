import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Contact from "../pages/Contact";
import CustomProduct from "../pages/CustomProduct";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCard from "../pages/ProductDetails";

import "../src/index.css";

const router = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "contact", element: <Contact />},
  {path: "customproduct", element: <CustomProduct/>},
  {path: "menu", element: <Menu />},
  {path: "shoppingcard", element: <ShoppingCard />},
  {path: "productdetails", element: <ProductDetails />},
  {path: "*", element: <NotFound />},
])

export default function App() {
  return (
    <RouterProvider router = {router}/>
  )
}