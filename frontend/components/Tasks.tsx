import type { Task } from "@/utils/getCounts";
import TaskCard from "./TaskCard";

const Tasks = ({ tasks }: { tasks: Task[] }) => {
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

  function getRandomLightColor() {
    const randomIndex = Math.floor(Math.random() * lightColors.length);

    return lightColors[randomIndex];
  }
  return (
    <div>
      {tasks.map((task: Task, i: number) => {
        return <TaskCard color={getRandomLightColor()} key={i} task={task} />;
      })}
    </div>
  );
};

export default Tasks;
