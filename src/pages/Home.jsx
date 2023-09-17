import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/TARUMT-Logo.png";
import Admin from "../images/Admin.png";
import Supervisor from "../images/Supervisor.png";
import Student from "../images/Student.png";
import Company from "../images/Company.png";
import ThemeToggle from "../components/ThemeToggle";
import toast from "react-hot-toast";
import { useUserRole, useUserRoleUpdate } from "../UserRoleContext";

export default function Home() {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const setForUserRole = useUserRoleUpdate();

  useEffect(() => {
    console.log("userRole: ", userRole);
  }, [userRole]);

  return (
    <>
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="flex items-center">
              <img src={Logo} class="mr-3 h-6 sm:h-9" alt="Logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
                TARUMT Internship Portal
              </span>
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
      <section class=" dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-200">
              Welcome to the Portal
            </h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Select your role based on the element below
            </p>
          </div>
          <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <button
              class="text-center text-gray-500 dark:text-gray-400 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => {
                navigate("AdminSignIn");
                setForUserRole("Admin");
              }}
            >
              <img class="mx-auto mb-4 w-52 h-52" src={Admin} alt="Admin" />
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Admin
              </h3>
            </button>
            <button
              class="text-center text-gray-500 dark:text-gray-400 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => {
                navigate("SupervisorSignIn");
                setForUserRole("Supervisor");
              }}
            >
              <img
                class="mx-auto mb-4 w-52 h-52"
                src={Supervisor}
                alt="Supervisor"
              />
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Supervisor
              </h3>
            </button>
            <button
              class="text-center text-gray-500 dark:text-gray-400 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => {
                navigate("StudentSignIn");
                setForUserRole("Student");
              }}
            >
              <img class="mx-auto mb-4 w-52 h-52" src={Student} alt="Student" />
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Student
              </h3>
            </button>
            <button
              class="text-center text-gray-500 dark:text-gray-400 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => {
                navigate("CompanySignIn");
                setForUserRole("Company");
              }}
            >
              <img class="mx-auto mb-4 w-52 h-52" src={Company} alt="Company" />
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Company
              </h3>
            </button>
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {navigate("Dashboard");}}
          >
            Dashboard
          </button>
          <button
            type="button"
            class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {navigate("/SupervisorHome");}}
          >
            Supervisor Home
          </button>
          <button
            type="button"
            class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {navigate("/StudentHome");}}
          >
            Student Home
          </button>
        </div>
      </section>
    </>
  );
}
