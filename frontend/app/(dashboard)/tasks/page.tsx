"use client";

import NewTaskForm from "@/components/NewTaskForm";
import Tasks from "@/components/Tasks";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PlusIcon } from "lucide-react";

type FilterType = "ALL" | "TODAY" | "UPCOMING" | "DONE";

const Page = () => {
  const tasks = useSelector((store: any) => store?.user?.user?.tasks ?? []);

  const [newTaskFormOpen, setNewTaskFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter((task: any) => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      switch (filter) {
        case "TODAY":
          return taskDate.getTime() === today.getTime();

        case "UPCOMING":
          return taskDate > today;

        case "DONE":
          return task.status === "DONE";

        default:
          return true;
      }
    });
  }, [tasks, search, filter]);

  return (
    <div className="p-10">
      {newTaskFormOpen && (
        <NewTaskForm setNewTaskFormOpen={setNewTaskFormOpen} />
      )}

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium">Tasks</h1>

        <button
          onClick={() => {
            setNewTaskFormOpen(true);
          }}
          className="flex gap-2 bg-text-primary items-center rounded-lg px-3 py-2 text-white font-bold cursor-pointer hover:bg-orange-400"
        >
          <PlusIcon className="font-bold" size={20} />
          <div className="text-sm">Add Task</div>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start justify-between">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-2 border px-4 py-2 rounded-lg bg-sidebar placeholder:text-text-primary border-sidebar-border w-full"
        />

        <div className="flex-1 flex gap-2 flex-wrap bg-sidebar border border-sidebar-border rounded-lg justify-between">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-lg font-medium text-text-primary ${
              filter === "ALL"
                ? " bg-text-primary border border-sidebar-border text-white"
                : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("TODAY")}
            className={`px-4 py-2 rounded-lg font-medium text-text-primary  ${
              filter === "TODAY"
                ? " bg-text-primary border border-sidebar-border text-white"
                : ""
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("UPCOMING")}
            className={`px-4 py-2 h-full rounded-lg font-medium text-text-primary ${
              filter === "UPCOMING"
                ? "bg-text-primary  border border-sidebar-border text-white"
                : ""
            }`}
          >
            Upcoming
          </button>

          <button
            onClick={() => setFilter("DONE")}
            className={`px-4 py-2 rounded-lg font-medium text-text-primary ${
              filter === "DONE"
                ? "bg-text-primary border border-sidebar-border text-white"
                : ""
            }`}
          >
            Done
          </button>
        </div>
      </div>

      <Tasks tasks={filteredTasks} />
    </div>
  );
};

export default Page;
