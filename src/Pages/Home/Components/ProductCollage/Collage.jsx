/* eslint-disable react/no-unescaped-entities */
import ps5 from '../../../../../public/images/PlayStation.png'
import airpod from '../../../../../public/images/headphone.png'
import visionPro from '../../../../../public/images/visionPro.png'
import macPro from '../../../../../public/images/MacBook Pro 14.png'
import ShopNowButton from '../../../../SharedComponents/ShopNowButton/ShopNowButton'



const Collage = () => {
    return (
        <div className='flex flex-col lg:flex-row lg:max-h-[600px] overflow-hidden'>
            <div className='flex-1'>



                <div className='relative md:justify-center  lg:justify-start min-h-[328px] flex flex-col md:flex-row items-center lg:items-start py-10 lg:py-0 text-center md:text-start'>
                    <div className='flex-1 '>
                        <img className=' lg:absolute lg:h-[343px] lg:-left-16 h-[300px] mx-10 lg:m-0 ' src={ps5} alt="" />
                    </div>

                    <div className='flex-1 flex flex-col lg:pr-12 md:pr-8 pt-[100px] gap-4 lg:-mx-4'>
                        <p className='lg:text-5xl text-3xl font-medium'>Playstation 5</p>
                        <p className='leading-relaxed text-[#919191] pb-5 md:w-full w-1/2 mx-auto'>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
                    </div>
                </div>






                <div className='flex flex-col lg:flex-row'>


                    <div className='flex-1 flex flex-col md:flex-row-reverse text-center md:text-end lg:text-start items-center lg:items-start relative bg-[#EDEDED] py-10 lg:py-0'>
                        <div className='flex-1 '><img className='lg:absolute lg:right-1/2 h-[300px] lg:h-full' src={airpod} alt="" /></div>
                        <div className='flex-1 lg:pl-40 lg:pt-12'>
                            <p className='lg:w-1/2 text-3xl font-medium pb-3'>Apple AirPods Max</p>
                            <p className='text-sm font-medium leading-relaxed text-[#919191]'>Computational audio. Listen, it's powerful</p>
                        </div>
                    </div>


                    <div className='flex-1 flex flex-col md:flex-row text-center md:text-start lg:text-start items-center lg:items-start relative bg-[#353535] py-10 lg:py-0 overflow-hidden'>
                        <div className='flex-1 lg:flex-auto '><img className='lg:absolute lg:right-1/2 h-[300px] lg:h-full' src={visionPro} alt="" /></div>
                        <div className='flex-1 lg:flex-auto lg:pl-40 lg:pt-12'>
                            <p className='lg:w-1/2 text-3xl font-medium pb-3 text-white'>Apple Vision Pro</p>
                            <p className='text-sm font-medium leading-relaxed text-[#919191] lg:pb-10'>An immersive way to experience entertainment</p>

                        </div>

                    </div>

                </div>



            </div>
            <div className='flex-1 bg-[#EDEDED] overflow-hidden py-5 lg:py-0'>
                <div className='lg:relative flex flex-col md:flex-row-reverse lg:flex-col items-center lg:items-start text-center md:text-start'>
                    <div className='flex-1'>
                        <img className='lg:absolute lg:-bottom-[20%] lg:left-2/3 lg:right-1/2 h-[280px] lg:h-full' src={macPro} alt="" />
                    </div>
                    <div className=' lg:pl-[50px] lg:pt-40 space-y-4 flex-1 flex lg:flow-row flex-col items-center py-5 md:items-end text-center md:text-start lg:items-start'>
                        <p className='text-3xl lg:text-[64px] font-medium w-1/2 leading-[60px] text-black'><span className='font-extralight'>Macbook</span> Air</p>
                        <p className='text-sm font-medium leading-relaxed text-[#919191] w-1/2'>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
                        <div className='pt-5 mx-2'><p className="btn btn-outline  text-black px-14 ">Shop Now</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collage;