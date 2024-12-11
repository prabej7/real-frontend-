import { HostelForm, LandForm, RoomForm, Section, SelectC } from "@/components/user";
import { useState } from "react";

type options = "room" | "hostel" | "land";

const AddProperty: React.FC = () => {
    const [selected, selectForm] = useState<options>("room")
    return <Section title="Add Property" selected="Add Properties"  >
        <div>
            <div className="py-3" >
                <SelectC values={[
                    {
                        title: "Room",
                        value: 'room'
                    },
                    {
                        title: "Hostel",
                        value: "hostel"
                    },
                    {
                        title: "Land",
                        value: "land"
                    }
                ]} onChange={(value) => { selectForm(value as options) }} />
            </div>
            <div className="mt-3" >
                {selected == "room" && <RoomForm />}
                {selected == "hostel" && <HostelForm />}
                {selected == "land" && <LandForm />}
            </div>
        </div>
    </Section>
};

export default AddProperty;