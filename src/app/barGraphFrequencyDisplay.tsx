"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ComposedChart,
  Bar,
  CartesianGrid,
  XAxis,
  Line,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type StudentData = { [key: string]: number };
type ChartData = { Score: number; Frequency: number };

const CustomTooltipSmall = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return <div></div>;
  }

  return null;
};

const CustomTooltipBig = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-row justify-around items-center">
        <div className="w-[10px] h-[10px] bg-red-500 rounded-md mr-1 ml-0.5 mt-px"></div>
        <p className="label">{`Score ${label} : ${payload[0].value} Students`}</p>
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
  subjectData = subjectData.filter((score) => score > 0);

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
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <Card className="w-[600px] rounded-xl h-auto">
      <CardHeader className="mb-0 pb-0">
        <CardTitle className="flex justify-between">
          {subject.subject}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                Open
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1425px]" id="dialog">
              <DialogHeader>
                <DialogTitle>
                  <div className="" id="dialogTitle">
                    {subject.subject}
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <ChartContainer config={chartConfig}>
                    <ComposedChart
                      data={chartData}
                      margin={{
                        top: 0,
                        right: -5,
                        bottom: 0,
                        left: -5,
                      }}
                    >
                      <CartesianGrid vertical={false} horizontal={false} />
                      <XAxis
                        dataKey={"Score"}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={2}
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
                      <Tooltip content={<CustomTooltipBig />} />
                    </ComposedChart>
                  </ChartContainer>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 0,
              right: -5,
              bottom: -25,
              left: -5,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey={"Score"}
              tickLine={false}
              axisLine={false}
              tickMargin={2}
            />
            <Bar
              dataKey="Frequency"
              barSize={35}
              fill="hsl(var(--chart-5))"
              radius={2}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
