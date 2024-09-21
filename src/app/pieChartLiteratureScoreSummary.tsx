"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

export const description = "A donut chart representing literature scores";

interface ScoreSummaryProps {
  greaterThan9: number;
  greaterThan8: number;
  greaterThan7: number;
  greaterThan6: number;
  greaterThan5: number;
  greaterThan4: number;
  greaterThan3: number;
  greaterThan2: number;
  others: number;
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-row justify-around items-center">
        <p className="label">{`${payload[0].name}: ${numberWithCommas(
          payload[0].value
        )}`}</p>
      </div>
    );
  }

  return null;
};

export default function PieChartLiteratureScoreSummary() {
  // Updated literature score summary
  const literatureScoreSummary: ScoreSummaryProps = {
    greaterThan9: 42774,
    greaterThan8: 248027,
    greaterThan7: 307245,
    greaterThan6: 238449,
    greaterThan5: 125854,
    greaterThan4: 50088,
    greaterThan3: 17582,
    greaterThan2: 5597,
    others: 12959,
  };

  const chartData = [
    {
      scoreRange: ">9",
      students: literatureScoreSummary.greaterThan9,
      fill: "hsl(243, 52%, 68%)",
    },
    {
      scoreRange: ">8",
      students: literatureScoreSummary.greaterThan8,
      fill: "hsl(143, 40%, 65%)",
    },
    {
      scoreRange: ">7",
      students: literatureScoreSummary.greaterThan7,
      fill: "hsl(200, 70%, 60%)",
    },
    {
      scoreRange: ">6",
      students: literatureScoreSummary.greaterThan6,
      fill: "hsl(34, 80%, 70%)",
    },
    {
      scoreRange: ">5",
      students: literatureScoreSummary.greaterThan5,
      fill: "hsl(0, 70%, 65%)",
    },
    {
      scoreRange: ">4",
      students: literatureScoreSummary.greaterThan4,
      fill: "hsl(60, 50%, 65%)",
    },
    {
      scoreRange: ">3",
      students: literatureScoreSummary.greaterThan3,
      fill: "hsl(300, 50%, 65%)",
    },
    {
      scoreRange: ">2",
      students: literatureScoreSummary.greaterThan2,
      fill: "hsl(180, 40%, 50%)",
    },
    {
      scoreRange: "Others",
      students: literatureScoreSummary.others,
      fill: "hsl(90, 40%, 50%)",
    },
  ];

  const chartConfig = {
    students: {
      label: "Students",
    },
    LiteratureScores: {
      label: "Literature Scores",
      color: "hsl(243, 52%, 68%)",
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
          nameKey="scoreRange"
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
