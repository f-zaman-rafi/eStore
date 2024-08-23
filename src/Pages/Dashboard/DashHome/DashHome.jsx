import { Link } from "react-router-dom";

const DashHome = () => {
    return (
        <div>
            This is DashHome!

            <Link to="add-product">Add Home</Link>
        </div>
    );
};

export default DashHome;