import { useMemo } from "react";
import { isToday } from "date-fns";
import type { Task } from "@/utils/getCounts";
import { useSelector } from "react-redux";
import { PlusIcon } from "lucide-react";
import Tasks from "./Tasks";
const UpcomingTasks = () => {
  const tasks = useSelector((store: any) => store?.user?.user?.tasks) ?? [];
  const upcomingTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      if (!isToday(task.dueDate)) {
        return task;
      } else {
        return null;
      }
    });
  }, [tasks]);

  return (
    <section className="mt-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-[1.2rem]">Upcoming</h1>
      </div>
      <Tasks tasks={upcomingTasks} />
    </section>
  );
};

export default UpcomingTasks;
