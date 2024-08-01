import { useState } from "react";
import NewArrivals from "../TabComponents/NewArrival/NewArrivals";
import BestSeller from "../TabComponents/BestSeller/BestSeller";
import FeaturedProducts from "../TabComponents/FeaturedProducts/FeaturedProducts";

const ProductTab = () => {

    const [activeTab, setActiveTab] = useState('new-arrival');

    const handleTabs = (tab) => {
        setActiveTab(tab);
    }
    console.log(activeTab)


    return (
        <div className="lg:mx-40 lg:mt-14">
            <div className="text-sm font-medium text-center text-gray-500 ">
                <ul className="flex gap-8">
                    <li className="me-2">
                        <a onClick={() => handleTabs('new-arrival')} className={`inline-block text-lg font-semibold ${activeTab === 'new-arrival' ? 'border-black border-b-[3px] text-black font-bold ' : 'border-transparent text-gray-500'}`} >New Arrival</a>
                    </li>
                    <li className="me-2">
                        <a onClick={() => handleTabs('best-seller')} className={`inline-block text-lg font-semibold ${activeTab === 'best-seller' ? 'border-black border-b-[3px] text-black font-bold ' : 'border-transparent text-gray-500'}`}>Best Seller</a>
                    </li>
                    <li className="me-2">
                        <a onClick={() => handleTabs('featured-products')} className={`inline-block text-lg font-semibold ${activeTab === 'featured-products' ? 'border-black border-b-[3px] text-black font-bold ' : 'border-transparent text-gray-500'}`} >Featured Products</a>
                    </li>

                </ul>
            </div>

            {/* tab contents */}

            {/* new arrival */}

            {activeTab === 'new-arrival' && (
                <NewArrivals />
            )}
            {activeTab === 'best-seller' && (
                <BestSeller />
            )}
            {activeTab === 'featured-products' && (
                <FeaturedProducts />
            )}

        </div>
    );
};

export default ProductTab;