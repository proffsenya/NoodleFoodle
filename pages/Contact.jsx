import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact(){
  return (
    <>
      <Header/>
      <Contact_container/>
      <Footer/>
    </>
  )
}

function Contact_container() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
    improvement: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    // Here you would typically send the feedback to your server
    alert('Thank you for your feedback!');
  };

  return (
    <div className="pt-20">
      {/* Restaurant Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-12 text-4xl font-bold text-center">Visit NoodleHouse</h1>
          
          <div className="grid gap-8 mb-12 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">Restaurant Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                <FeatherIcon icon = "map-pin"/>
                  <p>123 Noodle Street, San Francisco, CA 94110</p>
                </div>
                <div className="flex items-center">
                <FeatherIcon icon = "clock"/>
                  <p>Mon-Sun: 11:00 AM - 10:00 PM</p>
                </div>
                <div className="flex items-center">
                  <FeatherIcon icon = "phone"/>
                  <p>(555) 123-4567</p>
                </div>
                <div className="flex items-center">
                <FeatherIcon icon = "mail"/>
                  <p>info@noodlehouse.com</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">Customer Reviews</h2>
              <div className="space-y-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <FeatherIcon icon = "star"
                        key={star}
                        className={`w-5 h-5 ${star <= 4.5 ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2">4 out of 5</span>
                </div>
                <p className="italic text-gray-600">"Best ramen in the city! The broth is incredibly rich and flavorful."</p>
                <p className="italic text-gray-600">"Amazing service and authentic taste. Will definitely come back!"</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] mb-12">
            <iframe
              src="https://yandex.ru/map-widget/v1/-/CBucU6V~8B"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Help Us Improve</h2>
          <div className="p-8 rounded-lg shadow-md bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  value={feedback.name}
                  onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md"
                  value={feedback.email}
                  onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">What can we improve?</label>
                <select
                  className="w-full px-4 py-2 border rounded-md"
                  value={feedback.improvement}
                  onChange={(e) => setFeedback({...feedback, improvement: e.target.value})}
                  required
                >
                  <option value="">Select an area</option>
                  <option value="food">Food Quality</option>
                  <option value="service">Service</option>
                  <option value="delivery">Delivery</option>
                  <option value="atmosphere">Restaurant Atmosphere</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Your Message</label>
                <textarea
                  className="w-full h-32 px-4 py-2 border rounded-md"
                  value={feedback.message}
                  onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Rate your experience</label>
                <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FeatherIcon icon = "star"
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-white transition-colors bg-black rounded-md hover:bg-gray-800"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}