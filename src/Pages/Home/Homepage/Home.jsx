import Banner from "../Components/Banner/Banner";
import BrowseByCatagory from "../Components/BrowseByCatagory/BrowseByCatagory";
import Collage from "../Components/ProductCollage/Collage";

const Home = () => {
    return (
        <div className="pb-52">
            <Banner />
            <Collage />
            <BrowseByCatagory />
        </div>
    );
};

export default Home;