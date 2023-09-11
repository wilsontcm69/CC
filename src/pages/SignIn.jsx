import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("dashboard");
          toast.success("Login Successful");
        }}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        To Dashboard
      </button>
    </>
  );
}
