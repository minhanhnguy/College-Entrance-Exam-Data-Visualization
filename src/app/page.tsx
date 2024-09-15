import DrawBarGraphFrequency from "./barGraphFrequencyDisplay";

export default function Home() {
  return (
    <div className="flex justify-evenly items-center h-screen">
      <DrawBarGraphFrequency />
      <DrawBarGraphFrequency />
      <DrawBarGraphFrequency />
    </div>
  );
}
