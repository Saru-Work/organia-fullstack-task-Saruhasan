"use client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { getGreeting } from "@/utils/getGreeting";
import { useSelector } from "react-redux";
import TaskAnalytics from "@/components/TaskAnalytics";
import TodayTasks from "@/components/TodayTasks";
import UpcomingTasks from "@/components/UpcomingTasks";
import NewTaskForm from "@/components/NewTaskForm";
import { useState } from "react";

export default function Home() {
  useAuth(true);
  const username = useSelector((store: any) => store?.user?.user?.username);
  const today = new Date();
  const [newTaskFormOpen, setNewTaskFormOpen] = useState(false);
  return (
    <div className="p-5">
      {newTaskFormOpen && (
        <NewTaskForm setNewTaskFormOpen={setNewTaskFormOpen} />
      )}
      <section>
        <div>{format(today, "EEEE, MMMM d")}</div>
        <h1 className="text-2xl font-bold">
          {username ? (
            <div>
              {getGreeting()}{" "}
              <span className="text-text-primary">{username}</span>
            </div>
          ) : (
            <div>{getGreeting()}</div>
          )}
        </h1>
      </section>
      <TaskAnalytics />
      <TodayTasks setNewTaskFormOpen={setNewTaskFormOpen} />
      <UpcomingTasks />
    </div>
  );
}
