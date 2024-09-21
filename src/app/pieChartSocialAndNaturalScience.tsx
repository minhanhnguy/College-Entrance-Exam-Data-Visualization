"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

interface StudentProps {
  socialScienceStudent: number;
  naturalScienceStudent: number;
}

function numberWithCommas(x: Number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-row justify-around items-center">
        <div
          className="w-[10px] h-[10px] rounded-xl mr-1 ml-0.5 mt-px"
          style={{ backgroundColor: "hsl(var(--chart-1))" }}
        ></div>
        <p className="label">{`${payload[0].name} - ${numberWithCommas(
          payload[0].value
        )}`}</p>
      </div>
    );
  }

  return null;
};

export default function Component({
  socialScienceStudent,
  naturalScienceStudent,
}: StudentProps) {
  const chartData = [
    {
      studentsType: "Social Science Students",
      students: socialScienceStudent,
      fill: "hsl(var(--chart-1))",
    },
    {
      studentsType: "Natural Science Students",
      students: naturalScienceStudent,
      fill: "hsl(var(--chart-3))",
    },
  ];

  const chartConfig = {
    students: {
      label: "Students",
    },
    SocialScienceStudents: {
      label: "Social Science",
      color: "hsl(var(--chart-1))",
    },
    NaturalScienceStudents: {
      label: "Natural Science ",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[500px]"
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<CustomTooltip />} />
        <Pie
          data={chartData}
          dataKey="students"
          nameKey="studentsType"
          innerRadius={135}
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
                      className="fill-foreground text-5xl font-bold"
                    >
                      {totalStudents.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 30}
                      className="fill-muted-foreground"
                    >
                      Students
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
