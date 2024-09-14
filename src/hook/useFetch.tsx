import Papa from "papaparse";

type CallBack = (data: any) => void;

const useFetch = () => {
    const fetchCsvData = async (filePath: string, callBack: CallBack) => {
        const response = await fetch(filePath);
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder("utf-8");
        const csvString = decoder.decode(result?.value);
        const { data } = Papa.parse(csvString, {
            header: true,
            dynamicTyping: true,
        });
        callBack(data);
    };
    return fetchCsvData;
};

export default useFetch;
