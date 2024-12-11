import { Input } from "@/components/ui/input";
import { PropertySchemaType, propertySchema } from "@/constants/schemas";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SelectC from "../Select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import MapSheet from "../Map/MapSheet";
import { useState } from "react";
import Spinner from "../Spinner";
import axios from "axios";
import api from "@/constants/api";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

interface CheckBox {
    flat: boolean;
    waterFacility: boolean;
    furnished: boolean;
    balcony: boolean;
    waterTank: boolean;
    wifi: boolean;
}

type Options = "flat" | "waterFacility" | "furnished" | "balcony" | "waterTank" | "wifi";

const checBoxes: string[] = ["flat", "waterFacility", "furnished", "balcony", "waterTank", "wifi"];

const defaultCheck = {
    balcony: false,
    flat: false,
    furnished: false,
    waterFacility: false,
    waterTank: false,
    wifi: false,
}

const RoomForm: React.FC = () => {
    const [files, setFiles] = useState<FileList>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [checkBox, setCheck] = useState<CheckBox>(defaultCheck);
    const [{ token }] = useCookies(['token']);
    const { register, setValue, formState: { errors }, handleSubmit, reset } = useForm<PropertySchemaType>({
        resolver: zodResolver(propertySchema)
    });

    const onCheck = (name: Options, value: boolean) => {
        setCheck(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = async (formData: PropertySchemaType) => {
        setLoading(true);
        const f = {
            ...formData,
            ...checkBox,
            token
        }
        try {
            const form = new FormData();
            form.append('form', JSON.stringify(f));
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    form.append('images', files[i]);
                }
            }
            await axios.post(`${api}room`, form);
            toast.success("Room Added !");
            setCheck(defaultCheck);
            reset();
            setFiles(undefined);
            //eslint-disable-next-line
        } catch (err) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return <div>
        <form className="flex flex-col gap-3 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}  >
            <Input placeholder="No of rooms" {...register('noOfRooms')} />
            {errors.noOfRooms && <p className="text-red-500" >{errors.noOfRooms.message}</p>}
            <Input placeholder="Max People" {...register('maxPeople')} />
            {errors.maxPeople && <p className="text-red-500" >{errors.maxPeople.message}</p>}
            <SelectC values={[
                {
                    title: "Advance",
                    value: "advance"
                },
                {
                    title: "Month End",
                    value: 'month'
                }
            ]} onChange={(value) => setValue('paymentMode', value)} placeholder="Select One" />
            {errors.paymentMode && <p>{errors.paymentMode.message}</p>}
            <Input placeholder="Notice Period" {...register('noticePeriod')} />
            {errors.noticePeriod && <p className="text-red-500" >{errors.noticePeriod.message}</p>}
            <Input placeholder="Restrictions" {...register('restrictions')} />
            {errors.restrictions && <p className="text-red-500" >{errors.restrictions.message}</p>}
            <Input placeholder="Security Deposite" {...register('securityDeposit')} />
            {errors.securityDeposit && <p className="text-red-500" >{errors.securityDeposit.message}</p>}
            <Input placeholder="Street Address" {...register('address')} />
            {errors.address && <p className="text-red-500" >{errors.address.message}</p>}
            <MapSheet onLocationSelect={(coords) => {
                setValue('lat', String(coords.lat));
                setValue('lon', String(coords.lng));
            }} />
            <div className="flex gap-3" >
                <Input placeholder="Lat" {...register('lat')} />
                <Input placeholder="Lon" {...register('lon')} />
            </div>
            {errors.lat && <p className="text-red-500 font-light"   >{errors.lat.message}</p>}
            <Input placeholder="City" {...register('city')} />
            {errors.city && <p className="text-red-500" >{errors.city.message}</p>}
            <Input placeholder="Rent" {...register('price')} />
            {errors.price && <p className="text-red-500 font-light" >{errors.price.message}</p>}

            <div className="flex gap-24">
                <div className="flex flex-col font-light" >
                    {checBoxes.map((name) => {
                        return <label >{name.slice(0, 1).toUpperCase()}{name.slice(1)}</label>
                    })}
                </div>
                <div className="flex flex-col gap-2" >
                    {checBoxes.map((name) => {
                        return <Checkbox checked={checkBox[name as Options]} onCheckedChange={(e) => onCheck(name as Options, Boolean(e))} />
                    })}
                </div>

            </div>
            <Input type="file" multiple onChange={(e) => {
                if (e.target.files) {
                    setFiles(e.target.files);
                }
            }} />
            <Button variant="primary" disabled={isLoading}  >
                {isLoading ? <Spinner /> : "Submit"}
            </Button>
        </form>
    </div>
};

export default RoomForm;