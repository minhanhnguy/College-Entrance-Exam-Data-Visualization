"use client";

import { useState, useEffect } from "react";

import useFetch from "@/hook/useFetch";

import {
  ComposedChart,
  Bar,
  CartesianGrid,
  XAxis,
  Line,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-row justify-around items-center">
        <div className="w-[10px] h-[10px] bg-red-500 rounded-md mr-1 ml-0.5 mt-px"></div>
        <p className="label">{`Student(s): ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

function Subject(subject: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchCsvData = useFetch();

  useEffect(() => {
    fetchCsvData("./CollegeEntranceExamData.csv", (fetchedData: any[]) => {
      setData(fetchedData);
      setLoading(false); // Set loading to false when data is fetched
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  var mathData = data.map((student) => student.Math);
  mathData = mathData.filter((score) => score != null);

  mathData = mathData.sort();

  const mathFrequency = new Map();

  for (let n of mathData) {
    if (mathFrequency.has(n)) {
      mathFrequency.set(n, mathFrequency.get(n) + 1);
    } else {
      mathFrequency.set(n, 1);
    }
  }

  const chartData = Array.from(mathFrequency, ([Score, Frequency]) => ({
    Score,
    Frequency,
  }));

  const chartConfig = {
    Frequency: {
      label: "Number Of Students",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <ComposedChart
        data={chartData}
        margin={{
          top: -100,
          right: -5,
          bottom: 10,
          left: -5,
        }}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis
          dataKey="Score"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Bar
          dataKey="Frequency"
          barSize={35}
          fill="hsl(var(--chart-5))"
          radius={2}
        />
        <Line
          type="natural"
          dataKey="Frequency"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
        />
        <Tooltip
          cursor={{ stroke: "#BABABA", strokeWidth: 1, strokeDasharray: "5 5" }}
          content={<CustomTooltip />}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

export default function DrawBarGraphFrequency() {
  return (
    <Card className="w-[600px] rounded-xl h-auto transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
      <CardHeader className="mb-0 pb-0">
        <CardTitle>Card Title</CardTitle>
        <CardDescription className="w-[190px]">
          Card Description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Subject subject="Math"></Subject>
      </CardContent>
    </Card>
  );
}
