import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { checkboxes, CheckBoxes, formField, schema, inputFields, fields, defaultValue } from "./hostel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { titlelize } from "@/utils";
import MapSheet from "../Map/MapSheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import api from "@/constants/api";
import { useCookies } from "react-cookie";


const HostelForm: React.FC = () => {
    const [files, setFiles] = useState<FileList>();
    const [checks, setChecks] = useState<CheckBoxes>(defaultValue);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [{ token }] = useCookies(['token']);
    const onCheck = (name: string, value: boolean) => {
        setChecks(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const { register, setValue, formState: { errors }, handleSubmit, reset } = useForm<formField>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (formData: formField) => {
        setLoading(true);
        try {
            const form = new FormData();

            form.append('form', JSON.stringify({ ...formData, ...checks, token }));


            if (files?.length) {
                for (let i = 0; i < files.length; i++) {
                    form.append('images', files[i]);
                }
            } else {
                toast.error("Please upload at least one file.");
                setLoading(false);
                return;
            }


            await axios.post(`${api}hostel`, form);

            toast.success("Hostel Added!");
            reset();
            setChecks(defaultValue);
            //eslint-disable-next-line
        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div>
            <div className="flex gap-24" >
                <div className="flex flex-col" >
                    {checkboxes.map((name) => {
                        return <label className="font-light"  >{titlelize(name)}</label>
                    })}
                </div>
                <div className="flex flex-col gap-2" >
                    {checkboxes.map((name) => {
                        return <Checkbox name={name} checked={checks[name as keyof CheckBoxes]} onCheckedChange={(value) => onCheck(name, Boolean(value))} />
                    })}
                </div>
            </div>

            <form className="flex flex-col mt-3 gap-3" onSubmit={handleSubmit(onSubmit)}  >
                <MapSheet onLocationSelect={({ lat, lng }) => {
                    setValue('lat', lat);
                    setValue('lon', lng);
                }} />
                <>
                    {inputFields.map((name) => {
                        return <>
                            <Input placeholder={titlelize(name)} {...register(name as fields)} />
                            {errors[name as fields] && <p className="text-red-500">{errors[name as fields]?.message}</p>}
                        </>
                    })}</>
                <Input type="file" multiple onChange={(e) => setFiles(e.target.files ? e.target.files : undefined)} />
                <Button variant="primary" type="submit" disabled={isLoading}  >
                    {isLoading ? <Spinner /> : 'Add'}
                </Button>
            </form>
        </div>
    </>
}

export default HostelForm;