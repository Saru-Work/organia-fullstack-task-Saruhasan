import { count } from "console";

export type Task = {
  title: string;
  description: string;
  id: number;
  dueDate: string;
  status: string;
};

export const getCounts = (tasks: Task[]) => {
  const todo = tasks.filter((task) => {
    if (task.status === "TO_DO") {
      return task;
    } else {
      return null;
    }
  });
  const in_progress = tasks.filter((task) => {
    if (task.status === "IN_PROGRESS") {
      return task;
    } else {
      return null;
    }
  });
  const completed = tasks.filter((task) => {
    if (task.status === "COMPLETED") {
      return task;
    } else {
      return null;
    }
  });
  console.log(in_progress);
  return [
    { count: tasks.length, status: "All", fill: "#d4d7df", stroke: "#092382" },
    { count: todo.length, status: "To Do", fill: "#dcead9", stroke: "#358523" },
    {
      count: in_progress.length,
      status: "In Progress",
      fill: "#f2ecdf",
      stroke: "#e5b42e",
    },
    {
      count: completed.length,
      status: "Completed",
      fill: "#fce3e3",
      stroke: "#f11a13",
    },
  ];
};
