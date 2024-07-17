import phone from "../../../../../public/icons/Icon_Phones.svg"
import smartWatch from "../../../../../public/icons/Icon_Smart Watches.svg"
import camera from "../../../../../public/icons/Icon_Cameras.svg"
import headphone from "../../../../../public/icons/Icon_Headphones.svg"
import computer from "../../../../../public/icons/Icon_Computers.svg"
import gaming from "../../../../../public/icons/Icon_Gaming.svg"

const BrowseByCatagory = () => {
    return (
        <div className="lg:mx-40 md:mx-10 mx-4 lg:py-20">
            <div><p className="text-2xl font-semibold text-black pb-8">Browse By Category</p></div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={phone} alt="phone" />
                    <p className="mb-6 font-medium">Phones</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={smartWatch} alt="smartWatch" />
                    <p className="mb-6 font-medium">Smart Watches</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={camera} alt="camera" />
                    <p className="mb-6 font-medium">Cameras</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={headphone} alt="headphone" />
                    <p className="mb-6 font-medium">Headphones</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={computer} alt="computer" />
                    <p className="mb-6 font-medium">Computers</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={gaming} alt="gaming" />
                    <p className="mb-6 font-medium">Gaming</p>
                </div>
            </div>
        </div>
    );
};

export default BrowseByCatagory;