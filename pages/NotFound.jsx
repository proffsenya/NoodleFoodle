import Header from "../components/Header";
import Footer from "../components/Footer";
export default function NotFound() {
    return (
        <>
        <Header/>
        <section>
            <div className="h-[600px] relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <h1 className="text-5xl font-bold text-black">404 Not Found</h1>
                </div>
            </div>
        </section>
        <Footer />
      </>
    )
}

