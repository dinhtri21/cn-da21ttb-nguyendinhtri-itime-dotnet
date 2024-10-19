"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear line chart";

const chartData = [
  { day: "1", desktop: 24 },
  { day: "2", desktop: 13 },
  { day: "3", desktop: 98 },
  { day: "4", desktop: 39 },
  { day: "5", desktop: 48 },
  { day: "6", desktop: 38 },
  { day: "7", desktop: 24 },
  { day: "8", desktop: 13 },
  { day: "9", desktop: 98 },
  { day: "10", desktop: 39 },
  { day: "11", desktop: 200 },
  { day: "12", desktop: 38 },
  { day: "13", desktop: 24 },
  { day: "14", desktop: 13 },
  { day: "15", desktop: 98 },
  { day: "16", desktop: 39 },
  { day: "17", desktop: 48 },
  { day: "18", desktop: 38 },
  { day: "19", desktop: 232 },
  { day: "20", desktop: 13 },
  { day: "21", desktop: 98 },
  { day: "22", desktop: 100 },
  { day: "23", desktop: 48 },
  { day: "24", desktop: 38 },
  { day: "25", desktop: 230 },
  { day: "26", desktop: 13 },
  { day: "27", desktop: 98 },
  { day: "28", desktop: 39 },
  { day: "29", desktop: 48 },
  { day: "30", desktop: 40 },
  { day: "31", desktop: 24 },
];

const chartConfig = {
  desktop: {
    label: "Doanh thu",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <div className="">
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Line Chart - Linear</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="md:h-[240px] lg:h-[400px] w-full"
            config={chartConfig}
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
