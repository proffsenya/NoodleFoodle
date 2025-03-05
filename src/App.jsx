import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

import Contact from "../pages/Contact";
import CustomProduct from "../pages/CustomProduct";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShoppingCart"; 
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import History from "../pages/History"; 
import Checkout from "../pages/Checkout"; 
import Recipe from "../pages/Recipe"; 

import Header from "../components/Header";
import "../src/index.css";
import { ThemeProvider } from "./context/ThemeContext";

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Home />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Contact />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/customproduct",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <CustomProduct />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/menu",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Menu />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/shoppingcart",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <ShoppingCart /> {}
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/checkout",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Checkout /> {}
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/productdetails/:productid",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <ProductDetails />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Profile />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/history",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <History />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/recipe",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Recipe />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Login setIsLoggedIn={setIsLoggedIn} />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Register />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <NotFound />
          <ScrollToTop />
        </>
      ),
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
    
  )
}