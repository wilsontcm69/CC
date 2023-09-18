import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//import { Card, Typography } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
  "Name",
  "Email",
  "Phone",
  "Birth Date",
  "Gender",
  "Position",
  "Major of Study",
  "Edit",
  "Remove",
];

const TABLE_ROWS = [
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
  {
    name: "Tan Li Peng",
    email: "tanlipeng@gmail.com",
    phone: "0129677589",
    dob: "16/5/1980",
    gender: "Female",
    position: "Senior Lecturer",
    major: "Software Engineering",
  },
];

const ROWS_PER_PAGE = 5; // Number of rows per page

export default function ViewStudent() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  // Slice the data to display only the rows for the current page
  const rowsToDisplay = TABLE_ROWS.slice(startIndex, endIndex);

  const totalPages = Math.ceil(TABLE_ROWS.length / ROWS_PER_PAGE);

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

  const [deleteTarget, setDeleteTarget] = useState("");
  
  const deleteAction = () => {
    toast.success(`${deleteTarget} has been deleted!`);
  }

  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        View Student
      </div>

      <Card className="h-full w-full">
        {/* ... other parts of your component ... */}

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
              {rowsToDisplay.map(
                (
                  { name, email, phone, dob, gender, position, major },
                  index
                ) => (
                  <tr key={index}>
                    {/* Supervisor Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
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
                          {email}
                        </Typography>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone}
                        </Typography>
                      </div>
                    </td>

                    {/* DOB */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {dob}
                        </Typography>
                      </div>
                    </td>

                    {/* Gender */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {gender}
                        </Typography>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {position}
                        </Typography>
                      </div>
                    </td>

                    {/* Major of Study */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {major}
                        </Typography>
                      </div>
                    </td>

                    {/* Edit Button */}
                    <td className="p-4">
                      <Tooltip content="Edit User">
                        <IconButton variant="text" onClick={() => {
                            navigate(`/Dashboard/EditStudent/${name}`);
                          }}>
                          <PencilIcon className="h-4 w-4 dark:text-white hover:opacity-50 transition duration-75 ease-in-out" />
                        </IconButton>
                      </Tooltip>
                    </td>

                    {/* Delete Button */}
                    <td className="p-4">
                      <Tooltip content="Delete User">
                        <IconButton
                          variant="text"
                          data-modal-target="popup-modal"
                          data-modal-toggle="popup-modal"
                          onClick={() => setDeleteTarget(name)}
                        >
                          <TrashIcon className="h-4 w-4 dark:text-white hover:opacity-50 transition duration-75 ease-in-out" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 bg-white text-black dark:bg-gray-800 dark:text-white rounded-b-lg">
          <Typography variant="small" color="blue-gray" className="font-normal">
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

      <div
        id="popup-modal"
        tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50"
      >
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => deleteAction()}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
