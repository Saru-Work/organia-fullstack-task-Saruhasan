"use client";
import NewTaskForm from "@/components/NewTaskForm";
import Tasks from "@/components/Tasks";
import { useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const tasks = useSelector((store: any) => store?.user?.user?.tasks ?? []);
  const [newTaskFormOpen, setNewTaskFormOpen] = useState(false);
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
        >
          Add Task
        </button>
      </div>
      <Tasks tasks={tasks} />
    </div>
  );
};

export default page;
