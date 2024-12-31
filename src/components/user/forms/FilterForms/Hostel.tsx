import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "./Room";
import { Map, Search, SquareMenu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "../..";
import { toast } from "react-toastify";
import axios from "axios";
import api from "@/constants/api";
import { Hostel } from "@/constants/types/types";
import Dialogue from "../../Dialogue";
import { Coords } from "../../Map/LocationUpdater";

type CheckBoxes = {
    food: boolean;
    washroom: boolean;
    cctv: boolean;
    parking: boolean;
    wifi: boolean;
    laundry: boolean;
    geyser: boolean;
    fan: boolean;
    studyTable: boolean;
    locker: boolean;
    cupboard: boolean;
    doctorOnCall: boolean;
    matress: boolean;
    [key: string]: boolean;
}

type FormField = {
    min: number;
    max: number;
}

interface Props {
    onMap: (coords: Coords) => void;
}

const HostelFilter: React.FC<Props> = ({ onMap }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [formFields, setFormFields] = useState<FormField>({ min: 0, max: 0 });

    const checkboxes: { title: string; value: string }[] = [
        { title: "Food", value: "food" },
        { title: "Washroom", value: "washroom" },
        { title: "CCTV", value: "cctv" },
        { title: "Parking", value: "parking" },
        { title: "Wifi", value: "wifi" },
        { title: "Laundry", value: "laundry" },
        { title: "Geyser", value: "geyser" },
        { title: "Fan", value: "fan" },
        { title: "Study Table", value: "studyTable" },
        { title: "Locker", value: "locker" },
        { title: "Cupboard", value: "cupboard" },
        { title: "Doctor on call", value: "doctorOnCall" },
        { title: "Matress", value: "matress" },
    ]

    const [hostels, setHostels] = useState<Hostel[]>([]);

    const [checks, setCheck] = useState<CheckBoxes>({
        food: false,
        washroom: false,
        cctv: false,
        parking: false,
        wifi: false,
        laundry: false,
        geyser: false,
        fan: false,
        studyTable: false,
        locker: false,
        cupboard: false,
        doctorOnCall: false,
        matress: false,
    });

    const handleCheck = (name: string, value: boolean) => {
        setCheck(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setFormFields(prev => ({
            ...prev,
            [name]: Number(value)
        }))
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(api + 'filter-hostel', { ...checks, ...formFields });

            if (data.hostels.length == 0) {
                toast.info("No hostels found!");
            }
            setHostels(data.hostels);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return <div>
        <Dialogue onOpenChange={() => setHostels([])} open={hostels.length > 0} title="Filtered Rooms" description="by price, rooms and other facilities." children={<div>
            {hostels.map(({ info: { address, lat, lon, price }, }) => {
                return <div className="flex justify-between items-center" >
                    <div>
                        <p className="text-xl font-bold text-slate-800" >{address}</p>
                        <p className="font-light text-slate-700" >Rent: Rs.{price}</p>
                    </div>
                    <div className="flex items-center gap-3" >
                        <Button variant="outline" onClick={() => {
                            setHostels([]);
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
        <form action="" className="flex flex-col gap-3 mt-6" onSubmit={handleSubmit} >
            <div className="flex gap-6 justify-between items-center" >
                <Input placeholder="5000" onChange={handleChange} name="min" type="number" className="font-light" />
                <p>-</p>

                <Input placeholder="20000" name="max" type="number" onChange={handleChange} className="font-light" />
            </div>
            <div className="flex flex-col" >
                {checkboxes.map(({ title, value }) => {
                    return <div className="flex gap-3 items-center" >
                        <Checkbox checked={checks[value] as boolean} name={value} onCheckedChange={(e) => handleCheck(value, e as boolean)} />    <Label text={title} />
                    </div>
                })}
            </div>
            <Button variant="primary" disabled={isLoading}  >
                {isLoading ? <Spinner /> : <>Search < Search /></>}
            </Button>
        </form>
    </div>
};

export default HostelFilter;