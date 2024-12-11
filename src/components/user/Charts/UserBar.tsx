"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    chartData: { month: string; verified: number; unverified: number }[];
}

export const UserBarChart: React.FC<Props> = ({ chartData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Verified v/s Unverified</CardTitle>
                <CardDescription>January - December {String(new Date().getFullYear())}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-[300px] w-full">
                    <BarChart width={500} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "white", borderRadius: "5px" }}
                            formatter={(value: number, name: string) =>
                                [`${value} Users`, name === "verified" ? "Verified" : "Unverified"]
                            }
                        />
                        <Bar dataKey="verified" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="unverified" fill="#f44336" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total users for the last 12 months.
                </div>
            </CardFooter>
        </Card>
    );
};
