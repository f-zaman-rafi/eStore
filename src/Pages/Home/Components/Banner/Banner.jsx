import Button from "../../../../SharedComponents/ShopNowButton/ShopNowButton";
import bannerPhoto from "../../../../assets/images/banner iphone.png";

const Banner = () => {
  return (
    <div className="max-h-[790px] lg:max-h-[632px] max-w-[1440px] mx-auto font-inter overflow-hidden">
      <div className="lg:mx-40 flex flex-col lg:flex-row justify-center lg:justify-between text-center lg:text-start items-center lg:items-start lg:mb-12">
        <div className="pt-[88px] lg:pt-[188px] space-y-6">
          <p className="text-[#7a777c] border-black text-2xl font-semibold">
            Pro.Beyond.
          </p>
          <p className="text-8xl text-white w-3/4 md:w-full mx-auto">
            <span className="font-thin">IPhone 16</span> Pro
          </p>
          <p className="text-lg font-medium text-[#919191] w-1/2 md:w-3/4 lg:w-full mx-auto">
            Created to change everything for the better. For everyone
          </p>
          <p>
            <Button />
          </p>
        </div>
        <div
          className="lg:pt-60 lg:hover:pt-12 pt-12"
          style={{ transitionDuration: "1500ms" }}
        >
          <img src={bannerPhoto} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
