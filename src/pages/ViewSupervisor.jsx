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

const TABLE_HEAD = ["Name", "Email", "Phone", "Birth Date", "Gender", "Position", "Major of Study", "Edit", "Remove"];
 
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
  }
];

const ROWS_PER_PAGE = 5; // Number of rows per page

export default function ViewSupervisor() {
  const [currentPage, setCurrentPage] = useState(1);

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

  
  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        View Supervisor
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
            ({ name, email, phone, dob, gender, position, major }, index) => (
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
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4 dark:text-white hover:opacity-50 transition duration-75 ease-in-out" />
                    </IconButton>
                  </Tooltip>
                </td>

                {/* Delete Button */}
                <td className="p-4">
                  <Tooltip content="Delete User">
                    <IconButton variant="text">
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
          <Button variant="outlined" size="sm" onClick={handlePreviousPage} className="dark:text-white dark:border-white hover:opacity-60 transition duration-300 ease-in-out">
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={handleNextPage} className="dark:text-white dark:border-white hover:opacity-60 transition duration-300 ease-in-out">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </>
  )
}
