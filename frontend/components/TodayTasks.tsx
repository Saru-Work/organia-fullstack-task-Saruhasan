"use client";
import { Dispatch, SetStateAction, useMemo } from "react";
import { PlusIcon } from "lucide-react";
import Tasks from "./Tasks";
import { useSelector } from "react-redux";
import { isToday } from "date-fns";
import type { Task } from "@/utils/getCounts";
const TodayTasks = ({
  setNewTaskFormOpen,
}: {
  setNewTaskFormOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const tasks = useSelector((store: any) => store?.user?.user?.tasks) ?? [];
  const todayTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      if (isToday(task.dueDate)) {
        return task;
      } else {
        return null;
      }
    });
  }, [tasks]);

  return (
    <section className="mt-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-[1.2rem]">Today</h1>
        <button
          onClick={() => {
            setNewTaskFormOpen(true);
          }}
          className="flex gap-2 bg-text-primary items-center rounded-md px-3 py-2 text-white font-medium cursor-pointer hover:bg-orange-400"
        >
          <PlusIcon className="font-bold" size={18} />
          <div className="text-sm">Add Task</div>
        </button>
      </div>
      <Tasks tasks={todayTasks} />
    </section>
  );
};

export default TodayTasks;
