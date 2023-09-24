import React, { useEffect, useState } from "react";
import { useUserRole, useUserRoleUpdate } from "../UserRoleContext";
import { useNavigate } from "react-router-dom";
import Logo from "../images/TARUMT-Logo.png";
import ThemeToggle from "../components/ThemeToggle";
import Help from "../components/DropdownHelp";
import toast from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "ID",
  "Name",
  "Email",
  "IC",
  "Cohort",
  "Intern Duration",
  "Supervisor Assigned",
  "Status",
  "Evaluate",
];

const ROWS_PER_PAGE = 7; // Number of rows per page

export default function SupervisorHome() {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const setForUserRole = useUserRoleUpdate();
  const [currentPage, setCurrentPage] = useState(1);
   // Retrieve student email from sessionStorage
   const session_supervisorId = sessionStorage.getItem("supervisorId");

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const [students, setStudents] = useState([]);

  // Slice the data to display only the rows for the current page
  const rowsToDisplay = students.slice(startIndex, endIndex);

  const totalPages = Math.ceil(students.length / ROWS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ---------- Get all Students Data ----------
  useEffect(() => {
    // Make a GET request to retrieve students data
    fetch("http://localhost:5000/get_students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved student data in your state
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  // ---------- Get all Students Data ----------

  return (
    <>
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md">
          <div class="flex flex-wrap sm:items-center sm:justify-between p-4 sm:p-6 xl:px-28 xl:py-2">
            <div class="flex items-center">
              <img src={Logo} class="mr-3 h-6 sm:h-9" alt="Logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
                TARUMT Internship Portal
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Help align="right" />
              <ThemeToggle />
              <button
                onClick={() => {
                  setForUserRole("");
                  navigate("/");
                  toast.success("You have successfully logged out!");
                }}
                className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
                data-popover-target="popover-description"
                data-popover-placement="bottom-end"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
              <div
                data-popover
                id="popover-description"
                role="tooltip"
                class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
              >
                <h3>Logout</h3>
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main class="p-4 h-auto sm:p-4 xl:px-28 xl:py-6">

      {/* Welcome Banner */}
      <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-2">
          {/* Background illustration */}
          <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
            <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                  <stop stopColor="#A5B4FC" offset="0%" />
                  <stop stopColor="#818CF8" offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                  <stop stopColor="#4338CA" offset="0%" />
                  <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="rotate(64 36.592 105.604)">
                  <mask id="welcome-d" fill="#fff">
                    <use xlinkHref="#welcome-a" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
                </g>
                <g transform="rotate(-51 91.324 -105.372)">
                  <mask id="welcome-f" fill="#fff">
                    <use xlinkHref="#welcome-e" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
                </g>
                <g transform="rotate(44 61.546 392.623)">
                  <mask id="welcome-h" fill="#fff">
                    <use xlinkHref="#welcome-g" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
                </g>
              </g>
            </svg>
          </div>

          {/* Content */}
          <div className="relative">
            <h1 className="text-4xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">Welcome, Staff {session_supervisorId}. 👋</h1>
            <p className="dark:text-indigo-200">A journey of a thousand miles begins with a single step.</p>
          </div>
        </div>
        
      </main>

      <section className="sm:flex sm:items-center sm:justify-between p-2 sm:p-4 xl:px-28 xl:py-4">
        
      {students.length === 0 ? (
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <Card className="h-full w-full">
          {/* ... other parts of your component ... */}
          <form
            action="/edit_student"
            autoComplete="on"
            method="POST"
            enctype="multipart/form-data"
          >

          <CardBody className="overflow-x-auto px-0 bg-white text-black dark:bg-gray-800 dark:text-white rounded-t-lg">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                {/* ... table header ... */}
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                  {rowsToDisplay.map((student) => (
                    <tr key={student.id}>
                      {/* Student ID */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {student.id}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      {/* Student Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {student.first_name +
                                " " +
                                student.last_name}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {student.email}
                          </Typography>
                        </div>
                      </td>

                      {/* IC No */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {student.ic_no}
                          </Typography>
                        </div>
                      </td>

                      {/* Cohort */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {student.cohort}
                          </Typography>
                        </div>
                      </td>

                      {/* Intern Period*/}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {student.intern_start +
                                " - " +
                                student.intern_end}
                          </Typography>
                        </div>
                      </td>

                      {/* Supervisor Assigned */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {student.supervisor_assigned}
                          </Typography>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {/* {major} */}
                            {student.remarks == 1 ? 'Pending' : student.remarks == 2 ? 'Evaluation' : student.remarks == 3 ? 'Approved' : student.remarks == 4 ? 'Progress Check': '-'}
                          </Typography>
                        </div>
                      </td>

                      {/* Edit Button */}
                      <td className="p-4">
                        <Tooltip content="Edit User">
                          <button
                            className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              navigate(`${student.id}`);
                            }}
                          >
                            Click to Edit
                          </button>
                        </Tooltip>
                      </td>

                    </tr>
                  ))}
                </tbody>

            </table>
          </CardBody>

          </form>

          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 bg-white text-black dark:bg-gray-800 dark:text-white rounded-b-lg">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={handlePreviousPage}
                className="dark:text-white dark:border-white hover:opacity-60 transition duration-300 ease-in-out"
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={handleNextPage}
                className="dark:text-white dark:border-white hover:opacity-60 transition duration-300 ease-in-out"
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      
      </section>

      {/* Quick Links */}
      <section>
        <div class="w-full p-2 sm:p-4 xl:px-28 xl:py-4">
          <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Quick Links
          </h2>

          <div class="block w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">
            <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Facing Problem?
            </h5>
            <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
              <li class="flex space-x-2 items-center">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 18"
                >
                  <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>

                <p class="leading-tight">
                  <a
                    href="mailto:gohks.tarc.edu.my"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Mr Harry Goh
                  </a>
                  <span className="text-sm"> (gohks.tarc.edu.my)</span>, or{" "}
                  <a
                    href="mailto:kanimolij@tarc.edu.my"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Ms Kanimoli d/o Jeevanantham
                  </a>
                  <span className="text-sm"> (kanimolij@tarc.edu.my)</span>
                </p>
              </li>
              <li class="flex space-x-2 items-center">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 18"
                >
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
                <p class="leading-tight">
                  Tel No:
                  <a
                    href="tel:0341450123"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {" "}
                    03-4145 0123
                  </a>
                  , Fax No:
                  <a
                    href="tel:0341423166"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {" "}
                    03-4142 3166
                  </a>
                </p>
              </li>
              <li class="flex space-x-2 items-center">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14v4m-4 1h8M1 10h18M2 1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                  />
                </svg>

                <p class="leading-tight">
                  <a
                    href="https://www.tarc.edu.my/dsa/a/student-career-development-center/contact-information/"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Help Center
                  </a>
                </p>
              </li>
            </ul>
          </div>

          <div class="block w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Quick Direct
            </h5>
            <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
              <li class="flex space-x-2 items-center">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14v4m-4 1h8M1 10h18M2 1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                  />
                </svg>
                <a
                  href="https://portal.tarc.edu.my/portal/login.jsp"
                  className="text-blue-600 dark:text-blue-500 hover:underline leading-tight"
                >
                  Staff Intranet
                </a>
              </li>
              <li class="flex space-x-2 items-center">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"
                  />
                </svg>
                <a
                  href="https://mail.google.com/mail/u/0/"
                  className="text-blue-600 dark:text-blue-500 hover:underline leading-tight"
                >
                  Gmail
                </a>
              </li>
              <li class="flex space-x-2 items-center">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .707 9 1.706M10 16.5V3.506M10 16.5c0-1 8-2.7 9-2V1.8c-1-1-9 .707-9 1.706"
                  />
                </svg>
                <a
                  href="https://classroom.google.com/h"
                  className="text-blue-600 dark:text-blue-500 hover:underline leading-tight"
                >
                  Google Classroom
                </a>
              </li>
              <li class="flex space-x-2 items-center">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                  />
                </svg>
                <a
                  href="https://drive.google.com/drive/my-drive"
                  className="text-blue-600 dark:text-blue-500 hover:underline leading-tight"
                >
                  Google Drive
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer class="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:px-28 xl:py-8 dark:bg-gray-800 antialiased">
        <p class="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
          &copy; 2023{" "}
          <a
            href="https://www.tarc.edu.my/"
            class="hover:underline"
            target="_blank"
          >
            Tunku Abdul Rahman University of Management and Technology
          </a>
          . All rights reserved.
        </p>
        <div class="flex justify-center items-center space-x-1">
          <a
            href="https://www.facebook.com/tarumtkl/"
            data-tooltip-target="tooltip-facebook"
            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Facebook</span>
          </a>
          <div
            id="tooltip-facebook"
            role="tooltip"
            class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Like us on Facebook
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>

          <a
            href="https://www.instagram.com/tarumt.official/"
            data-tooltip-target="tooltip-github"
            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />{" "}
            </svg>
            <span class="sr-only">Instagram</span>
          </a>
          <div
            id="tooltip-github"
            role="tooltip"
            class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Follow us on Instagram
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <a
            href="https://www.youtube.com/@tarumt"
            data-tooltip-target="tooltip-dribbble"
            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-youtube"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />{" "}
            </svg>
            <span class="sr-only">Youtube</span>
          </a>
          <div
            id="tooltip-dribbble"
            role="tooltip"
            class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Subscribe on YouTube
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </footer>
    </>
  );
}
