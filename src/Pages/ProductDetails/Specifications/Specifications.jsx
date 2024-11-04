/* eslint-disable react/prop-types */

const Specifications = ({ product }) => {
    // Determine if the product is a phone or smartwatch
    const isPhone = product.type === "phone";
    const isSmartwatch = product.type === "smartwatch";

    // Define fields to show based on the product type
    let fields = [];

    if (isPhone) {
        fields = [
            { name: 'Model', value: product.Model },
            { name: 'Brand', value: product.Brand },
            { name: 'Network', value: product.Network },
            { name: 'Dimensions', value: product.Dimensions },
            { name: 'Weight', value: product.Weight },
            { name: 'SIM', value: product.SIM },
            { name: 'Display Type', value: product.DisplayType },
            { name: 'Display Size', value: product.DisplaySize },
            { name: 'Display Resolution', value: product.DisplayResolution },
            { name: 'OS', value: product.os },
            { name: 'Chipset', value: product.Chipset },
            { name: 'CPU', value: product.cpu },
            { name: 'Memory', value: product.memory },
            { name: 'Main Camera', value: product.MainCamera },
            { name: 'Selfie Camera', value: product.SelfieCamera },
            { name: 'Sound', value: product.Sound },
            { name: 'Battery Info', value: product.BatteryInfo },
            { name: 'Sensors', value: product.Sensors },
            { name: 'Other Features', value: product.OtherFeatures },
        ];
    } else if (isSmartwatch) {
        fields = [
            { name: 'Model', value: product.Model },
            { name: 'Brand', value: product.Brand },
            { name: 'Connectivity', value: product.Connectivity },
            { name: 'Dimensions', value: product.Dimensions },
            { name: 'Weight', value: product.Weight },
            { name: 'Display Type', value: product.DisplayType },
            { name: 'Display Size', value: product.size },
            { name: 'Display Resolution', value: product.DisplayResolution },
            { name: 'OS', value: product.os },
            { name: 'Processor', value: product.Processor },
            { name: 'Memory', value: product.memory },
            { name: 'Battery Info', value: product.BatteryInfo },
            { name: 'Sensors', value: product.Sensors },
            { name: 'Other Features', value: product.OtherFeatures },
        ];
    }
    else if (product.type === "camera") {
        fields = [
            { name: 'Model', value: product.Model },
            { name: 'Brand', value: product.Brand },
            { name: 'Camera Type', value: product.CameraType },
            { name: 'Resolution', value: product.Resolution },
            { name: 'Aperture', value: product.Aperture },
            { name: 'Video Recording', value: product.VideoRecording },
            { name: 'Lens Type', value: product.LensType },
            { name: 'Other Features', value: product.OtherFeatures },
        ];
    }
    else if (product.type === "headphone") {
        fields = [
            { name: 'Model', value: product.Model },
            { name: 'Brand', value: product.Brand },
            { name: 'Charging Interface', value: product.ChargingInterface },
            { name: 'ANC Status', value: product.ANCstatus },
            { name: 'Connectivity', value: product.Connectivity },
            { name: 'Latency', value: product.Latency },
            { name: 'Playtime', value: product.Playtime },
            { name: 'Other Features', value: product.OtherFeatures },
        ];
    }
    else if (product.type === "computer") {
        fields = [
            { name: 'Model', value: product.Model },
            { name: 'Brand', value: product.Brand },
            { name: 'Processor', value: product.Processor },
            { name: 'Graphics', value: product.Graphics },
            { name: 'Connectivity', value: product.Connectivity },
            { name: 'Keyboard Type', value: product.KeyboardType },
            { name: 'Body', value: product.Body },
            { name: 'Display', value: product.Display },
            { name: 'Ports', value: product.Ports },
            { name: 'OS', value: product.os },
            { name: 'Memory', value: product.memory },
            { name: 'Battery Info', value: product.BatteryInfo },
            { name: 'Sensors', value: product.Sensors },
            { name: 'Other Features', value: product.OtherFeatures },
        ];
    }
    else if (product.type === "console") {
        fields = [
            { name: 'Model', value: product.Model },
            { name: 'Brand', value: product.Brand },
            { name: 'Processor', value: product.Processor },
            { name: 'Graphics', value: product.Graphics },
            { name: 'Storage', value: product.Storage },
            { name: 'Memory', value: product.Memory },
            { name: 'Other Features', value: product.OtherFeatures },
        ];
    }




    return (
        <div>
            <p className="text-3xl font-bold py-10">Specifications:</p>
            <table>
                <tbody>
                    {fields.map((field, index) => (
                        <tr key={index}>
                            <td className="border-2 py-2 pr-5 pl-2">{field.name}</td>
                            <td className="border-2 py-2 pl-5 w-full">{field.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Specifications;
