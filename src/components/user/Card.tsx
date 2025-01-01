import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    title?: string;
    description?: string;
    content?: React.ReactNode;
    footer?: string;
    footerStyle?: string;
    options?: React.ReactNode;
    onClick?: () => void;
}

const CardC: React.FC<Props> = ({ content, description, footer, title, footerStyle, options }) => {
    // Helper function to check if content is a string
    const isString = (value: unknown): value is string => typeof value === "string";

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-slate-600">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {isString(content) ? (
                    <p className="font-black text-4xl text-indigo-500">{content}</p>
                ) : (
                    content
                )}
            </CardContent>
            {footer && (
                <CardFooter className={footerStyle}>
                    <div className="flex flex-col gap-3 w-full" >
                        <p>{footer}</p>
                        {options}</div>
                </CardFooter>
            )}
        </Card>
    );
};

export default CardC;
