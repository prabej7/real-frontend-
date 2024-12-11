import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Map from "./Map";
import { Coords } from "./LocationUpdater";
import { Button } from "@/components/ui/button";
import { Map as MapIcon } from 'lucide-react'

interface Props {
    onLocationSelect: (coords: Coords) => void;
}

const MapSheet: React.FC<Props> = ({ onLocationSelect }) => {
    return <Sheet>
        <SheetTrigger>
            <Button type="button" variant="outline" className="w-full" >
                Select on the Map<MapIcon />
            </Button>
        </SheetTrigger>
        <SheetContent side="top">
            <SheetHeader>
                <SheetTitle>Select Coordinates:</SheetTitle>
                <SheetDescription>
                    Search for the location and click to select the location.
                </SheetDescription>
            </SheetHeader>
            <Map onLocationSelect={onLocationSelect} />
        </SheetContent>
    </Sheet>

};

export default MapSheet;