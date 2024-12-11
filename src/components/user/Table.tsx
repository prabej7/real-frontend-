import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Hostel, Room, Land } from "@/constants/types/types";
import { useState } from "react";
import Dialogue from "./Dialogue";
import { Button } from "../ui/button";
import { Map as MapIcon, Trash } from "lucide-react";
import axios from "axios";
import api from "@/constants/api";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

interface Props {
    rows: Room[];
    onDelete: () => void;
}

export const RoomsTable: React.FC<Props> = ({ rows, onDelete }) => {
    const [selected, setSelected] = useState<Room>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${api}room/${id}`);
            onDelete();
            setSelected(undefined);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return <Table>

        {selected && <Dialogue open={selected ? true : false} title="Room Details" description={`ID: ${selected.id}`} onOpenChange={() => setSelected(undefined)} children={<div className="flex flex-col gap-6"  >
            <div className="flex gap-24" >
                <div>
                    <p>No. of rooms</p>
                    <p>Flat</p>
                    <p>Water Facility</p>
                    <p>Max People</p>
                    <p>Payment</p>
                    <p>Furnished</p>
                    <p>Security Deposit</p>
                    <p>Notice Period</p>
                    <p>Balcony</p>
                    <p>Water Tank</p>
                    <p>Wifi</p>
                    <p>Restrictions</p>
                </div>
                <div>

                    <p>{selected.noOfRooms}</p>
                    <p>{selected.flat ? "Yes" : "No"}</p>
                    <p>{selected.waterfacility ? "Yes" : "No"}</p>
                    <p>{selected.maxPeople}</p>
                    <p>{selected.payment}</p>
                    <p>{selected.furnished ? "Yes" : "No"}</p>
                    <p>Rs. {selected.securityDeposit}</p>
                    <p>{selected.noticePeriod}</p>
                    <p>{selected.balcony ? "Yes" : "No"}</p>
                    <p>{selected.waterTank ? "Yes" : "No"}</p>
                    <p>{selected.wifi ? "Yes" : "No"}</p>
                    <p>{selected.restrictions}</p>
                </div>

            </div>
            <Button variant="outline" onClick={() => {
                navigate("/map", { state: { lat: selected.info.lat, lng: selected.info.lon } });
            }}  ><MapIcon />Map</Button>
            <Button variant="destructive" onClick={() => handleDelete(selected.id)}>
                {isLoading ? <Spinner /> : <>Delete < Trash /></>}
            </Button></div>} />}
        <TableCaption>A list of your rooms.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="">Address</TableHead>
                <TableHead>Flat</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead className="text-right">Rent (min)</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((room) => {
                const { info: { address, price }, flat, noOfRooms } = room;
                return <TableRow onClick={() => setSelected(room)} >
                    <TableCell className="font-medium">{address}</TableCell>
                    <TableCell>{flat ? "Yes" : "No"}</TableCell>
                    <TableCell>{noOfRooms}</TableCell>
                    <TableCell className="text-right">Rs.{price}</TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
};

interface HostelProps {
    rows: Hostel[];
    onDelete: () => void;
}

export const HostelTable: React.FC<HostelProps> = ({ rows, onDelete }) => {
    const [selected, setSelected] = useState<Hostel>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${api}delete-hostel/${id}`);
            onDelete();
            setSelected(undefined);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return <Table>
        {selected && <Dialogue open={selected ? true : false} title="Hostel Details" description={`ID: ${selected.id}`} onOpenChange={() => setSelected(undefined)} children={
            <div className="flex flex-col gap-6">
                <div className="flex gap-12" >
                    <div>
                        <p>Name</p>
                        <p>Food</p>
                        <p>Washroom</p>
                        <p>CCTV</p>
                        <p>Parking</p>
                        <p>Wifi</p>
                        <p>Laundry</p>
                        <p>Geyser</p>
                        <p>Fan</p>
                        <p>Study Table</p>
                        <p>Locker</p>
                        <p>Cupboard</p>
                        <p>Doctor On Call</p>
                        <p>Matress</p>
                        <p>Payment</p>
                    </div>
                    <div>

                        <p>{selected.name}</p>
                        <p>{selected.food ? "Yes" : "No"}</p>
                        <p>{selected.washroom ? "Yes" : "No"}</p>
                        <p>{selected.cctv ? "Yes" : "No"}</p>
                        <p>{selected.parking ? "Yes" : "No"}</p>
                        <p>{selected.wifi ? "Yes" : "No"}</p>
                        <p>{selected.laundry ? "Yes" : "No"}</p>
                        <p>{selected.geyser ? "Yes" : "No"}</p>
                        <p>{selected.fan ? "Yes" : "No"}</p>
                        <p>{selected.studyTable ? "Yes" : "No"}</p>
                        <p>{selected.locker ? "Yes" : "No"}</p>
                        <p>{selected.cupboard ? "Yes" : "No"}</p>
                        <p>{selected.doctorOnCall ? "Yes" : "No"}</p>
                        <p>{selected.matress ? "Yes" : "No"}</p>
                        <p>{selected.prePayment ? "Pre" : "Post"}</p>
                    </div>
                </div>
                <Button variant="outline" onClick={() => {
                    navigate("/map", { state: { lat: selected.info.lat, lng: selected.info.lon } });
                }}  ><MapIcon />Map</Button>
                <Button variant="destructive" onClick={() => handleDelete(selected.id)}>
                    {isLoading ? <Spinner /> : <>Delete < Trash /></>}
                </Button>
            </div>} />}
        <TableCaption>A list of your rooms.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Wifi</TableHead>
                <TableHead className="text-right">Rent (min)</TableHead>

            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((hostel) => {
                const { info: { address, price }, wifi, name } = hostel;
                return <TableRow onClick={() => setSelected(hostel)}  >
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>{wifi ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">Rs.{price}</TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
}

interface LandProps {
    rows: Land[];
    onDelete: () => void;
}

export const LandsTable: React.FC<LandProps> = ({ rows, onDelete }) => {
    const [selected, setSelected] = useState<Land>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${api}land/${id}`);
            onDelete();
            setSelected(undefined);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return <Table>
        {selected && <Dialogue open={selected ? true : false} title="Land Details" description={`ID: ${selected.id}`} onOpenChange={() => setSelected(undefined)} children={
            <div className="flex flex-col gap-6" >
                <div className="flex gap-48" >
                    <div>

                        <p>Size</p>
                        <p>Parking</p>
                        <p>Water Tank</p>
                        <p>Balcony</p>
                        <p>Furnished</p>
                        <p>Road Size</p>
                    </div>
                    <div>

                        <p>{selected.size}</p>
                        <p>{selected.parking ? "Yes" : "No"}</p>
                        <p>{selected.waterTank ? "Yes" : "No"}</p>
                        <p>{selected.balcony ? "Yes" : "No"}</p>
                        <p>{selected.furnished ? "Yes" : "No"}</p>
                        <p>{selected.roadSize}</p>
                    </div>
                </div>
                <Button variant="outline" onClick={() => {
                    navigate("/map", { state: { lat: selected.info.lat, lng: selected.info.lon } });
                }}  ><MapIcon />Map</Button>
                <Button variant="destructive" onClick={() => handleDelete(selected.id)}>
                    {isLoading ? <Spinner /> : <>Delete < Trash /></>}
                </Button>
            </div>} />}
        <TableCaption>A list of your rooms.</TableCaption>
        <TableHeader>
            <TableRow>

                <TableHead className="">Address</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Road Size</TableHead>
                <TableHead className="text-right">Price (min)</TableHead>

            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((land) => {
                const { info: { address, price }, size, roadSize } = land;
                return <TableRow onClick={() => setSelected(land)} >
                    <TableCell className="font-medium">{address}</TableCell>
                    <TableCell>{size}</TableCell>
                    <TableCell>{roadSize}</TableCell>
                    <TableCell className="text-right">Rs.{price}</TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
}

