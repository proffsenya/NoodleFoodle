import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Profile() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-start p-10">
        {/* Profile content will be added here */}
      </div>
      <Footer />
    </div>
  );
}
