import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { fetchUser } from "@/utils/fetchUser";
const DeleteModal = ({
  setOpenDeleteModal,
  setIsDeleting,
  id,
  isDeleting,
}: {
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  id: number;
  isDeleting: boolean;
}) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        setOpenDeleteModal(false);
      }}
      className="w-screen h-screen fixed inset-0 bg-black/30 flex items-center justify-center z-10"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-form-background/50 rounded-xl backdrop-blur-xs p-5 w-max"
      >
        <h1 className="text-md">Are you sure? you want to delete</h1>
        <div className="flex items-center gap-2 mt-10 justify-end">
          <button
            className="px-3 py-1 border text-sm border-gray-700 text-gray-700 font-medium rounded-md"
            onClick={() => {
              setOpenDeleteModal(false);
            }}
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            className="px-3 py-1 bg-text-primary text-sm text-white font-medium rounded-md"
            onClick={async () => {
              try {
                setIsDeleting(true);
                const token = localStorage.getItem("token");
                setIsDeleting(true);
                await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/tasks/delete/${id}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                const user = await fetchUser();
                dispatch(setUser(user));
                setIsDeleting(false);
                setOpenDeleteModal(false);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
