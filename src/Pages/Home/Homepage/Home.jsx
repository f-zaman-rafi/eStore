import Banner from "../Components/Banner/Banner";
import BrowseByCatagory from "../Components/BrowseByCatagory/BrowseByCatagory";
import Category2 from "../Components/Category2/Category2";
import Collage from "../Components/ProductCollage/Collage";
import ProductTab from "../Components/ProductTabs/Tabs/ProductTab";

const Home = () => {
    return (
        <div className="pb-52">
            <div className=" bg-[#211C24FF]"> <Banner /></div>
            <Collage />
            <BrowseByCatagory />
            <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden"><ProductTab /></div>
            <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden"><Category2 /></div>
        </div>
    );
};

export default Home;