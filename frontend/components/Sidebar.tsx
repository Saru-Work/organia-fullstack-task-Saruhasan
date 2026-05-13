"use client";
import { usePathname, useRouter } from "next/navigation";
import { BookCheck, Settings2Icon, HomeIcon, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";
const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const user = useSelector((store: any) => store.user.user);
  const router = useRouter();
  const navigations = [
    { title: "Dashboard", route: "/", Icon: HomeIcon },
    { title: "Tasks", route: "/tasks", Icon: BookCheck },
    { title: "Settings", route: "/settings", Icon: Settings2Icon },
  ];
  const pathname = usePathname();
  return (
    <aside
      style={{ width: isOpen ? "full" : "" }}
      className={`bg-sidebar z-20 fixed sm:static p-5 h-screen w-full rounded-r-0 border border-red-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 md:p-5 md:rounded-r-[20px] p-0`}
    >
      <div>
        <h1 className="text-3xl px-2 font-bold text-red-600">
          <Link href="/">TaskForce</Link>
        </h1>
      </div>
      <ul>
        {navigations.map((nav, i) => {
          return (
            <li
              style={{
                backgroundColor: pathname === nav.route ? "#F16F13" : "",
                color: pathname === nav.route ? "white" : "#F16F13",
              }}
              className={`py-2 px-2 text-sm mt-2 hover:bg-text-primary/70 hover:text-white rounded-md font-medium text-text-primary cursor-pointer`}
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
      <div className="absolute bottom-10 p-1 rounded-lg flex items-center justify-between gap-10">
        <div>
          <div className="text-sm font-bold">{user?.username}</div>
          <div className="text-sm">{user?.email}</div>
        </div>
        <LogOut
          onClick={() => {
            localStorage.setItem("token", "");
            router.push("/login");
          }}
          className="cursor-pointer hover:text-red-700 transition-all"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
