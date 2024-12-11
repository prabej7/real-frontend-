import { Card } from "@/components/user";

interface Props {
    roomCount: number;
    hostelCount: number;
    landCount: number;
}

const Counts: React.FC<Props> = ({ hostelCount, landCount, roomCount }) => {


    const cards: { title: string; content: number }[] = [
        { title: "Rooms", content: roomCount },
        { title: "Hostels", content: hostelCount },
        { title: "Lands", content: landCount }
    ]

    return <>
        <div className="grid grid-cols-3 grid-rows-1 gap-6 my-6 w-full" >{cards.map((({ title, content }) => {
            return <Card title={title} content={content} />
        }))}</div>


    </>
};

export default Counts;