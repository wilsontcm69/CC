import React, { useState, useEffect } from "react";
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
  "Student ID",
  "Name",
  "Email",
  "IC No",
  "Cohort",
  "Intern Period",
  "Remarks",
  "Edit",
  "Remove",
];

const ROWS_PER_PAGE = 5; // Number of rows per page

export default function ViewStudent() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
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

  const [deleteTarget, setDeleteTarget] = useState("");
  
  const deleteAction = () => {
    handleDeleteStudent();

    setTimeout(() => {
      toast.success(`${deleteTarget} has been deleted!`);
      navigate("/dashboard");
    }, 1500);
  }

  // ---------- Get all Students Data ----------
  useEffect(() => {
    // Make a GET request to retrieve students data
    fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/get_students", {
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

  // ---------- Delete Student ----------
  const handleDeleteStudent = () => {
    // Create a data object to send to your Flask API
    const data = {
      student_id: deleteTarget,
    };

    // Send a POST request to your Flask API endpoint for deleting students
    fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/delete_student", {
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
        alert("Student deleted successfully!");
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        alert("An error occurred while deleting the student.");
      });
  };
  // ---------- Delete Student ----------

  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        View Student
      </div>

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

                      {/* Remarks */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {student.remarks}
                          </Typography>
                        </div>
                      </td>

                      {/* Edit Button */}
                      <td className="p-4">
                        <Tooltip content="Edit User">
                          <IconButton
                            variant="text"
                            onClick={() => {
                              navigate(
                                `/Dashboard/EditStudent/${student.id}`
                              );
                            }}
                          >
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
                              setDeleteTarget(student.id);
                              setModalOpen(true);
                            }}
                          >
                            <TrashIcon className="h-4 w-4 dark:text-white hover:opacity-50 transition duration-75 ease-in-out" />
                          </IconButton>
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

      {modalOpen && (
        <>
          <div className="w-full h-full bg-slate-400 bg-opacity-50 fixed flex top-0 left-0 z-60 justify-center items-center">
            <div className="w-auto h-auto rounded-xl bg-white shadow-lg flex flex-col py-6 px-12 dark:bg-gray-700">
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
                <svg
                  class="mx-auto text-gray-400 w-12 h-12 dark:text-gray-200"
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