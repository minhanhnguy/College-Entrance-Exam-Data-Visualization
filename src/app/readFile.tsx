import fs from "fs";
import Papa from "papaparse";

export default function readFile(): Promise<Array<Record<string, any>>> {
  const csvFilePath: string = "./public/CollegeEntranceExamData.csv"; // Ensure the path is correct

  return new Promise((resolve, reject) => {
    fs.readFile(csvFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject(err); // Reject the promise if there's an error
        return;
      }

      let csvData: Array<Record<string, any>> = [];

      // Parse the CSV data using Papa.parse
      Papa.parse(data, {
        header: true,
        step: (result: Papa.ParseResult<any>): void => {
          csvData.push(result.data);
        },
        complete: (): void => {
          console.log("Complete", csvData.length, "records.");
          resolve(csvData); // Resolve the promise with the parsed data
        },
        error: (error: any) => {
          console.error("Error parsing CSV:", error);
          reject(error); // Reject the promise if parsing fails
        },
      });
    });
  });
}
