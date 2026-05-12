"use client";
import Tasks from "@/components/Tasks";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const tasks = useSelector((store: any) => store?.user?.user?.tasks ?? []);
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-5 font-medium">Tasks</h1>
      <Tasks tasks={tasks} />
    </div>
  );
};

export default page;
