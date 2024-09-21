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
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type StudentData = { [key: string]: number };
type ChartData = { Score: number; Frequency: number };

function numberWithCommas(x: Number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CustomTooltipBig = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-row justify-around items-center">
        <p className="label">{`${label} - ${numberWithCommas(
          payload[0].value
        )}`}</p>
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

  let mostScore = 0;
  let mostScoreFrequency = 0;
  let numberOfStudents = 0;
  let totalScore = 0;
  for (let n of chartData) {
    numberOfStudents += n.Frequency;
    totalScore += Number(n.Score) * n.Frequency;
    if (n.Frequency > mostScoreFrequency) {
      mostScore = Number(n.Score);
      mostScoreFrequency = n.Frequency;
    }
  }
  const averageScore = totalScore / numberOfStudents;

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
            <DialogContent className="sm:max-w-[1400px] h-[900px]" id="dialog">
              <DialogHeader>
                <div className="relative">
                  <DialogTitle>
                    <div
                      className="absolute top-0 left-0 z-10 p-2 bg-white bg-opacity-75" // Positioning and styling
                      id="dialogTitle"
                    >
                      {subject.subject}
                    </div>
                  </DialogTitle>
                  <DialogDescription className="mt-12 ml-[10px]">
                    <div className="font-thin text-base z-0">
                      The Most Frequent Score: {mostScore}
                      <br />
                      Number of Tests: {numberWithCommas(numberOfStudents)}{" "}
                      <br />
                      Average Score:{" "}
                      {(Math.round(averageScore * 10000) / 10000).toFixed(4)}
                      <br />
                      The Median Score:{" "}
                      {chartData.length % 2 == 0
                        ? chartData[Math.round(chartData.length / 2)].Score
                        : (
                            Math.round(
                              ((Number(
                                chartData[Math.round(chartData.length / 2 - 1)]
                                  .Score
                              ) +
                                Number(
                                  chartData[Math.round(chartData.length / 2)]
                                    .Score
                                )) /
                                2) *
                                4
                            ) / 4
                          ).toFixed(2)}
                      <br />
                      The Highest Score: {chartData[chartData.length - 1].Score}
                      <br />
                      The Lowest Score: {chartData[0].Score}
                    </div>
                    <ChartContainer config={chartConfig}>
                      <ComposedChart
                        data={chartData}
                        margin={{
                          top: 10, // Adjusting top margin to move chart up
                          right: -5,
                          bottom: 80, // Slight bottom margin to give space below the chart
                          left: -5,
                        }}
                        className="z-10 relative"
                      >
                        <CartesianGrid />
                        <XAxis dataKey={"Score"} />
                        <YAxis />
                        <Bar
                          dataKey="Frequency"
                          barSize={35}
                          fill="hsl(207, 44%, 49%)"
                          radius={0}
                        />
                        <Line
                          type="monotone"
                          dataKey="Frequency"
                          stroke="hsl(143, 40%, 65%)"
                          strokeWidth={2}
                        />
                        <Tooltip
                          cursor={false}
                          content={<CustomTooltipBig />}
                        />
                      </ComposedChart>
                    </ChartContainer>
                  </DialogDescription>
                </div>
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
            <XAxis dataKey={"Score"} />
            <Bar
              dataKey="Frequency"
              barSize={35}
              fill="hsl(207, 44%, 49%)"
              radius={0}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
