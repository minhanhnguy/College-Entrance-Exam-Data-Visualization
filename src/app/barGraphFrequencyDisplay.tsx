"use client";

import { useState, useEffect } from "react";
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

type StudentData = { [key: string]: number };
type ChartData = { Score: number; Frequency: number };

const CustomTooltip = ({ active, payload }: any) => {
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

async function returnFrequency(
  subject: { subject: string },
  data: StudentData[]
): Promise<ChartData[]> {
  let numberOfStudent = 0;
  let subjectData = data.map((student) => student[subject.subject]);
  subjectData = subjectData.filter((score) => score !== 0 && score !== null);

  subjectData.sort((a, b) => a - b);

  const subjectFrequency = new Map<number, number>();

  for (let score of subjectData) {
    numberOfStudent++;
    if (subjectFrequency.has(score)) {
      subjectFrequency.set(score, subjectFrequency.get(score)! + 1);
    } else {
      subjectFrequency.set(score, 1);
    }
  }

  const chartData: ChartData[] = Array.from(
    subjectFrequency,
    ([Score, Frequency]) => ({
      Score,
      Frequency,
    })
  );

  return chartData;
}

interface BarGraphProps {
  subject: { subject: string };
  csvData: StudentData[];
}

export default function BarGraphFrequencyDisplay({
  subject,
  csvData,
}: BarGraphProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processData = async () => {
      const processedChartData = await returnFrequency(subject, csvData);
      setChartData(processedChartData);
      setLoading(false);
    };
    processData();
  }, [subject, csvData]);

  const chartConfig = {
    Frequency: {
      label: "Number Of Students",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      className="rounded-xl h-auto transition-transform duration-300 ease-in-out hover:scale-108"
      style={{ width: 600 }}
    >
      <CardHeader className="mb-0 pb-0">
        <CardTitle>{subject.subject}</CardTitle>
        <CardDescription className="w-[190px]">
          Number of students:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 0,
              right: -5,
              bottom: -10,
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
            <Tooltip content={<CustomTooltip />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
