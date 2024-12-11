import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    values: { value: string; title: string }[];
    onChange: (value: string) => void;
    placeholder?: string;
}

const SelectC: React.FC<Props> = ({ onChange, values, placeholder }) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder ? placeholder : values[0].title} />
            </SelectTrigger>
            <SelectContent >
                {values.map(({ title, value }) => (
                    <SelectItem key={value} value={value}>
                        {title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectC;
