import { Button } from "@/components/ui/button";
import { Filter, Sheets } from "@/components/user";
import CardC from "@/components/user/Card";
import ImagesC from "@/components/user/ImagesC";
import { Hostel, Land, Room } from "@/constants/types/types";
import { useRooms, useHostels, useLands } from "@/store";
import { titlelize } from "@/utils";
import { Map } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
export type Properties = "room" | "land" | "hostel";
interface Props {
    selected: Properties
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
        type: Properties
    }> = ({ address, id, imgs, lat, lon, type }) => {

        const [selected, setSelected] = useState<{
            room?: Room;
            hostel?: Hostel;
            land?: Land;
        }>();

        const handleSelect = async (id: string, propType: Properties) => {
            if (propType == "room") {
                setSelected({ room: rooms.find((room) => room.id == id) as Room });
            } else if (propType == "hostel") {
                setSelected({ hostel: hostels.find((hostel) => hostel.id == id) as Hostel });
            } else if (propType == "land") {
                setSelected({ land: lands.find((land) => land.id == id) as Land });
            }

        }

        const fullURL = window.location.href;


        return (
            <>
                <div className="absolute " >
                    {selected && <Sheets side="top" open={selected ? true : false} onOpenChange={() => setSelected(undefined)} title={titlelize(type) + " Details"} desciption="See a detailed description here."
                        content={<div className="flex gap-12 " >
                            <div className="flex flex-col" >
                                <ImagesC imgs={imgs} />
                                <Button variant="primary" className="mt-3" onClick={() => {
                                    const encodedMessage = encodeURIComponent(`I know about more this - ${fullURL}/${id}`);
                                    const whatsappURL = `https://wa.me/+9779821224434?text=${encodedMessage}`;
                                    window.open(whatsappURL, "_blank");
                                }}   >
                                    <FaWhatsapp />
                                    Book Now via WhatsApp !</Button>
                            </div>
                            <div>

                                <div>
                                    <h4 className="text-indigo-500  text-3xl font-black ">
                                        {selected.room?.info.address || selected.hostel?.info.address || selected.land?.info.address}
                                    </h4>
                                </div>
                                <div>

                                    <div>
                                        <h5 className="text-indigo-500 text-xl font-semibold">
                                            Details
                                        </h5>
                                        <ul className="list-disc pl-5">
                                            {selected.room && (
                                                <>
                                                    <li>No of Rooms: {selected.room.noOfRooms}</li>
                                                    <li>Flat: {selected.room.flat ? 'Yes' : 'No'}</li>
                                                    <li>Water Facility: {selected.room.waterfacility ? 'Yes' : 'No'}</li>
                                                    <li>Max People: {selected.room.maxPeople}</li>
                                                    <li>Payment: {selected.room.payment}</li>
                                                    <li>Furnished: {selected.room.furnished ? 'Yes' : 'No'}</li>
                                                    <li>Security Deposit: {selected.room.securityDeposit}</li>
                                                    <li>Notice Period: {selected.room.noticePeriod}</li>
                                                    <li>Balcony: {selected.room.balcony ? 'Yes' : 'No'}</li>
                                                    <li>Water Tank: {selected.room.waterTank ? 'Yes' : 'No'}</li>
                                                    <li>WiFi: {selected.room.wifi ? 'Yes' : 'No'}</li>
                                                    <li>Restrictions: {selected.room.restrictions}</li>
                                                </>
                                            )}
                                            {selected.hostel && (
                                                <>
                                                    <li>Name: {selected.hostel?.name}</li>
                                                    <li>Food: {selected.hostel?.food ? 'Yes' : 'No'}</li>
                                                    <li>Washroom: {selected.hostel?.washroom ? 'Yes' : 'No'}</li>
                                                    <li>CCTV: {selected.hostel?.cctv ? 'Yes' : 'No'}</li>
                                                    <li>Parking: {selected.hostel?.parking ? 'Yes' : 'No'}</li>
                                                    <li>WiFi: {selected.hostel?.wifi ? 'Yes' : 'No'}</li>
                                                    <li>Laundry: {selected.hostel?.laundry ? 'Yes' : 'No'}</li>
                                                    <li>Geysers: {selected.hostel?.geyser ? 'Yes' : 'No'}</li>
                                                    <li>Fans: {selected.hostel?.fan ? 'Yes' : 'No'}</li>
                                                    <li>Study Table: {selected.hostel?.studyTable ? 'Yes' : 'No'}</li>
                                                    <li>Locker: {selected.hostel?.locker ? 'Yes' : 'No'}</li>
                                                    <li>Cupboard: {selected.hostel?.cupboard ? 'Yes' : 'No'}</li>
                                                    <li>Doctor On Call: {selected.hostel?.doctorOnCall ? 'Yes' : 'No'}</li>
                                                    <li>Mattress: {selected.hostel?.matress ? 'Yes' : 'No'}</li>
                                                    <li>Pre-Payment: {selected.hostel?.prePayment ? 'Yes' : 'No'}</li>
                                                    <li>Post-Payment: {selected.hostel?.postPayment ? 'Yes' : 'No'}</li>
                                                </>
                                            )}
                                            {selected.land && (
                                                <>
                                                    <li>Size: {selected.land?.size}</li>
                                                    <li>Parking: {selected.land?.parking ? 'Yes' : 'No'}</li>
                                                    <li>Water Tank: {selected.land?.waterTank ? 'Yes' : 'No'}</li>
                                                    <li>Balcony: {selected.land?.balcony ? 'Yes' : 'No'}</li>
                                                    <li>Furnished: {selected.land?.furnished ? 'Yes' : 'No'}</li>
                                                    <li>Road Size: {selected.land?.roadSize}</li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>}
                    />}


                </div><CardC

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
                            <Button variant="primary" onClick={() => handleSelect(id, type)} >Details</Button>
                        </div>
                    }
                /></>
        )
    };

    return (
        <div className="flex">
            <Filter selectedProp={selected} onMap={() => { }} />
            <div className="p-6">
                <div className="flex flex-col justify-center gap-3">
                    <h1 className="text-gradient scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Find your dream
                        <span className="font-black"> {name}.</span>
                    </h1>
                    <p className="text-slate-700 font-light" >Click to see more details about the {selected}.</p>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {propertyData[selected]?.map(({ info: { address, lat, lon, imgs }, id }) => (
                        <RenderProperty type={selected} key={id} address={address} lat={lat} lon={lon} imgs={imgs} id={id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;
