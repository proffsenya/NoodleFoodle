import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../src/index.css";

export default function Register() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex items-center my-20 pt-10 justify-center bg-cover bg-center">
        {/* RegisterSection will be added here */}
      </div>
      <Footer />
    </div>
  );
}
