"use client";
import { useState } from "react";
import type { Task } from "@/utils/getCounts";
import { SquarePen, Trash } from "lucide-react";
import UpdateTaskForm from "./UpdateTaskForm";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import DeleteModal from "./DeleteModal";

const TaskCard = ({ task, color }: { task: Task; color: string }) => {
  const dispatch = useDispatch();
  const [updateTaskFormOpen, setUpdateTaskFormOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (res.ok) {
        const user = await fetchUser();
        dispatch(setUser(user));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {updateTaskFormOpen && (
        <UpdateTaskForm
          existingTask={task}
          setUpdateTaskFormOpen={setUpdateTaskFormOpen}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          isDeleting={isDeleting}
          setOpenDeleteModal={setOpenDeleteModal}
          setIsDeleting={setIsDeleting}
          id={task.id}
        />
      )}
      <div
        className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-text-primary my-1 px-5 py-3 rounded-lg relative ${isUpdating ? "opacity-50" : "opacity-100"}`}
      >
        <div
          className="w-2 h-full absolute left-0 top-0 overflow-hidden rounded-l-md"
          style={{ backgroundColor: color, borderColor: color }}
        ></div>

        <div className="flex gap-4 items-center sm:min-w-[250px]">
          <input
            type="checkbox"
            className="rounded-full cursor-pointer"
            checked={task.status === "COMPLETED"}
            onChange={(e) =>
              handleStatusChange(e.target.checked ? "COMPLETED" : "IN_PROGRESS")
            }
          />

          <div>
            <div
              className={`truncate ${task.status === "COMPLETED" || isDeleting ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </div>
            <div className="text-[0.7rem] text-gray-400">{task.dueDate}</div>
          </div>
        </div>

        <select
          value={task.status}
          disabled={isUpdating}
          onChange={(e) => handleStatusChange(e.target.value)}
          style={{
            backgroundColor: color,
            borderColor: `#B${color.slice(2)}`,
          }}
          className="text-sm w-full md:w-32 text-center py-1 border rounded-sm cursor-pointer outline-none appearance-none font-medium"
        >
          <option value="TO_DO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <div className="flex gap-4 sm:gap-2 justify-end">
          <SquarePen
            onClick={() => setUpdateTaskFormOpen(true)}
            className="cursor-pointer hover:text-blue-500 transition-all"
            size={20}
          />

          <Trash
            onClick={() => {
              setOpenDeleteModal(true);
            }}
            className="cursor-pointer hover:text-red-500 transition-colors"
            size={20}
          />
        </div>
      </div>
    </>
  );
};

export default TaskCard;
