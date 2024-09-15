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
        // Fetch the CSV data from the API route
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
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-evenly items-center">
      <DrawBarGraphFrequency subject={{ subject: "Math" }} csvData={csvData} />
    </div>
  );
}
