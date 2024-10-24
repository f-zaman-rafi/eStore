import SummerSaleBanner from '../../../../assets/images/summerSale.png'

const SummerSale = () => {
    return (
        <div className="relative bg-cover bg-center h-96 py-60" style={{ backgroundImage: `url(${SummerSaleBanner})` }}>
            <div className='absolute z-10 inset-0 flex flex-col items-center justify-center'>
                <h1 className=" text-white text-7xl font-thin text-center mt-12">Big Summer <span className='font-medium ml-2'> Sale</span></h1>
                <p className='text-[#787878] py-3 text-center'>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
                <p className='btn btn-outline border-gray-10 text-white px-14 py-4 mt-10'>Shop Now</p>
            </div>
        </div>
    );
};

export default SummerSale;
