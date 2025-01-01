import { useState } from "react";
import SelectC from "./Select";
import { HostelFilter, LandFilter, RoomFilter } from "./forms/FilterForms"
import { Coords } from "./Map/LocationUpdater";
type PropertyOptions = "room" | "hostel" | "land";

interface Props {
    onMap: (coords: Coords) => void;
    selectedProp?: "room" | "hostel" | "land";
}

const Filter: React.FC<Props> = ({ onMap, selectedProp }) => {

    const [selected, Select] = useState<PropertyOptions>(selectedProp ? selectedProp : "room");

    return <div className="p-6 w-96">
        <div>
            <p className="font-bold text-indigo-600 text-2xl" >Filter</p>
            <p className="font-light text-slate-700" >By price, rooms, and other facilities.</p>
        </div>
        <div className={`${!selectedProp ? "py-3" : "py-0"}`}>
            {!selectedProp && <SelectC values={[
                { title: "Room", value: 'room' },
                { title: "Hostel", value: "hostel" },
                { title: "Land", value: "land" }
            ]} onChange={(value) => Select(value as PropertyOptions)} />}
            {selected == "room" && <RoomFilter onMap={onMap} />}
            {selected == "hostel" && <HostelFilter onMap={onMap} />}
            {selected == "land" && <LandFilter onMap={onMap} />}
        </div>
    </div>
};

export default Filter;