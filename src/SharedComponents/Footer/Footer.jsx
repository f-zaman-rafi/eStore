import twitter from "../../../public/icons/Icon_16px_Twitter.svg"
import facebook from "../../../public/icons/fb.svg"
import tiktok from "../../../public/icons/tiktok.svg"
import insta from "../../../public/icons/Icon_16px_Instagram.svg"
import logo from "../../../public/icons/Logo white.svg"

const Footer = () => {
    return (
        <div className="lg:mx-40 md:mx-10 mx-4 md:pt-28 md:pb-36 text-[#b3b1b1] text-sm">
            <div className="grid grid-cols-7">
                <div className="col-span-3 space-y-8">
                    <img src={logo} alt="" />
                    <p className="w-3/4 leading-loose">We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
                </div>
                <div className="col-span-2 space-y-4">
                    <p className="font-semibold text-white">Services</p>
                    <p>Bonus program</p>
                    <p>Gift Cards</p>
                    <p>Credit and payment</p>
                    <p>Service contacts</p>
                    <p>Non-cash account</p>
                    <p>Payment</p>
                </div>
                <div className="col-span-2 space-y-4">
                    <p className="font-semibold text-white">Assistance to the buyer</p>
                    <p>Find an order</p>
                    <p>Terms of delivery</p>
                    <p>Exchange and return of goods</p>
                    <p>Gurantee</p>
                    <p>Frequently asked questions</p>
                    <p>Terms of use of the site</p>
                </div>
            </div>
            <div className="flex gap-10">
                <img src={twitter} alt="" />
                <img src={facebook} alt="" />
                <img src={tiktok} alt="" />
                <img src={insta} alt="" />
            </div>
        </div>
    );
};

export default Footer;