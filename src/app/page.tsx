"use client";

import { useState, useEffect } from "react";
import DrawBarGraphFrequency from "./barGraphFrequencyDisplay";
import PieChartSocialAndNaturalScience from "./pieChartSocialAndNaturalScience";
import PieChartMathScoreSummary from "./pieChartMathScoreSummary";
import PieChartLiteratureScoreSummary from "./pieChartLiteratureScoreSummary";
import DrawMapAverageScore from "./drawMapAverageScore";
import DrawMapStudentCount from "./drawMapStudentCount";

import { Switch } from "@/components/ui/switch";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StudentData = { [key: string]: number };

function numberWithCommas(x: Number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Home() {
  const [csvData, setCsvData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch("/api/readCsv");
        if (!response.ok) {
          throw new Error("Failed to fetch CSV data");
        }
        const data = await response.json();
        setCsvData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
        setLoading(false);
      }
    };

    fetchCsvData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        Loading...
      </div>
    );
  }

  let numberOfNaturalScienceStudent = 0;
  let numberOfSocialScienceStudent = 0;
  for (let n of csvData) {
    if (n.Physic != 0) {
      numberOfNaturalScienceStudent += 1;
    }
    if (n.Geography != 0) {
      numberOfSocialScienceStudent += 1;
    }
  }

  return (
    <div className="relative">
      <h1 className="fill-foreground text-4xl font-bold absolute top-[5px] left-1/2 transform -translate-x-1/2 text-center">
        Vietnam's National College Entrance Data Visualization
      </h1>
      <div className="w-screen flex justify-center">
        <Card className="w-11/12 mt-[60px] rounded-xl">
          <CardHeader>
            <CardTitle>Heat Map of Average Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <DrawMapAverageScore />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>

      <div className="flex h-4/6 mt-[20px]">
        <div className="w-1/3">
          <h1 className="ml-[25px] text-lg font-semibold">
            Distribution of Social and Natural Science Students:
          </h1>
          <PieChartSocialAndNaturalScience
            naturalScienceStudent={numberOfNaturalScienceStudent}
            socialScienceStudent={numberOfSocialScienceStudent}
          />
        </div>
        <div className="w-1/3">
          <h1 className="ml-[25px] text-lg font-semibold">
            Math Scores Distribution:
          </h1>
          <PieChartMathScoreSummary></PieChartMathScoreSummary>
        </div>
        <div className="w-1/3">
          <h1 className="ml-[25px] text-lg font-semibold">
            Literature Scores Distribution:
          </h1>
          <PieChartLiteratureScoreSummary></PieChartLiteratureScoreSummary>
        </div>
      </div>
      <div className="ml-[25px]">
        <h1 className="text-xl font-semibold">General Studies:</h1>
        <p className="font-extralight">
          Number of General Tests (estimated): {numberWithCommas(1037279)}
        </p>
      </div>
      <div className="h-[440px] flex justify-evenly items-center flex-wrap">
        <DrawBarGraphFrequency
          subject={{ subject: "Math" }}
          csvData={csvData}
        />{" "}
        <DrawBarGraphFrequency
          subject={{ subject: "Literature" }}
          csvData={csvData}
        />{" "}
        <DrawBarGraphFrequency
          subject={{ subject: "Foreign Language" }}
          csvData={csvData}
        />{" "}
      </div>
      <div className="ml-[25px]">
        <h1 className="text-xl font-semibold">Natural Science:</h1>
        <p className="font-extralight">
          Number of Natural Science Tests (estimated):{" "}
          {numberWithCommas(341880)}
        </p>
      </div>
      <div className="h-[440px] flex justify-evenly items-center flex-wrap">
        <DrawBarGraphFrequency
          subject={{ subject: "Physic" }}
          csvData={csvData}
        />{" "}
        <DrawBarGraphFrequency
          subject={{ subject: "Chemistry" }}
          csvData={csvData}
        />{" "}
        <DrawBarGraphFrequency
          subject={{ subject: "Biology" }}
          csvData={csvData}
        />{" "}
      </div>
      <div className="ml-[25px]">
        <h1 className="text-xl font-semibold">Social Science:</h1>
        <p className="font-extralight">
          Number of Social Science Tests (estimated): {numberWithCommas(695399)}
        </p>
      </div>
      <div className="h-[440px] flex justify-evenly items-center flex-wrap">
        <DrawBarGraphFrequency
          subject={{ subject: "History" }}
          csvData={csvData}
        />{" "}
        <DrawBarGraphFrequency
          subject={{ subject: "Geography" }}
          csvData={csvData}
        />{" "}
        <DrawBarGraphFrequency
          subject={{ subject: "Civic Education" }}
          csvData={csvData}
        />{" "}
      </div>
    </div>
  );
}
