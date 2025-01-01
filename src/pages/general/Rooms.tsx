import { Button } from "@/components/ui/button";
import { Filter } from "@/components/user";
import CardC from "@/components/user/Card";
import { useRooms, useHostels, useLands } from "@/store";
import { titlelize } from "@/utils";
import { Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    selected: "room" | "land" | "hostel";
}

const PropertiesPage: React.FC<Props> = ({ selected }) => {
    const { rooms } = useRooms();
    const { hostels } = useHostels();
    const { lands } = useLands();
    const name = titlelize(selected);
    const navigate = useNavigate();

    // Dynamic mapping based on the selected property type
    const propertyData = {
        room: rooms,
        hostel: hostels,
        land: lands,
    };

    // Common render function for properties
    const RenderProperty: React.FC<{
        address: string;
        id: string;
        imgs: string[];
        lat: number;
        lon: number;
    }> = ({ address, id, imgs, lat, lon }) => (
        <CardC
            footerStyle="font-bold text-xl text-slate-700"
            key={id}
            footer={address}
            content={
                <div className="w-full h-48 overflow-hidden rounded-lg">
                    <img
                        src={imgs[0]}
                        alt="Property Image"
                        className="object-cover w-full h-full"
                    />
                </div>
            }
            options={
                <div className="flex items-center w-full gap-3 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/map", { state: { lat, lng: lon } })}
                    >
                        <Map />
                    </Button>
                    <Button variant="primary">Book Now</Button>
                </div>
            }
        />
    );

    return (
        <div className="flex">
            <Filter selectedProp={selected} onMap={() => {}} />
            <div className="p-6">
                <div className="flex items-center gap-6">
                    <h1 className="text-gradient scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Find your dream
                        <span className="font-black"> {name}.</span>
                    </h1>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {propertyData[selected]?.map(({ info: { address, lat, lon, imgs }, id }) => (
                        <RenderProperty key={id} address={address} lat={lat} lon={lon} imgs={imgs} id={id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;
