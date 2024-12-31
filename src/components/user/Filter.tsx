import { useState } from "react";
import SelectC from "./Select";
import { HostelFilter, LandFilter, RoomFilter } from "./forms/FilterForms"
import { Coords } from "./Map/LocationUpdater";
type PropertyOptions = "room" | "hostel" | "land";

interface Props {
    onMap: (coords: Coords) => void;
}

const Filter: React.FC<Props> = ({ onMap }) => {

    const [selected, Select] = useState<PropertyOptions>("room");

    return <div className="p-6 w-96">
        <div>
            <p className="font-bold text-indigo-600 text-2xl" >Filter</p>
            <p className="font-light text-slate-700" >By price, rooms, and other facilities.</p>
        </div>
        <div className="py-6">
            <SelectC values={[
                { title: "Room", value: 'room' },
                { title: "Hostel", value: "hostel" },
                { title: "Land", value: "land" }
            ]} onChange={(value) => Select(value as PropertyOptions)} />

            {selected == "room" && <RoomFilter onMap={onMap} />}
            {selected == "hostel" && <HostelFilter />}
            {selected == "land" && <LandFilter />}
        </div>
    </div>
};

export default Filter;