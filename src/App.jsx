import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Contact from "../pages/Contact";
import CustomProduct from "../pages/CustomProduct";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShoppingCart";

import "../src/index.css";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const router = createBrowserRouter([
  {index: true, element: <><Home /><ScrollToTop /></>},
  {path: "contact", element: <><Contact /><ScrollToTop /></>},
  {path: "customproduct", element: <><CustomProduct/><ScrollToTop /></>},
  {path: "menu", element: <><Menu /><ScrollToTop /></>},
  {path: "shoppingcart", element: <><ShoppingCart /><ScrollToTop /></>},
  {path: "productdetails/:productid", element: <><ProductDetails /><ScrollToTop /></>},
  {path: "*", element: <><NotFound /><ScrollToTop /></>},
])

export default function App() {
  return (
    <RouterProvider router = {router}/>
  )
}