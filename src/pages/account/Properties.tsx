import { Rooms, Section } from "@/components/user"

const Properties: React.FC = () => {
    return <Section title="Properties" selected="Properties"  >
        <div>
            <Rooms />
        </div>
    </Section>
};

export default Properties;