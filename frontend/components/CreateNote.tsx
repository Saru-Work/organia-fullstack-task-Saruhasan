"use client";
import { setUser } from "@/store/userSlice";
import { fetchUser } from "@/utils/fetchUser";
import type { Task } from "@/utils/getCounts";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const CreateNote = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const [note, setNote] = useState(task?.notes || "");

  useEffect(() => {
    setNote(task?.notes || "");
  }, [task?.notes]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isCreating && task?.id) {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}/notes`,
          {
            method: "PATCH",
            body: JSON.stringify({ notes: note }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (res.ok) {
          const userData = await fetchUser();
          dispatch(setUser(userData));
          setIsCreating(false);
        } else if (res.status === 403) {
          console.error(
            "403 Forbidden: Check if your token is valid or if you own this task.",
          );
        }
      } catch (err) {
        console.error("Failed to update note:", err);
      }
    } else {
      setIsCreating(true);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-14 flex flex-col gap-3">
      <textarea
        value={note}
        placeholder="Write your thoughts here..."
        onFocus={() => setIsCreating(true)}
        onChange={(e) => setNote(e.target.value)}
        className="w-full bg-gray-100 h-64 rounded-lg p-5 focus:ring-2 focus:ring-text-primary outline-none transition-all"
      ></textarea>

      <button
        type="submit"
        className="bg-text-primary text-sm px-5 py-2 rounded-md text-white font-medium self-end hover:opacity-90"
      >
        {isCreating ? "Save Note" : "Edit Note"}
      </button>
    </form>
  );
};

export default CreateNote;
