import { Filter } from "@/components/user";
import { Coords } from "@/components/user/Map/LocationUpdater";
import Map from "@/components/user/Map/Map";
import { useState } from "react";

const AllProperties: React.FC = () => {
    const [coords, setCoords] = useState<Coords>();
    return <div className="flex" >
        <Filter onMap={setCoords} />
        <Map onLocationSelect={() => { }} initialCoords={coords} />
    </div>
};

export default AllProperties;