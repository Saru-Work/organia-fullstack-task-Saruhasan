import type { Task } from "@/utils/getCounts";
const ProgressCard = ({
  total,
  completed,
  title,
}: {
  total: Task[];
  completed: Task[];
  title: string;
}) => {
  return (
    <div className="p-5 bg-sidebar border border-sidebar-border rounded-lg w-full">
      <div className="text-[1.2rem] font-medium mb-2">{title}</div>
      <div className="w-full bg-[#DBD1D1] rounded-full">
        <div
          className="h-2 bg-text-primary rounded-full"
          style={{
            width: `${Math.floor((completed.length / total.length) * 100)}%`,
          }}
        ></div>
      </div>
      <div className="font-light">
        {completed.length + " of " + total.length + " tasks completed."}
      </div>
    </div>
  );
};

export default ProgressCard;
