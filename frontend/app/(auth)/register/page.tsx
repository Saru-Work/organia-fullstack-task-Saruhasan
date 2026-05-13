"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  email: string;
  password: string;
  username: string;
};
const register = () => {
  useAuth(false);
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const text = await res.text();
      if (!res.ok) {
        setSubmissionError(JSON.stringify(text));
        console.log("hi");
      } else {
        localStorage.setItem("token", text);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  return (
    <div className="relative flex items-center justify-center md:justify-end">
      <form
        className="bg-white min-w-6/7 md:min-w-3/7 sm:5/7 h-screen md:rounded-l-[80px] flex items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-10">
            <h1 className="text-4xl font-medium">Welcome Back!</h1>
            <p className="text-text-primary font-medium">
              Sign in to your taskforce workspace
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <input
                placeholder="Username"
                className="border border-gray-500 min-w-85 px-5 py-4 rounded-full"
                type="text"
                {...register("username")}
              />
            </div>
            <div>
              <input
                placeholder="Email"
                className="border border-gray-500 min-w-85 px-5 py-4 rounded-full"
                type="text"
                {...register("email")}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                className="border border-gray-500 min-w-85 px-5 py-4 rounded-full"
                type="text"
                {...register("password")}
              />
            </div>
            <p className="text-red-500 text-sm">{submissionError}</p>
            <button className="bg-text-primary text-white min-w-85 px-5 py-4 rounded-full font-medium cursor-pointer">
              Submit
            </button>
            <p className="text-sm font-medium text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default register;
