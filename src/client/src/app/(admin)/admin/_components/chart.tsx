"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface ChartData {
  day: string;
  name: number;
}

const chartConfig = {
  name: {
    label: " ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartProps {
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedYear: number;
  selectedMonth: number;
  chartData: ChartData[];
}

export function Chart(props: ChartProps) {
  return (
    <div className="">
      <Card className="shadow border">
        <CardHeader className="flex flex-row justify-between items-center relative">
          <div>
            <CardTitle>Biểu đồ doanh thu</CardTitle>
            {props.selectedMonth !== 0 && props.selectedYear && (
              <CardDescription>
                Tháng {props.selectedMonth} / {props.selectedYear}
              </CardDescription>
            )}

            {props.selectedMonth == 0 && props.selectedYear && (
              <CardDescription>Năm {props.selectedYear}</CardDescription>
            )}
          </div>
          <div className="flex gap-3  absolute right-[-12px] top-[-7px] rounded-bl-xl rounded-br-xl pr-3 pl-3 pb-3 border-b  border-l bg-white">
            <Select
              onValueChange={(value: string) => {
                props.setSelectedMonth(parseInt(value));
              }}
              defaultValue={props.selectedMonth.toString()}
            >
              <SelectTrigger className="w-[110px] border border-gray-300">
                <SelectValue placeholder={props.selectedMonth.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">....</SelectItem>
                <SelectItem value="1">Tháng 1</SelectItem>
                <SelectItem value="2">Tháng 2</SelectItem>
                <SelectItem value="3">Tháng 3</SelectItem>
                <SelectItem value="4">Tháng 4</SelectItem>
                <SelectItem value="5">Tháng 5</SelectItem>
                <SelectItem value="6">Tháng 6</SelectItem>
                <SelectItem value="7">Tháng 7</SelectItem>
                <SelectItem value="8">Tháng 8</SelectItem>
                <SelectItem value="9">Tháng 9</SelectItem>
                <SelectItem value="10">Tháng 10</SelectItem>
                <SelectItem value="11">Tháng 11</SelectItem>
                <SelectItem value="12">Tháng 12</SelectItem>
              </SelectContent>
            </Select>

            {/* Year */}
            <Select
              onValueChange={(value: string) => {
                props.setSelectedYear(parseInt(value));
              }}
              defaultValue={props.selectedYear.toString()}
            >
              <SelectTrigger className="w-[110px] border border-gray-300">
                <SelectValue placeholder={props.selectedYear.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">Năm 2023</SelectItem>
                <SelectItem value="2024">Năm 2024</SelectItem>
                <SelectItem value="2025">Năm 2025</SelectItem>
                <SelectItem value="2026">Năm 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="md:h-[240px] lg:h-[400px] w-full"
            config={chartConfig}
          >
            <LineChart
              accessibilityLayer
              data={props.chartData}
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
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
               {/* <Legend  /> */}
              <Line
                dataKey="name"
                type="linear"
                stroke="var(--color-name)"
                strokeWidth={2}
                dot={true}
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
