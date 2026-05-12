import React, { useState } from "react";
import type { Task } from "@/utils/getCounts";
import { SquarePen, Trash } from "lucide-react";
import UpdateTaskForm from "./UpdateTaskForm";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
const TaskCard = ({ task, color }: { task: Task; color: string }) => {
  const dispatch = useDispatch();
  const [updateTaskFormOpen, setUpdateTaskFormOpen] = useState(false);
  return (
    <>
      {updateTaskFormOpen && (
        <UpdateTaskForm
          existingTask={task}
          setUpdateTaskFormOpen={setUpdateTaskFormOpen}
        />
      )}
      <div className="flex items-center justify-between border border-text-primary my-1 px-5 py-1 rounded-lg relative">
        {new Date(task.dueDate) < new Date() && (
          <div className="absolute left-0 w-full h-[1px] bg-red-400"></div>
        )}
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
        <div
          style={{ backgroundColor: color }}
          className="text-sm w-25 text-center py-1 border border-black rounded-sm"
        >
          {task.category}
        </div>

        <div className="flex gap-2">
          <SquarePen
            onClick={() => {
              setUpdateTaskFormOpen(true);
            }}
            className="cursor-pointer"
            size={20}
          />
          <Trash
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/tasks/delete/${task.id}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  },
                );

                const user = await fetchUser();
                dispatch(setUser(user));
              } catch (err) {
                console.log(err);
              }
            }}
            className="cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </>
  );
};

export default TaskCard;
