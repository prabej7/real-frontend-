import { Marker, Popup } from "react-leaflet";

interface Props {
    position: [number, number];
    title: string;
    img: string;
}

const PMarker: React.FC<Props> = ({ position, title, img }) => {

    return <Marker position={position} >
        <Popup>
            <div>
                <img className="rounded-lg"  src={img} />
                <p className="font-bold text-lg" >{title}</p>
            </div>

        </Popup>
    </Marker>
};

export default PMarker;