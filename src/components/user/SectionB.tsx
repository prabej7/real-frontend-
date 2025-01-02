import siteName from "@/constants/name";
import Nav from "./Nav";

interface Props {
    children: React.ReactNode;
    selected: string;
}

const SectionB: React.FC<Props> = ({ children, selected }) => {

    const links = ["Home", "Rooms", "Hostels", "Lands", "All"];

    return <div className="main" >
        <Nav selected={selected} title={siteName} links={links} />
        <div className="section" >
            {children}
        </div>
    </div>
};

export default SectionB;