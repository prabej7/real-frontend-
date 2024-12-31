import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import LocationUpdater, { Coords } from './LocationUpdater';
import Search from './Search';
import { useEffect, useState } from 'react';
import ClickHandler from './ClickHandle';
import { toast } from 'react-toastify';
import { useHostels, useLands, useRooms } from '@/store';
import PMarker from './Marker';
import { useLocation } from 'react-router-dom';

interface Props {
    onLocationSelect: (coords: Coords) => void;
    initialCoords?: Coords
}

const Map: React.FC<Props> = ({ onLocationSelect, initialCoords }) => {
    const { state } = useLocation();
    const { rooms } = useRooms();
    const { lands } = useLands();
    const { hostels } = useHostels();


    const [currentPosition, setCurrentPosition] = useState<Coords>({
        lat: 27.7103,
        lng: 85.3222
    });

    const [selectedPosition, setSelectedPosition] = useState<Coords>({
        lat: 27.7103,
        lng: 85.3222
    });

    const handleSearch = (coord: Coords) => {
        setCurrentPosition(coord);
    };

    const handleMapClick = (coord: Coords) => {
        setSelectedPosition(coord);
        onLocationSelect(coord);
    };

    const askLocationPermission = () => {
        if (navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                setCurrentPosition({ lat, lng });
                //eslint-disable-next-line
            }, (_) => {
                toast.error('Permission Denied.')
            })
        }
    }

    useEffect(() => {

        if (state) {
            const { lat, lng } = state as Coords;
            setCurrentPosition({
                lat: Number(lat),
                lng: Number(lng)
            });

            return;
        }

        if (initialCoords) {
            const { lat, lng } = initialCoords;
            setCurrentPosition({
                lat: Number(lat),
                lng: Number(lng)
            });

            return;
        }

        return askLocationPermission();

        //eslint-disable-next-line
    }, [initialCoords]);

    return (
        <>
            <Search onSearch={handleSearch} />
            {/* @ts-expect-error Center Error Ignore */}
            <MapContainer className='z-0' center={[currentPosition.lat, currentPosition.lng]} zoom={17} scrollWheelZoom={true}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
                    <Popup>
                        Selected Postion
                    </Popup>
                </Marker>

                <Marker position={[currentPosition.lat, currentPosition.lng]}>
                    <Popup>
                        You
                    </Popup>
                </Marker>

                {rooms?.map((room) => {
                    const { info: { address, lat, lon, imgs } } = room;
                    return <PMarker position={[lat, lon]} title={address} img={imgs[0]} />;
                })}

                {hostels?.map((hostel) => {
                    const { info: { lat, lon, imgs }, name } = hostel;
                    return <PMarker position={[lat, lon]} title={name} img={imgs[0]} />;
                })}

                {lands?.map((land) => {
                    const { info: { address, lat, lon, imgs } } = land;
                    return <PMarker position={[lat, lon]} title={address} img={imgs[0]} />;
                })}
                <LocationUpdater location={currentPosition} />
                <ClickHandler onClick={handleMapClick} />
            </MapContainer>
        </>
    );
};

export default Map;