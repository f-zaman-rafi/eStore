import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";
import Footer from "../SharedComponents/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Main = () => {
    return (
        <div className="">
            <ScrollToTop />
            <div className="min-h-[90vh]">
                <Navbar />
                <Outlet />
            </div>
            <div className="bg-black"><Footer /></div>
        </div>
    );
};

export default Main;