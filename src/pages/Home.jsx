import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/TARUMT-Logo.png";
import Admin from "../images/Admin.png";
import Supervisor from "../images/Supervisor.png";
import Student from "../images/Student.png";
import Company from "../images/Company.png";
import ThemeToggle from "../components/ThemeToggle";
import Help from '../components/DropdownHelp';

export default function Home() {
  const navigate = useNavigate();
  const [server, setServer] = useState(false);

  useEffect(() => {
    // Make a GET request to retrieve company data
    fetch(
      "http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/get_companies",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved company data in your state
        if(data.error === undefined) {
          setServer(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
            <div className="flex items-center space-x-3">
              <Help align="right" />
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
            <a
              class="text-center text-gray-500 dark:text-gray-400 transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
              href="https://itp.tarc.edu.my/"
            >
              <img class="mx-auto mb-4 w-52 h-52" src={Company} alt="Company" />
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Find Company
              </h3>
            </a>
          </div>
          <div class="absolute bottom-0 right-0 mr-10 mb-10">
              <p>Server Status: {(server) ? (
                "Online"
              ) : (
                "Offline"
              )}</p>
          </div>
        </div>
      </section>
    </>
  );
}
