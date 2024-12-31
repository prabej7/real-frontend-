import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "./Room";
import { Button } from "@/components/ui/button";
import { Map, Search, SquareMenu } from "lucide-react";
import { Spinner } from "../..";
import { toast } from "react-toastify";
import { Land } from "@/constants/types/types";
import axios from "axios";
import api from "@/constants/api";
import Dialogue from "../../Dialogue";
import { Coords } from "../../Map/LocationUpdater";

type FormField = {
    size: string;
    parking: boolean;
    waterTank: boolean;
    balcony: boolean;
    furnished: boolean;
    roadSize: string;
    min: number;
    max: number;
    [key: string]: string | boolean | number;
}

const checkboxes = [
    { value: 'parking', title: 'Parking' },
    { value: 'waterTank', title: 'Water Tank' },
    { value: 'balcony', title: 'Balcony' },
    { value: 'furnished', title: 'Furnished' },
]

interface Props {
    onMap: (coords: Coords) => void;
}

const LandFilter: React.FC<Props> = ({ onMap }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [formFields, setFields] = useState<FormField>({
        size: "",
        parking: false,
        waterTank: false,
        balcony: false,
        furnished: false,
        roadSize: "",
        min: 0,
        max: 0
    });

    const [lands, setLands] = useState<Land[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const value = name === "min" || name === "max"
            ? Number(e.target.value)
            : e.target.value;

        setFields(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleCheck = (name: string, value: boolean) => {
        setFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(api + 'filter-land', { ...formFields });

            if (data.lands.length == 0) {
                toast.info("No lands found");
            }

            setLands(data.lands);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return <div>
        <Dialogue onOpenChange={() => setLands([])} open={lands.length > 0} title="Filtered Lands" description="by price, and other facilities." children={<div>
            {lands.map(({ info: { address, lat, lon, price }, }) => {
                return <div className="flex justify-between items-center" >
                    <div>
                        <p className="text-xl font-bold text-slate-800" >{address}</p>
                        <p className="font-light text-slate-700" >Rent: Rs.{price}</p>
                    </div>
                    <div className="flex items-center gap-3" >
                        <Button variant="outline" onClick={() => {
                            setLands([]);
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
            <div className="flex gap-6 justify-between items-center mt-6" >
                <Input placeholder="5000" onChange={handleChange} name="min" type="number" className="font-light" />
                <p>-</p>

                <Input placeholder="20000" name="max" type="number" onChange={handleChange} className="font-light" />
            </div>
            <Input placeholder="Size" name="size" onChange={handleChange} className="font-light" />
            <Input placeholder="Road Size" name="roadSize" className="font-light" onChange={handleChange} />
            <div>
                <div className="flex flex-col" >
                    {checkboxes.map(({ title, value }) => {
                        return <div className="flex gap-3 items-center" >
                            <Checkbox checked={formFields[value] as boolean} name={value} onCheckedChange={(e) => handleCheck(value, e as boolean)} />    <Label text={title} />
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

export default LandFilter;