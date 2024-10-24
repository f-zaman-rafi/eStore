import airpod from '../../../../assets/images/huawei airpod.png';
import watch from '../../../../assets/images/huawei watch.png';
import ipadPro from '../../../../assets/images/ipad pro.png';
import galaxy from '../../../../assets/images/Galaxy.png';
import macbook from '../../../../assets/images/Macbook 1.png';
const Category2 = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-14">
            <div className=''>
                <div className='flex justify-center h-72'>
                    <img className='w-72 h-full mr-[-200px]' src={airpod} alt="" />
                    <img className='w-[164px] h-[168px] mt-20' src={watch} alt="" />
                </div>
                <div className='space-y-4 px-8 text-left h-auto w-full pb-14'>
                    <p className='text-2xl my-4'>Popular Products</p>
                    <p className='font-medium pt-4 pb-3 text-sm'>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
                    <p className='btn btn-outline border-gray-100 px-14 py-4'>Shop Now</p>
                </div>
            </div>

            <div className='bg-[#F9F9F9]'>
                <div className='h-72'>
                    <img className='w-72 h-full' src={ipadPro} alt="" />
                </div>
                <div className='space-y-4 px-8 text-left h-auto w-full pb-14'>
                    <p className='text-2xl my-4'>Ipad Pro</p>
                    <p className='font-medium pt-4 pb-3 text-sm'> iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
                    <p className='btn btn-outline border-gray-100 px-14 py-4'>Shop Now</p>
                </div>
            </div>

            <div className='bg-[#EAEAEA]'>
                <div className='h-72'>
                    <img className='w-72 h-full' src={galaxy} alt="" />
                </div>
                <div className='space-y-4 px-8 text-left h-auto w-full pb-14'>
                    <p className='text-2xl my-4'>Samsung Galaxy</p>
                    <p className='font-medium pt-4 pb-3 text-sm'> iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
                    <p className='btn btn-outline border-gray-100 px-14 py-4'>Shop Now</p>
                </div>
            </div>

            <div className='bg-[#2C2C2C]'>
                <div className='h-72'>
                    <img className='w-72 h-full' src={macbook} alt="" />
                </div>
                <div className='space-y-4 px-8 text-left h-auto w-full pb-14'>
                    <p className='text-2xl my-4 text-white'>Macbook Pro</p>
                    <p className='font-medium pt-4 pb-3 text-sm text-[#919191]'> iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
                    <p className='btn btn-outline border-gray-100 px-14 py-4 text-white'>Shop Now</p>
                </div>
            </div>

        </div>
    );
};

export default Category2;