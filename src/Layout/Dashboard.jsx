import Navbar from '../SharedComponents/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../SharedComponents/Footer/Footer';

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <div className="bg-black "><Footer /></div>

        </>
    );
};

export default Dashboard;