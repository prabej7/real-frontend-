import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Map, Search, SquareMenu } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../Spinner";
import axios from "axios";
import api from "@/constants/api";
import Dialogue from "../../Dialogue";
import { Room } from "@/constants/types/types";
import { Coords } from "../../Map/LocationUpdater";

type CheckBoxes = {
    flat: boolean,
    waterfacility: boolean,
    furnished: boolean,
    balcony: boolean,
    wifi: boolean,
    [key: string]: boolean
}

type InputFields = {
    min: number,
    max: number,
    noOfRooms: number
}

interface Props {
    onMap: (coords: Coords) => void;
}

const RoomFilter: React.FC<Props> = ({ onMap }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [checkBoxes, setCheckBox] = useState<CheckBoxes>({
        flat: false,
        waterfacility: false,
        furnished: false,
        balcony: false,
        wifi: false
    });

    const [formFields, setFormField] = useState<InputFields>({
        max: 0,
        min: 0,
        noOfRooms: 0
    });

    const checkboxes: { title: string, value: string }[] = [
        { title: "Flat", value: "flat" },
        { title: "Water Facility", value: "waterfacility" },
        { title: "Furnished", value: "furnished" },
        { title: "Balcony", value: "balcony" },
        { title: "Wifi", value: "wifi" }
    ];

    const handleCheck = (name: string, value: boolean) => {
        setCheckBox(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setFormField(prev => ({
            ...prev,
            [name]: Number(value)
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: { rooms } } = await axios.post(api + 'filter-room', {
                ...formFields,
                ...checkBoxes
            });

            setRooms(rooms);
            if (rooms.length == 0) {
                toast.info("No rooms found!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return <div className="mt-3" >
        <Dialogue onOpenChange={() => setRooms([])} open={rooms.length > 0} title="Filtered Rooms" description="by price, rooms and other facilities." children={<div>
            {rooms.map(({ info: { address, lat, lon }, noOfRooms }) => {
                return <div className="flex justify-between items-center" >
                    <div>
                        <p className="text-xl font-bold text-slate-800" >{address}</p>
                        <p className="font-light text-slate-700" >Rooms: {noOfRooms}</p>
                    </div>
                    <div className="flex items-center gap-3" >
                        <Button variant="outline" onClick={() => {
                            setRooms([]);
                            onMap({ lat, lng: lon });
                        }}  >
                            <Map />
                        </Button>
                        <Button variant="primary" >
                            <SquareMenu />
                            Details
                        </Button>
                    </div>
                </div>
            })}
        </div>} />
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit} >

            <div className="flex gap-6 justify-between items-center" >

                <Input placeholder="5000" name="min" value={`${formFields.min !== 0 && formFields.min}`} type="number" className="font-light" onChange={handleChange} />

                <p>-</p>

                <Input placeholder="20000" name="max" type="number" className="font-light" value={`${formFields.max !== 0 && formFields.max}`} onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-3" >

                <Input placeholder="Number of rooms" type="number" name="noOfRooms" className="font-light" value={formFields.noOfRooms} onChange={handleChange} />

                <div className="flex flex-col" >
                    {checkboxes.map(({ title, value }) => {
                        return <div className="flex gap-3 items-center" >
                            <Checkbox checked={checkBoxes[value] as boolean} name={value} onCheckedChange={(e) => handleCheck(value, e as boolean)} />    <Label text={title} />
                        </div>
                    })}
                </div>
            </div>
            <Button variant="primary" disabled={isLoading}  >
                {isLoading ? <Spinner /> : <>Search < Search /></>}
            </Button>
        </form>
    </div>
};

export default RoomFilter;

const Label: React.FC<{
    text: string
}> = ({ text }) => {
    return <p className="font-light text-slate-800" >{text}</p>
}

export { Label };