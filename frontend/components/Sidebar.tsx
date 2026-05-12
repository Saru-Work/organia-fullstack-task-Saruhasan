"use client";
import { useRouter } from "next/navigation";
import { BookCheck, Settings2Icon, HomeIcon } from "lucide-react";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const user = useSelector((store: any) => store.user.user);
  const router = useRouter();
  const navigations = [
    { title: "Dashboard", route: "/", Icon: HomeIcon },
    { title: "Tasks", route: "/tasks", Icon: BookCheck },
    { title: "Settings", route: "/settings", Icon: Settings2Icon },
  ];
  return (
    <aside className="bg-sidebar h-screen w-full p-5 rounded-r-[20px] border border-red-300">
      <div>
        <h1 className="text-xl px-2 font-bold text-text-primary">TaskForce</h1>
      </div>
      <ul>
        {navigations.map((nav, i) => {
          return (
            <li
              className={`py-1 px-2 text-sm mt-2 hover:bg-amber-300 rounded-md`}
              key={i}
              onClick={() => {
                router.push(nav.route);
              }}
            >
              {nav.title}
            </li>
          );
        })}
      </ul>
      <div className="absolute bottom-10 p-1 rounded-lg">
        <div className="text-sm font-bold">{user?.username}</div>
        <div className="text-sm">{user?.email}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
