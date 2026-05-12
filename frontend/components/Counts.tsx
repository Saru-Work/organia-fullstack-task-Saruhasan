import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCounts } from "@/utils/getCounts";
import CountCard from "./CountCard";

const Counts = () => {
  const tasks = useSelector((store: any) => store?.user?.user?.tasks);
  const [counts, setCounts] = useState(getCounts(tasks || []));
  useEffect(() => {
    setCounts(getCounts(tasks || []));
  }, [tasks]);
  console.log(tasks);
  if (!tasks) return null;

  return (
    <div className="flex gap-2 mt-10">
      {counts.map((count, i) => {
        return <CountCard data={count} key={i} />;
      })}
    </div>
  );
};

export default Counts;
