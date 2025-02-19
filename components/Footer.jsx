export default function Footer(){
    return (
      <footer className="py-12 text-white bg-black ">
          <div className="container px-4 mx-auto">
            <div className="relative grid flex-col md:grid-cols-2">
              <section className="relative text-center flexbox">
                <h3 className="mb-4 text-xl font-bold">NoodleFoodle</h3>
                <p className="text-gray-400">
                Настоящая азиатская лапша <br/>с доставкой к вашей двери
                </p>
              </section>
              <section className="relative items-center text-center flexbox">
                <h3 className="mb-4 text-xl font-bold">О нас</h3>
                <p className="text-gray-400">Проспект Вернадского 78</p>
                <p className="text-gray-400">Россия, Москва</p>
                <p className="text-gray-400">Телефон: 8(800) 555-35-35</p>
              </section>
            </div>
            
            <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
              <p>&copy; 2025 NoodleFoodle.</p>
            </div>
          </div>
        </footer>
    )
  }