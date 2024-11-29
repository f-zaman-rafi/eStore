import Marquee from "react-fast-marquee";

const UnderDev = () => {
  return (
    <div className="bg-black py-5 text-center text-2xl font-semibold text-white">
      <Marquee autoFill="true" speed={50}>
        -----The website is under development -----
      </Marquee>
    </div>
  );
};

export default UnderDev;
