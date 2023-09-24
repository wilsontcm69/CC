import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../images/TARUMT-Logo.png";
import { useUserRole } from "../UserRoleContext";


export default function StudentSignIn() {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const [email, setEmail] = useState("");
  const [ic, setIC] = useState("");

  // <--- EDIT HERE: READ STUDENT EMAIL & IC NUM --->
  const onSubmit = async () => {
    if (email === "" || ic === "") {
      toast.error("Please fill all the fields");
      return;
    }

    
    // Perform student ID and password validation here
    const data = {
      email: email,
      ic: ic
    };

    try {
      const response = await fetch("http://localhost:5000/login_student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (response.status === 200) {
        // Sign-in was successful, parse response data as JSON
        const responseData = await response.json();
    
        // Store student data in session storage
        sessionStorage.setItem("studentId", responseData.id);
        sessionStorage.setItem("studentEmail", responseData.email);
        sessionStorage.setItem("studentName", responseData.first_name + " " + responseData.last_name);
        sessionStorage.setItem("studentIc", responseData.ic_no);
        sessionStorage.setItem("cohort", responseData.cohort);
        sessionStorage.setItem("intern_start", responseData.intern_start);
        sessionStorage.setItem("intern_end", responseData.intern_end);
        sessionStorage.setItem("supervisor_assigned", responseData.supervisor_assigned);
        sessionStorage.setItem("status", responseData.remarks);
    
        // Navigate to the "/StudentHome" page
        navigate("/StudentHome");
    
        // Display a success toast message
        toast.success("Login Successful");
      } else if (response.status === 401) {
        // Invalid student ID or password
        toast.error("Invalid Student Email or IC");
      } else {
        // Handle other errors
        toast.error("An error occurred while signing in.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      toast.error("An error occurred while signing in.");
    }

  };

  // <--- EDIT HERE: READ STUDENT EMAIL & IC NUM --->
  useEffect(() => {}, []);

  // <--- Validate User Role --->
  useEffect(() => {
    if (userRole !== "Student") {
      toast.error("You are not authorized to view this page");
      navigate("/");
    }
  }, []);

  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <button
          onClick={() => {
            navigate("/");
          }}
          class="absolute mt-10 ml-10 transition duration-300 ease-in-out hover:scale-110 hover:text-gray-900 dark:hover:text-gray-200 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-10 h-10 mr-2" src={Logo} alt="logo" />
            Student Internship Portal
          </div>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 shadow rounded-lg">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div class="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="limjj-wp19@student.tarc.edu.my"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    IC Number
                  </label>
                  <input
                    type="password"
                    name="ic"
                    id="ic"
                    placeholder="001223144890"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setIC(e.target.value);
                    }}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <a
                    href="https://www.tarc.edu.my/account_help.jsp"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={() => {
                    onSubmit();
                  }}
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
