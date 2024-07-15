import ps5 from '../../../../../public/images/PlayStation.png'
import airpod from '../../../../../public/images/headphone.png'
import visionPro from '../../../../../public/images/visionPro.png'
import macPro from '../../../../../public/images/MacBook Pro 14.png'



const Collage = () => {
    return (
        <div className='flex max-h-[600px] overflow-hidden'>
            <div className='flex-1'>
                <div className='relative min-h-[328px]'>
                    <img className=' absolute h-[343px] right-72 -top-3' src={ps5} alt="" />
                    <div className=' flex flex-col pl-[334px] pr-12 pt-[100px] gap-4'>
                        <p className='text-5xl'>Playstation 5</p>
                        <p className='leading-relaxed text-[#919191]'>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
                    </div>
                </div>
                <div className='flex min-h-[272px]'>
                    <div className='flex-1 relative bg-[#EDEDED]'>
                        <img className='absolute right-1/2' src={airpod} alt="" />
                        <div className='pl-40 pt-12 pr-8'>
                            <p className='w-1/2 text-3xl font-medium pb-3'>Apple AirPods Max</p>
                            <p className='text-sm font-medium leading-relaxed text-[#919191]'>Computational audio. Listen, it's powerful</p>
                        </div>
                    </div>
                    <div className='flex-1 relative bg-[#353535] overflow-hidden'>
                        <img className='absolute right-1/2' src={visionPro} alt="" />
                        <div className='pl-40 pt-12 pr-8'>
                            <p className='w-1/2 text-3xl font-medium pb-3 text-white'>Apple Vision Pro</p>
                            <p className='text-sm font-medium leading-relaxed text-[#919191]'>An immersive way to experience entertainment</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex-1 overflow-hidden relative bg-[#EDEDED]'>
                <img className='absolute top-1/4 left-1/2' src={macPro} alt="" />
                <div className=' pl-[56px] pt-40 space-y-4'>
                    <p className='text-[64px] font-medium w-1/2 leading-[60px] text-black'><span className='font-extralight'>Macbook</span> Air</p>
                    <p className='text-sm font-medium leading-relaxed text-[#919191] w-1/2'>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
                </div>
            </div>
        </div>
    );
};

export default Collage;