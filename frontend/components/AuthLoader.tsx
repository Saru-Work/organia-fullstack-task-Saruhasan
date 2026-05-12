"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/userSlice";

const AuthLoader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/getMe`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();
      if (res.ok) {
        dispatch(setUser(json));
      }
      console.log(json);
    }
    fetchUser();
  }, []);
  return null;
};

export default AuthLoader;
