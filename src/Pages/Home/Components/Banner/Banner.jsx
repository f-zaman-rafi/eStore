import bannerPhoto from "../../../../../public/images/banner iphone.png"

const Banner = () => {
    return (
        <div className="max-h-[632px] bg-[#211C24FF]">
            <div className="mx-40 flex">
                <div className="py-[188px] space-y-6">
                    <p className="text-[#7a777c] border-black text-2xl font-semibold">Pro.Beyond.</p>
                    <p className="text-8xl text-white"><span className="font-thin">IPhone 14</span> Pro</p>
                    <p className="text-lg font-medium text-[#919191]">Created to change everything for the better. For everyone</p>
                    <p className="btn btn-outline text-white px-14">Shop Now</p>
                </div>
                <div className="pt-20">
                    <img src={bannerPhoto} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;