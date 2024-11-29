import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";
import Footer from "../SharedComponents/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import UnderDev from "../SharedComponents/UnderDev/UnderDev";

const Main = () => {
  return (
    <div className="">
      <ScrollToTop />
      <div className="min-h-[90vh]">
        <UnderDev />
        <Navbar />
        <Outlet />
      </div>
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
