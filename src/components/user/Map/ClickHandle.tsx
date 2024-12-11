import { useMapEvents } from 'react-leaflet';
import { Coords } from './LocationUpdater';

interface ClickHandlerProps {
    onClick: (coord: Coords) => void;
}

const ClickHandler: React.FC<ClickHandlerProps> = ({ onClick }) => {
    useMapEvents({
        //@ts-expect-error Event 
        click(e) {
            onClick({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            });
        },
    });
    return null;
};

export default ClickHandler;