import Banner from "../Components/Banner/Banner";
import BrowseByCatagory from "../Components/BrowseByCatagory/BrowseByCatagory";
import Collage from "../Components/ProductCollage/Collage";
import ProductTab from "../Components/ProductTabs/Tabs/ProductTab";

const Home = () => {
    return (
        <div className="pb-52">
            <Banner />
            <Collage />
            <BrowseByCatagory />
            <ProductTab />
        </div>
    );
};

export default Home;