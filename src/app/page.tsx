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

function Math() {
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
        width={1000}
        height={650}
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid vertical={false} />
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
          radius={3}
        />
        <Line
          type="natural"
          dataKey="Frequency"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
        />
        <Tooltip cursor={false} content={<CustomTooltip />} />
      </ComposedChart>
    </ChartContainer>
  );
}

export default function Home() {
  return <Math></Math>;
}
