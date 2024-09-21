"use client";

import { useState, useEffect } from "react";
import DrawBarGraphFrequency from "./barGraphFrequencyDisplay";
import PieChartSocialAndNaturalScience from "./pieChartSocialAndNaturalScience";
import DrawMap from "./drawMap";

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
    <div>
      <h1>Vietnam's National College Entrance Vietnam</h1>
      <DrawMap></DrawMap>
      <PieChartSocialAndNaturalScience
        naturalScienceStudent={numberOfNaturalScienceStudent}
        socialScienceStudent={numberOfSocialScienceStudent}
      />
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
