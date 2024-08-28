import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";
import Footer from "../SharedComponents/Footer/Footer";

const Main = () => {
    return (
        <div className=" ">
            <Navbar />
            <Outlet />
            <div className="bg-black"><Footer /></div>
        </div>
    );
};

export default Main;