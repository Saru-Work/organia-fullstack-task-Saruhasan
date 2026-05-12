"use client";
import { fetchUser } from "@/utils/fetchUser";
import type { Task } from "@/utils/getCounts";
import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
const UpdateTaskForm = ({
  setUpdateTaskFormOpen,
  existingTask,
}: {
  setUpdateTaskFormOpen: Dispatch<SetStateAction<boolean>>;
  existingTask: Task;
}) => {
  const options = [
    "work",
    "health",
    "learning",
    "creative",
    "personal",
    "finance",
  ];
  const dispatch = useDispatch();
  const statuses = ["TO_DO", "IN_PROGRESS", "COMPLETED"];
  type Input = {
    title: string;
    description: string;
    dueDate: Date;
    time?: string;
    category: string;
    status: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/update/${existingTask.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      setUpdateTaskFormOpen(false);

      console.log(data);
      const user = await fetchUser();
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black/20 z-10 flex items-center justify-center"
      onClick={(e) => {
        setUpdateTaskFormOpen(false);
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-[50%] bg-form-background/50 backdrop-blur-xs rounded-lg shadow-2xl"
      >
        <div className="h-14 w-full bg-form-header-background/70 rounded-t-lg flex gap-3 items-center px-5 text-sm">
          <PlusCircleIcon size={18} />
          <h2>Add Task</h2>
        </div>

        <div className="py-5 px-10">
          <div className="mb-5">
            <label className="block font-medium text-sm mb-2">
              Task Title*
            </label>
            <input
              placeholder="What need to be done?"
              className="bg-white p-4 w-full rounded-lg"
              type="text"
              defaultValue={existingTask?.title}
              {...register("title")}
            />
          </div>
          <div className="mb-5">
            <label className="block font-medium text-sm mb-2">
              Description
            </label>
            <input
              placeholder="Add more details..."
              className="bg-white p-4 w-full rounded-lg"
              type="text"
              defaultValue={existingTask.description}
              {...register("description")}
            />
          </div>

          <div className="flex w-full gap-10 mb-5">
            <div className="flex-1">
              <div>
                <label className="block font-medium text-sm mb-2">
                  Due Date
                </label>
                <input
                  placeholder="What need to be done?"
                  className="bg-white p-4 w-full rounded-lg "
                  type="date"
                  defaultValue={existingTask.dueDate}
                  {...register("dueDate")}
                />
              </div>
            </div>
            <div className="flex-1">
              <div>
                <label className="block font-medium text-sm mb-2">
                  Time(Optional)
                </label>
                <input
                  placeholder="What need to be done?"
                  className="bg-white p-4 w-full rounded-lg"
                  type="time"
                  defaultValue={existingTask.time}
                  {...register("time")}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full gap-10 mb-5">
            <div className="flex-1 w-full">
              <div>
                <label className="block font-medium text-sm mb-2">
                  Category
                </label>
                <select
                  defaultValue={existingTask.category}
                  {...register("category")}
                  className="bg-white p-4 w-full rounded-lg"
                >
                  {options.map((option, i) => {
                    return (
                      <option key={i} value={option}>
                        {option.toUpperCase()}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block font-medium text-sm mb-2">Status</label>
                <select
                  defaultValue={existingTask.status}
                  {...register("status")}
                  className="bg-white p-4 w-full rounded-lg"
                >
                  {statuses.map((status, i) => {
                    return (
                      <option key={i} value={status}>
                        {status.toUpperCase()}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 flex gap-2 justify-end px-10">
          <button
            onClick={() => {
              setUpdateTaskFormOpen(false);
            }}
            className="py-2 px-5 rounded-lg text-sm font-medium border border-gray-700 text-gray-700"
          >
            Cancel
          </button>
          <button className="py-2 px-5 bg-text-primary rounded-lg text-sm font-medium text-white">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
