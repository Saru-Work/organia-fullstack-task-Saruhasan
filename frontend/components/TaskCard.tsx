import React from "react";
import type { Task } from "@/utils/getCounts";
import { SquarePen, Trash } from "lucide-react";
const TaskCard = ({ task, color }: { task: Task; color: string }) => {
  return (
    <div className="flex items-center justify-between border border-text-primary my-1 px-5 py-1 rounded-lg relative">
      <div
        className="w-2 h-full absolute left-0 top-0 overflow-hidden rounded-l-md"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex gap-4 items-center min-w-100">
        <input type="checkbox" className="rounded-full" />
        <div className="min-">
          <div className="max-w-65">{task.title}</div>
          <div className="text-[0.7rem]">{task.dueDate}</div>
        </div>
      </div>
      <div className="text-sm px-4 py-1 border border-black rounded-sm">
        Category
      </div>

      <div className="flex gap-2">
        <SquarePen className="cursor-pointer" size={20} />
        <Trash className="cursor-pointer" size={20} />
      </div>
    </div>
  );
};

export default TaskCard;
