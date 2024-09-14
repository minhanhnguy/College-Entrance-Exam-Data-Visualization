"use client";
import { useState, useEffect } from "react";
import useFetch from "@/hook/useFetch";

const [data, setData] = useState<any[]>([]);
const fetchCsvData = useFetch();

useEffect(() => {
  fetchCsvData("./public/CollegeEntranceExamData.csv", setData);
}, []);

console.log(data);

export default data;
