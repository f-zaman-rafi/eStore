import { XlviLoader } from 'react-awesome-loaders';

const LoadingComponent = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <XlviLoader
                boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
                desktopSize={"128px"}
                mobileSize={"100px"}
            />
        </div>
    );
};

export default LoadingComponent;


