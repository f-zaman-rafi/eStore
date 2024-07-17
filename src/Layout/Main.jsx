import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";
import Footer from "../SharedComponents/Footer/Footer";

const Main = () => {
    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden">
            <Navbar />
            <Outlet />
            <div className="bg-black "><Footer /></div>
        </div>
    );
};

export default Main;