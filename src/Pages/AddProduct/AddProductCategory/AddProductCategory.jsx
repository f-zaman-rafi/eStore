import { Link } from "react-router-dom";

const AddProductCategory = () => {
    return (
        <div className="lg:px-40 md:px-16 px-16 max-w-[1440px] py-2 md:py-10 lg:py-16 mx-auto font-inter  overflow-hidden">
            <p className="text-4xl font-bold text-center pb-10">Select What To Add</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <Link to='/add-product/phone'><div className="bg-gray-200 rounded-2xl cursor-pointer text-center py-2 md:py-10 lg:py-16 font-bold text-xl"><p>Phone</p></div></Link>
                <Link to='/add-product/smartwatch'><div className="bg-gray-200 rounded-2xl cursor-pointer text-center py-2 md:py-10 lg:py-16 font-bold text-xl"><p>Smart-Watch</p></div></Link>
                <Link to='/add-product/camera'><div className="bg-gray-200 rounded-2xl cursor-pointer text-center py-2 md:py-10 lg:py-16 font-bold text-xl"><p>Camera</p></div></Link>
                <Link to='/add-product/headphone'><div className="bg-gray-200 rounded-2xl cursor-pointer text-center py-2 md:py-10 lg:py-16 font-bold text-xl"><p>Headphone</p></div></Link>
                <Link to='/add-product/computer'><div className="bg-gray-200 rounded-2xl cursor-pointer text-center py-2 md:py-10 lg:py-16 font-bold text-xl"><p>Computer</p></div></Link>
                <Link to='/add-product/gaming-device'><div className="bg-gray-200 rounded-2xl cursor-pointer text-center py-2 md:py-10 lg:py-16 font-bold text-xl"><p>Gaming Device</p></div></Link>
            </div>
        </div>
    );
};

export default AddProductCategory;