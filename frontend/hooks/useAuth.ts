import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = (requrieAuth = true) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (requrieAuth && !token) {
      router.push("/login");
    } else if (!requrieAuth && token) {
      router.push("/");
    }
  }, [requrieAuth, router]);
};
