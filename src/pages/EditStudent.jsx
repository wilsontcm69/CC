import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditStudent() {
  const { id } = useParams();
  const cohortlist = [
    "Oct 2021",
    "Feb 2022",
    "Jun 2022",
    "Oct 2022",
    "Feb 2023",
    "Jun 2023",
    "Oct 2023",
    "Feb 2024",
    "Jun 2024",
    "Oct 2024",
  ];
  const navigate = useNavigate();
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [icNum, setICNum] = useState("");
  const [cohort, setCohort] = useState("");
  const [internStart, setInternStart] = useState("");
  const [internEnd, setInternEnd] = useState("");
  const [supervisorAssigned, setSupervisorAssigned] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- Get all Supervisor Data ----------
  const [supervisors, setSupervisors] = useState([]);

  const validateInput = () => {
    if (studentID === "") {
      toast.error("Please enter student ID");
      return;
    }

    if (isNaN(studentID) || studentID.length !== 7) {
      toast.error("Please enter a valid student ID");
      return;
    }

    if (studentName === "") {
      toast.error("Please enter student first name");
      return;
    }

    if (email === "") {
      toast.error("Please enter student email");
      return;
    }

    if (!email.endsWith("@student.tarc.edu.my")) {
      toast.error("Please enter a valid student email");
      return;
    }

    if (lastName === "") {
      toast.error("Please enter student last name");
      return;
    }

    if (icNum === "") {
      toast.error("Please enter student IC number");
      return;
    }

    if (isNaN(icNum) || icNum.length !== 12) {
      toast.error("Please enter a valid IC Number");
      return;
    }

    if (cohort === "") {
      toast.error("Please select student cohort");
      return;
    }

    if (internStart === "") {
      toast.error("Please select internship start date");
      return;
    }

    if (internEnd === "") {
      toast.error("Please select internship end date");
      return;
    }

    if (supervisorAssigned === "") {
      toast.error("Please enter assigned supervisor");
      return;
    }

    onSubmit();
  };

  const onSubmit = () => {
    setLoading(true);
    console.log("Student ID: " + studentID);
    console.log("Student Name: " + studentName + " " + lastName);
    console.log("Email: " + email);
    console.log("IC Number: " + icNum);
    console.log("Cohort: " + cohort);
    console.log("Internship Start: " + internStart);
    console.log("Internship End: " + internEnd);
    console.log("Supervisor Assigned:" + supervisorAssigned);

    handleEditStudent()

    setTimeout(() => {
      toast.success("Student added successfully");
      window.history.back();
    }, 1000);
  };

  // ---------- Edit Student ----------
  const handleEditStudent = () => {
    
    // Create a data object to send to your Flask API
    const data = {
      student_id: studentID,
      first_name: studentName,
      last_name: lastName,
      email: email,
      ic_no: icNum,
      cohort: cohort,
      intern_start: internStart,
      intern_end: internEnd,
      supervisor_assigned: supervisorAssigned,
    };

    // Send a POST request to your Flask API endpoint for editing student
    fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/edit_student", {
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
        alert("Student updated successfully!");

        // Clear the form fields
        setStudentID("");
        setStudentName("");
        setLastName("");
        setEmail("");
        setICNum("");
        setCohort("");
        setInternStart("");
        setInternEnd("");
        setSupervisorAssigned("");
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        alert("An error occurred while updating the student.");
      });
  };
  // ---------- Edit Student ----------

  // ---------- Get Student Data ----------
  useEffect(() => {
    // Make a GET request to retrieve student data
    fetch(`http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/get_student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved student data in your state
        setStudentID(data.id);
        setStudentName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setICNum(data.ic_no);
        setCohort(data.cohort);
        setInternStart(data.intern_start);
        setInternEnd(data.intern_end);
        setSupervisorAssigned(data.supervisor_assigned);
        // Set other fields as needed
      })
      .catch((error) => {
        // Handle errors
      });
}, [id]);
  // ---------- Get Student Data ----------

  // ---------- Get All Supervisor Data ----------
  useEffect(() => {

    // Make a GET request to retrieve company data
    fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/get_supervisors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved student data in your state
        setSupervisors(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
     
  }, []);

  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Edit Student ID: {id}
      </div>

      {studentID !== "" ? (
      <form action="/edit_student" autoComplete="on" method="POST" enctype="multipart/form-data" className="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          {/* Student ID */}
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Student ID
            </label>
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="2001987"
              maxLength={7}
              value={studentID}
              disabled={true}
              onChange={(e) => setStudentID(e.target.value)}
            />
          </div>

          {/* Student First Name */}
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tan"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe-wp19@student.tarc.edu.my"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Student Last Name */}
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Li Peng"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* IC Number */}
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              IC Number
            </label>
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="990106125821"
              maxLength={12}
              value={icNum}
              onChange={(e) => setICNum(e.target.value)}
            />
          </div>

          {/* Supervisor Assigned */}
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Supervisor Assigned
          </label>
          <select
            id="supervisorInput"
            value={supervisorAssigned}
            onChange={(e) => setSupervisorAssigned(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a supervisor</option>
            {supervisors.map((supervisor) => (
              <option
                key={supervisor.first_name + supervisor.last_name}
                value={supervisor.first_name + supervisor.last_name}
              >
                {supervisor.first_name + supervisor.last_name}
              </option>
            ))}
          </select>
        </div>

          {/* Cohort */}
          <div>
            <label
              for="workingday"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cohort
            </label>
            <div class="flex items-center">
              <div class="relative">
                <select
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                >
                  {cohortlist.map((cohort) => (
                    <option value={cohort}>{cohort}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Intership Period */}
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Internship Period
            </label>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={internStart}
                  onChange={(e) => setInternStart(e.target.value)}
                />
              </div>
              <span class="mx-4 text-gray-500">to</span>
              <div className="relative">
                <input
                  type="date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={internEnd}
                  onChange={(e) => setInternEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
        <button
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-4"
            onClick={() => {window.history.back()}}
          >
            Cancel
          </button>
          
          {loading ? (
            <button
              disabled
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="button"
              onClick={() => validateInput()}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      ): (
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
    )}  
    </>
  );
}
