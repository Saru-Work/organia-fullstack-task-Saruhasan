import { PlusCircleIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { setUser } from "@/store/userSlice";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch } from "react-redux";
const NewTaskForm = ({
  setNewTaskFormOpen,
}: {
  setNewTaskFormOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const options = [
    "work",
    "health",
    "learning",
    "creative",
    "personal",
    "finance",
  ];
  type Input = {
    title: string;
    description: string;
    dueDate: Date;
    time?: string;
    category: string;
    status: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, status: "TO_DO" }),
      });
      const user = await fetchUser();
      dispatch(setUser(user));
      setNewTaskFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="absolute inset-0 h-screen w-screen bg-black/20 z-10 flex items-center justify-center"
      onClick={(e) => {
        setNewTaskFormOpen(false);
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-[50%] bg-form-background/50 backdrop-blur-xs rounded-lg shadow-2xl"
      >
        <div className="h-14 w-full bg-form-header-background/70 rounded-t-lg flex gap-3 items-center px-5 text-sm">
          <PlusCircleIcon size={18} />
          <h2>Add Task</h2>
        </div>

        <div className="py-5 px-10">
          <div className="mb-5">
            <label className="block font-medium text-sm mb-2">
              Task Title*
            </label>
            <input
              placeholder="What need to be done?"
              className="bg-white p-4 w-full rounded-lg"
              type="text"
              {...register("title")}
            />
          </div>
          <div className="mb-5">
            <label className="block font-medium text-sm mb-2">
              Description
            </label>
            <input
              placeholder="Add more details..."
              className="bg-white p-4 w-full rounded-lg"
              type="text"
              {...register("description")}
            />
          </div>

          <div className="flex w-full gap-10 mb-5">
            <div className="flex-1">
              <div>
                <label className="block font-medium text-sm mb-2">
                  Due Date
                </label>
                <input
                  placeholder="What need to be done?"
                  className="bg-white p-4 w-full rounded-lg "
                  type="date"
                  {...register("dueDate")}
                />
              </div>
            </div>
            <div className="flex-1">
              <div>
                <label className="block font-medium text-sm mb-2">
                  Time(Optional)
                </label>
                <input
                  placeholder="What need to be done?"
                  className="bg-white p-4 w-full rounded-lg"
                  type="time"
                  {...register("time")}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full gap-10 mb-5">
            <div className="flex-1 w-full">
              <div>
                <label className="block font-medium text-sm mb-2">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="bg-white p-4 w-full rounded-lg"
                >
                  {options.map((option, i) => {
                    return (
                      <option key={i} value={option}>
                        {option.toUpperCase()}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 flex gap-2 justify-end px-10">
          <button
            onClick={() => {
              setNewTaskFormOpen(false);
            }}
            className="py-2 px-5 rounded-lg text-sm font-medium border border-gray-700 text-gray-700"
          >
            Cancel
          </button>
          <button className="py-2 px-5 bg-text-primary rounded-lg text-sm font-medium text-white">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTaskForm;
