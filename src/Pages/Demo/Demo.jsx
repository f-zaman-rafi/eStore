import { useState } from 'react';

const Demo = () => {
    const [priceFields, setPriceFields] = useState([{ variant: '', price: '' }]);

    // Function to handle adding a new price field
    const addPriceField = () => {
        setPriceFields([...priceFields, { variant: '', price: '' }]);
    };

    // Function to handle input change
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...priceFields];
        updatedFields[index][name] = value;
        setPriceFields(updatedFields);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted Data:', priceFields);
        // You can send `priceFields` to your backend here
    };

    return (
        <form onSubmit={handleSubmit}>
            {priceFields.map((field, index) => (
                <div key={index} className="priceGroup">
                    <input
                        type="text"
                        name="variant"
                        placeholder="Enter Variant (e.g., 512/12)"
                        value={field.variant}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        value={field.price}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                    />
                </div>
            ))}
            <button className='p-10 border-2 border-black m-5' type="button" onClick={addPriceField}>Add More</button>
            <button className='p-10 border-2 border-black m-5' type="submit">Submit</button>
        </form>
    );
};

export default Demo;
