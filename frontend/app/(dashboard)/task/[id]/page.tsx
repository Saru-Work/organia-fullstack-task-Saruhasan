"use client";
import type { Task } from "@/utils/getCounts";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import CreateNote from "@/components/CreateNote";
const page = () => {
  const lightColors = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
    "#E3BAFF",
    "#FFD6E0",
    "#D6FFD6",
    "#FFF5BA",
    "#D6E4FF",
  ];

  const backgroundColor = useMemo(() => {
    return lightColors[Math.ceil(Math.random() * lightColors.length)];
  }, []);

  const params: { id: string } = useParams();
  const tasks = useSelector((store: any) => store?.user?.user?.tasks ?? []);
  const task = tasks.find((task: Task) => String(task.id) === params.id);
  return (
    <div
      className="p-10 h-screen"
      style={{
        backgroundColor,
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">{task?.title}</h1>
          <p>{task?.description}</p>
        </div>
        <h2>{task?.dueDate}</h2>
      </div>
      <CreateNote task={task} />
    </div>
  );
};

export default page;
