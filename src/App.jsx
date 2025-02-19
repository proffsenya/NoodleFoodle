import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Contact from "../pages/Contact";
import CustomProduct from "../pages/CustomProduct";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCard from "../pages/ProductDetails";

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
  {path: "/", element: <><Home /><ScrollToTop /></>},
  {path: "contact", element: <><Contact /><ScrollToTop /></>},
  {path: "customproduct", element: <><CustomProduct/><ScrollToTop /></>},
  {path: "menu", element: <><Menu /><ScrollToTop /></>},
  {path: "shoppingcard", element: <><ShoppingCard /><ScrollToTop /></>},
  {path: "productdetails", element: <><ProductDetails /><ScrollToTop /></>},
  {path: "*", element: <><NotFound /><ScrollToTop /></>},
])

export default function App() {
  return (
    <RouterProvider router = {router}/>
  )
}