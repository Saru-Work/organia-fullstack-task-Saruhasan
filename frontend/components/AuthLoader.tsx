"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/getMe`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const text = await res.text();
        const json = text ? JSON.parse(text) : null;

        if (res.ok && json) {
          dispatch(setUser(json));
        }

        console.log(json);
      } catch (err) {
        console.log("AuthLoader error:", err);
      }
    }

    fetchUser();
  }, []);

  return null;
};

export default AuthLoader;
