"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface Props {
    roomCount: number;
    hostelCount: number;
    landCount: number;
}

export const CategoryPie: React.FC<Props> = ({ roomCount, hostelCount, landCount }) => {
    const chartData = [
        { browser: "Room", visitors: roomCount, fill: "#a78bfa" },
        { browser: "Hostel", visitors: hostelCount, fill: "#7c3aed" },
        { browser: "Land", visitors: landCount, fill: "#5b21b6" },
    ]

    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        chrome: {
            label: "Rooms",
            color: "hsl(var(--chart-1))",
        },
        safari: {
            label: "Hostels",
            color: "hsl(var(--chart-2))",
        },
        firefox: {
            label: "Lands",
            color: "hsl(var(--chart-3))",
        },

    } satisfies ChartConfig
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
        //eslint-disable-next-line
    }, [])

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Room v/s Hostel v/s Land</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">

                <div className="leading-none text-muted-foreground">
                    Showing total properties pie chart.
                </div>
            </CardFooter>
        </Card>
    )
}
