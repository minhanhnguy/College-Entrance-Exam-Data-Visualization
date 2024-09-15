import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const csvFilePath = path.join(process.cwd(), "public", "CollegeEntranceExamData.csv");

  try {
    const fileData = fs.readFileSync(csvFilePath, "utf8");

    let csvData: Array<Record<string, any>> = [];

    Papa.parse(fileData, {
      header: true,
      step: (result: Papa.ParseResult<any>) => {
        csvData.push(result.data);
      },
      complete: () => {
        res.status(200).json(csvData);
      },
      error: (error:any) => {
        console.error("Error parsing CSV:", error);
        res.status(500).json({ error: "Failed to parse CSV" });
      },
    });
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).json({ error: "Failed to read file" });
  }
}

export const config = {
    api: {
      responseLimit: false,
    },
  }