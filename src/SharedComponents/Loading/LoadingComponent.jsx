import { PropagateLoader } from 'react-spinners';

const LoadingComponent = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <PropagateLoader color="#36d7b7" />
        </div>
    );
};

export default LoadingComponent;



