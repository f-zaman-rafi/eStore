import phoneLogo from "../../../../assets/icons/Icon_Phones.svg"
import watchLogo from "../../../../assets/icons/Icon_Smart Watches.svg"
import cameraLogo from "../../../../assets/icons/Icon_Cameras.svg"
import headphoneLogo from "../../../../assets/icons/Icon_Headphones.svg"
import computerLogo from "../../../../assets/icons/Icon_Computers.svg"
import gamingLogo from "../../../../assets/icons/Icon_Gaming.svg"

const BrowseByCatagory = () => {
    return (
        <div className="lg:px-40 md:px-10 px-4 py-20 max-w-[1440px] mx-auto font-inter">
            <div><p className="text-2xl font-semibold text-black pb-8">Browse By Category</p></div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={phoneLogo} alt="phone" />
                    <p className="mb-6 font-medium">Phones</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={watchLogo} alt="smartWatch" />
                    <p className="mb-6 font-medium">Smart Watches</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={cameraLogo} alt="camera" />
                    <p className="mb-6 font-medium">Cameras</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={headphoneLogo} alt="headphone" />
                    <p className="mb-6 font-medium">Headphones</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={computerLogo} alt="computer" />
                    <p className="mb-6 font-medium">Computers</p>
                </div>
                <div className="bg-[#EDEDED] rounded-2xl text-center items-center flex flex-col gap-2" >
                    <img className="mx-14 mt-6 h-12 w-12" src={gamingLogo} alt="gaming" />
                    <p className="mb-6 font-medium">Gaming</p>
                </div>
            </div>
        </div>
    );
};

export default BrowseByCatagory;