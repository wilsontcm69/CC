import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
  "ID",
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

const ROWS_PER_PAGE = 5; // Number of rows per page

export default function ViewSupervisor() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const [supervisors, setSupervisors] = useState([]);

  // Slice the data to display only the rows for the current page
  const rowsToDisplay = supervisors.slice(startIndex, endIndex);

  const totalPages = Math.ceil(supervisors.length / ROWS_PER_PAGE);

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

    handleDeleteSupervisor()
    
    setTimeout(() => {
      toast.success(`${deleteTarget} has been deleted!`);
      navigate("/dashboard");
    }, 1500);
    
  }

  // ---------- Get all Supervisor Data ----------
  useEffect(() => {
    // Make a GET request to retrieve supervisor data
    fetch("http://localhost:5000/get_supervisors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      // Set the retrieved supervisor data in your state
      setSupervisors(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, []);
  // ---------- Get all Supervisor Data ----------

  const getAllSupervisor = () => {
    // Make a GET request to retrieve supervisor data
    fetch("http://localhost:5000/get_supervisors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      // Set the retrieved supervisor data in your state
      setSupervisors(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  // ---------- Delete Supervisor ----------
  const handleDeleteSupervisor = () => {
    // Create a data object to send to your Flask API
    const data = {
      supervisor_id: deleteTarget,
    };

    // Send a POST request to your Flask API endpoint for adding supervisors
    fetch("http://localhost:5000/delete_supervisor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message
        console.log(data);
        alert("Supervisor deleted successfully!");
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        alert("An error occurred while adding the supervisor.");
      });
  };
  // ---------- Delete Supervisor ----------

  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        View Supervisor
      </div>

      <Card className="h-full w-full">
        {/* ... other parts of your component ... */}
        <form action="/edit_supervisor" autoComplete="on" method="POST" enctype="multipart/form-data">
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
              {rowsToDisplay.map((supervisor) => (
                  <tr key={supervisor.id}>
                    {/* Supervisor ID */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {supervisor.id}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    {/* Supervisor Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {supervisor.first_name + " " + supervisor.last_name}
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
                          {supervisor.email}
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
                          {supervisor.phone}
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
                          {supervisor.birth_date}
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
                          {supervisor.gender}
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
                          {supervisor.position_title}
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
                          {supervisor.major}
                        </Typography>
                      </div>
                    </td>

                    {/* Edit Button */}
                    <td className="p-4">
                      <Tooltip content="Edit User">
                        <IconButton variant="text" onClick={() => {
                            navigate(`/Dashboard/EditSupervisor/${supervisor.id}`);
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
                          onClick={() => {
                            setDeleteTarget(supervisor.id);
                            setModalOpen(true);
                          }}
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
        </form>

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

      {modalOpen && (
        <>
          <div className="w-full h-full bg-slate-400 bg-opacity-50 fixed flex top-0 left-0 z-60 justify-center items-center">
            <div className="w-auto h-auto rounded-xl bg-white shadow-lg flex flex-col py-8 px-14">
              <div className="flex justify-end">
                <button
                className="right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setModalOpen(false);
                  }}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="inline-block text-center text-2xl font-medium relative">
              <svg class="mx-auto text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
              </div>
              <div className="top-5 relative justify-center items-center text-lg text-center mb-2">
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="top-7 flex justify-center items-center relative w-full text-white rounded-lg text-xl mb-6">
                <button
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-6 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-4"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-6 py-2.5 text-center"
                  onClick={() => {
                    deleteAction();
                    setModalOpen(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
