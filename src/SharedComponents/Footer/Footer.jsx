import whiteLogo from "../../assets/icons/Logo white.svg"
import twitterLogo from "../../assets/icons/Icon_16px_Twitter.svg"
import facebookLogo from "../../assets/icons/fb.svg"
import tiktokLogo from "../../assets/icons/tiktok.svg"
import instagramLogo from "../../assets/icons/Icon_16px_Instagram.svg"

const Footer = () => {
    return (
        <div className="lg:px-40 md:px-10 px-4 md:py-36 py-8 text-[#b3b1b1] text-sm max-w-[1440px] mx-auto font-inter overflow-x-hidden">
            <div className="grid md:grid-cols-7 md:gap-0 gap-10 text-center md:text-start justify-center md:justify-start md:items-start items-center">
                <div className="md:col-span-3 space-y-8">
                    <p className="flex justify-center md:justify-start"><img src={whiteLogo} alt="" /></p>
                    <p className="w-3/4 mx-auto md:mx-0 leading-loose">We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <p className="font-semibold text-white">Services</p>
                    <p>Bonus program</p>
                    <p>Gift Cards</p>
                    <p>Credit and payment</p>
                    <p>Service contacts</p>
                    <p>Non-cash account</p>
                    <p>Payment</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <p className="font-semibold text-white">Assistance to the buyer</p>
                    <p>Find an order</p>
                    <p>Terms of delivery</p>
                    <p>Exchange and return of goods</p>
                    <p>Gurantee</p>
                    <p>Frequently asked questions</p>
                    <p>Terms of use of the site</p>
                </div>
            </div>
            <div className="flex gap-10 pt-10 justify-center md:justify-start">
                <img src={twitterLogo} alt="" />
                <img src={facebookLogo} alt="" />
                <img src={tiktokLogo} alt="" />
                <img src={instagramLogo} alt="" />
            </div>
        </div>
    );
};

export default Footer;