import React from "react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { isToday } from "date-fns";
import ProgressCard from "./ProgressCard";
const Progress = () => {
  const tasks = useSelector((store: any) => store?.user?.user?.tasks) ?? [];
  const todayTasks = useMemo(() => {
    return tasks.filter((task: any) => {
      if (isToday(task.dueDate)) {
        console.log(task.dueDate);
        return task;
      } else {
        return null;
      }
    });
  }, [tasks]);
  const completedToday = useMemo(() => {
    return todayTasks.filter((task: any) => {
      if (task.status === "COMPLETED") {
        return task;
      } else {
        return null;
      }
    });
  }, [todayTasks]);

  const completedTasks = useMemo(() => {
    return tasks.filter((task: any) => {
      if (task.status === "COMPLETED") {
        return task;
      } else {
        return null;
      }
    });
  }, [tasks]);
  return (
    <div className="flex gap-2 w-full mt-8">
      <ProgressCard
        title="Today's Progress"
        total={todayTasks}
        completed={completedToday}
      />
      <ProgressCard
        title="Overall Completion"
        total={tasks}
        completed={completedTasks}
      />
    </div>
  );
};

export default Progress;
