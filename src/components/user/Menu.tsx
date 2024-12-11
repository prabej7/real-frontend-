import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface Props {
    icon: React.ReactNode;
    label: string;
    items: { label: string, action: (value: string) => void, value: string }[]
}

const Options: React.FC<Props> = ({ icon, items, label }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger>
            {icon}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {items.map(({ label, action, value }) => {
                return <DropdownMenuItem onClick={() => { action(value) }} >{label}</DropdownMenuItem>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
};

export default Options;