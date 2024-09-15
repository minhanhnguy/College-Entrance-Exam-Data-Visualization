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
  /* <div className="custom-tooltip flex flex-row justify-around items-center">
        <div className="w-[10px] h-[10px] bg-red-500 rounded-md mr-1 ml-0.5 mt-px"></div>
        <p className="label">{`Student(s): ${payload[0].value}`}</p>
      </div> */
  if (active && payload && payload.length) {
    return <div></div>;
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

  var subjectData = data.map((student) => student[subject.subject]);
  subjectData = subjectData.filter((score) => score != 0);

  subjectData = subjectData.sort();

  const subjectFrequency = new Map();

  for (let n of subjectData) {
    if (subjectFrequency.has(n)) {
      subjectFrequency.set(n, subjectFrequency.get(n) + 1);
    } else {
      subjectFrequency.set(n, 1);
    }
  }

  const chartData = Array.from(subjectFrequency, ([Score, Frequency]) => ({
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
          top: -40,
          right: -5,
          bottom: -10,
          left: -5,
        }}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis dataKey="~" tickLine={false} axisLine={false} tickMargin={8} />
        <Bar
          dataKey="Frequency"
          barSize={35}
          fill="hsl(var(--chart-5))"
          radius={2}
        />
        {/* <Line
          type="natural"
          dataKey="Frequency"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
        /> */}
        <Tooltip
          /*cursor={{ stroke: "#BABABA", strokeWidth: 1, strokeDasharray: "5 5" }}
          content={<CustomTooltip />}*/
          content={<CustomTooltip />}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

export default function DrawBarGraphFrequency(subject: any) {
  return (
    <Card
      className="rounded-xl h-auto transition-transform duration-300 ease-in-out hover:scale-110"
      style={{ width: 600 }}
    >
      <CardHeader className="mb-0 pb-0">
        <CardTitle>{subject.subject}</CardTitle>
        <CardDescription className="w-[190px]">
          Card Description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Subject subject={subject.subject}></Subject>
      </CardContent>
    </Card>
  );
}
