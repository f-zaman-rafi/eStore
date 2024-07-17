import { useState } from "react";

const Demo = () => {
    const [value, setValue] = useState(1);


    return (
        <div className="min-h-full pt-40">

            <p onClick={() => setValue(value + 1)}>+</p>
            <p >{value}</p>
            <p onClick={() => setValue(value - 1)}>-</p>

        </div>
    );
};

export default Demo;