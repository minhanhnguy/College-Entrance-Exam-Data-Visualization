"use client";

import { useState, useEffect } from "react";
import DrawBarGraphFrequency from "./barGraphFrequencyDisplay";

type StudentData = { [key: string]: number };

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

  return (
    <div className="h-[1300px] flex justify-evenly items-center flex-wrap">
      <DrawBarGraphFrequency subject={{ subject: "Math" }} csvData={csvData} />{" "}
      <DrawBarGraphFrequency
        subject={{ subject: "Literature" }}
        csvData={csvData}
      />{" "}
      <DrawBarGraphFrequency
        subject={{ subject: "Foreign Language" }}
        csvData={csvData}
      />{" "}
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
  );
}
