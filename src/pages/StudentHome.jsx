import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/TARUMT-Logo.png";
import ThemeToggle from "../components/ThemeToggle";
import Help from "../components/DropdownHelp";
import toast from "react-hot-toast";
import { useUserRole, useUserRoleUpdate } from "../UserRoleContext";

export default function StudentHome() {
  const navigate = useNavigate();
  const userRole = useUserRole();

  // <-- Set Student Data -->
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [icNum, setICNum] = useState("");
  const [cohort, setCohort] = useState("");
  const [internStart, setInternStart] = useState("");
  const [internEnd, setInternEnd] = useState("");
  const [remarks, setRemarks] = useState("");
  const [uniSupervisorName, setUniSupervisorName] = useState("");
  const [uniSupervisorEmail, setUniSupervisorEmail] = useState("");

  // <-- Set Company Data -->
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [comSupervisorName, setComSupervisorName] = useState("");
  const [comSupervisorEmail, setComSupervisorEmail] = useState("");
  const [allowance, setAllowance] = useState();

  // <-- DOUBLE CHECK WHAT ATTRIBUTE IS STORED WHEN FILE UPLOAD -->
  const [comAcceptanceForm, setComAcceptanceForm] = useState(null);
  const [parentAckForm, setParentAckForm] = useState(null);
  const [indemnity, setIndemnity] = useState(null);
  const [hiredEvidence, setHiredEvidence] = useState(null);
  const [report1, setReport1] = useState(null);
  const [report2, setReport2] = useState(null);

  // <-- DOUBLE CHECK WHAT ATTRIBUTE IS STORED WHEN FILE UPLOAD -->
  const [comAcceptFormName, setComAcceptFormName] = useState("");
  const [comAcceptFormLink, setComAcceptFormLink] = useState("");
  const [parentAckFormName, setParentAckFormName] = useState("");
  const [parentAckFormLink, setParentAckFormLink] = useState("");
  const [indemnityName, setIndemnityName] = useState("");
  const [indemnityLink, setIndemnityLink] = useState("");
  const [hiredEvidenceName, setHiredEvidenceName] = useState("");
  const [hiredEvidenceLink, setHiredEvidenceLink] = useState("");
  const [report1Name, setReport1Name] = useState("");
  const [report1Link, setReport1Link] = useState("");
  const [report2Name, setReport2Name] = useState("");
  const [report2Link, setReport2Link] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(true);
  const setForUserRole = useUserRoleUpdate();

  // ---------- Student Data Session ----------
  const sessionId = sessionStorage.getItem("studentId");
  const sessionEmail = sessionStorage.getItem("studentEmail");
  const sessionName = sessionStorage.getItem("studentName");
  const sessionIc = sessionStorage.getItem("studentIc");
  const sessionCohort = sessionStorage.getItem("cohort");
  const sessionInternStart = sessionStorage.getItem("intern_start");
  const sessionInternEnd = sessionStorage.getItem("intern_end");
  const sessionSupervisorAssigned = sessionStorage.getItem(
    "supervisor_assigned"
  );
  const sessionStatus = sessionStorage.getItem("status");
  const status_no = Number(sessionStatus);

  const [status, setStatus] = useState(status_no);

  // ---------- Get all Company Data ----------
  const [companies, setCompanies] = useState([]);

  // ---------- Check User Session available ----------
  if (sessionEmail === null) {
    navigate("/");
  }

  // ---------- Handle Logout ----------
  const handleLogout = () => {
    setForUserRole("");
    navigate("/");
    sessionStorage.removeItem("studentId");
    sessionStorage.removeItem("studentEmail");
    sessionStorage.removeItem("studentName");
    sessionStorage.removeItem("studentIc");
    sessionStorage.removeItem("cohort");
    sessionStorage.removeItem("intern_start");
    sessionStorage.removeItem("intern_end");
    sessionStorage.removeItem("supervisor_assigned");
    sessionStorage.removeItem("status");

    toast.success("You have successfully logged out!");
  };

  const validateInputCompany = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowanceRegex = /^[0-9]+$/;

    if (companyName === "") {
      toast.error("Please enter company name");
      return;
    }

    if (companyAddress === "") {
      toast.error("Please enter company address");
      return;
    }

    if (comSupervisorName === "") {
      toast.error("Please enter supervisor name");
      return;
    }

    if (comSupervisorEmail === "") {
      toast.error("Please enter supervisor email");
      return;
    }

    if (!emailRegex.test(comSupervisorEmail)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (allowance === "") {
      toast.error("Please enter allowance");
      return;
    }

    if (!allowanceRegex.test(allowance)) {
      toast.error("Please enter a valid allowance");
      return;
    }

    if (comAcceptanceForm === "") {
      toast.error("Please upload company acceptance form");
      return;
    }

    if (parentAckForm === "") {
      toast.error("Please upload parent acknowledgement form");
      return;
    }

    if (indemnity === "") {
      toast.error("Please upload letter of indemnity");
      return;
    }

    onSubmitCompany();
  };

  const validateInputReport = () => {
    if (report1 === "") {
      toast.error("Please upload internship report");
      return;
    }

    onSubmitReport();
  };

  // <--- EDIT HERE: ADD APPLICATION --->
  const onSubmitCompany = () => {
    setLoading(true);

    // <--- add application --->
    handleAddApplication();

    setTimeout(() => {
      setLoading(false);
      toast.success("Application updated!");
    }, 6000);
    setTimeout(() => {
      //window.location.reload();
    }, 2000);
  };

  // <--- EDIT HERE: ADD PROGRESS CHECK REPORT --->
  const onSubmitReport = () => {
    setLoading(true);

    // <--- add application --->
    handleAddProgress();

    setTimeout(() => {
      setLoading(false);
      toast.success("Progress updated!");
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // --------------- Application Progress ---------------
  useEffect(() => {
    if (status_no == 1) {
      // Make a GET request to retrieve company data
      fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/get_companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Set the retrieved student data in your state
          setCompanies(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      companies.map((company) => {
        console.log("Company names: " + company.company_name);
        const address = company.address;

        if (company.company_name === companyName) {
          console.log("Company address:  " + address);
          setCompanyAddress(address);
        } 
      });
    } else if (status_no == 2 || status_no == 3) {
      getApplication(sessionId);
    } else if (status_no == 4) {
      getApplication(sessionId);
    } else {
      console.log("Error ");
    }
  }, []);
  

    // For example, if you're using a dropdown list
    const handleCompanyChange = (event) => {
      //setSelectedCompany(event.target.value);

      companies.map((company) => {
        const address = company.address;

        if (company.company_name === event.target.value) {
          console.log("Company address:  " + address);
          setCompanyAddress(address);
        } 
        else if (companyName == "") {
          setCompanyAddress("");
        }
      });

    };

  // --------------- Application Progress ---------------

  const getApplication = (student_id) => {
    // Send a GET request to your Flask API endpoint with the student_id in the URL
    fetch(`http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/get_application/${student_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        setCompanyName(data.com_name);
        setCompanyAddress(data.com_address);
        setComSupervisorName(data.com_supervisor_name);
        setComSupervisorEmail(data.com_supervisor_email);
        console.log(data);

        // Assuming data.allowance is a decimal number
        setAllowance(data.allowance);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        alert("An error occurred while updating the company.");
      });
  };

  // ---------- Add Internship Application ----------
  const handleAddApplication = () => {
    // Create a data object to send to your Flask API
    const data = new FormData();
    data.append("student_id", sessionId);
    data.append("company_name", companyName);
    data.append("company_address", companyAddress);
    data.append("company_supervisor_name", comSupervisorName);
    data.append("company_supervisor_email", comSupervisorEmail);
    data.append("allowance", allowance);
    data.append("com_acceptance_form", comAcceptanceForm[0]);
    data.append("parent_ack_form", parentAckForm[0]);
    data.append("indemnity", indemnity[0]);
    data.append("hired_evidence", hiredEvidence[0]);

    // Send a POST request to your Flask API endpoint for adding supervisors
    fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/add_application", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message
        console.log(data);
        alert("Internship Application added successfully!");

        // Clear the form fields
        setCompanyName("");
        setCompanyAddress("");
        setComSupervisorName("");
        setComSupervisorEmail("");
        setAllowance("");
        setComAcceptanceForm("");
        setParentAckForm("");
        setIndemnity("");
        setHiredEvidence("");
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        //alert("An error occurred while adding the supervisor.");
      });

  };
  
  // ---------- Add Progress ----------
  const handleAddProgress = () => {
    // Create a data object to send to your Flask API
    const data = new FormData();
    data.append("student_id", sessionId);
    data.append("report1", report1[0]);
    data.append("report2", report2[0]);

    fetch("http://localhost:5000/add_progress", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message
        console.log(data);
        alert("Progress added successfully!");
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        //alert("An error occurred while adding the supervisor.");
      });
  };

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
                  handleLogout(); // Call the logout method
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
        {/* Alert */}
        {alert && (
          <div class="flex items-center p-4 mb-4 text-blue-800 border rounded-lg border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800">
            <svg
              class="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div class="ml-3 text-sm font-medium">
              {status === 1 &&
                "Please fill in the company details before the deadline."}
              {status === 2 &&
                "Your supervisor is evaluating your application..."}
              {status === 3 &&
                "Your application has been approved. Please submit the progress report a week before the internship ends."}
              {status === 4 &&
                "You have completed everything, please check your result in the intranet."}
            </div>
            <button
              type="button"
              class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              onClick={() => setAlert(false)}
            >
              <span class="sr-only">Dismiss</span>
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
            </button>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-2">
          {/* Background illustration */}
          <div
            className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
            aria-hidden="true"
          >
            <svg
              width="319"
              height="198"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="welcome-b"
                >
                  <stop stopColor="#A5B4FC" offset="0%" />
                  <stop stopColor="#818CF8" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="50%"
                  y1="24.537%"
                  x2="50%"
                  y2="100%"
                  id="welcome-c"
                >
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
                  <path
                    fill="url(#welcome-c)"
                    mask="url(#welcome-d)"
                    d="M64-24h80v152H64z"
                  />
                </g>
                <g transform="rotate(-51 91.324 -105.372)">
                  <mask id="welcome-f" fill="#fff">
                    <use xlinkHref="#welcome-e" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                  <path
                    fill="url(#welcome-c)"
                    mask="url(#welcome-f)"
                    d="M40.333-15.147h50v95h-50z"
                  />
                </g>
                <g transform="rotate(44 61.546 392.623)">
                  <mask id="welcome-h" fill="#fff">
                    <use xlinkHref="#welcome-g" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                  <path
                    fill="url(#welcome-c)"
                    mask="url(#welcome-h)"
                    d="M40.333-15.147h50v95h-50z"
                  />
                </g>
              </g>
            </svg>
          </div>

          {/* Content */}
          <div className="relative">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
              Welcome, {sessionEmail}. 👋
            </h1>
            <p className="dark:text-indigo-200">
              A journey of a thousand miles begins with a single step.
            </p>
          </div>
        </div>

        <br />
        <br />

        {/* Stepper */}
        <div className="px-4 pb-4">
          <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            <li
              class={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${
                status >= 1 && "text-green-600 dark:text-green-500"
              }`}
            >
              <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {status >= 1 ? (
                  <svg
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <span class="mr-2">1</span>
                )}
                Pending{" "}
                <span class="hidden sm:inline-flex sm:ml-1">Submit</span>
              </span>
            </li>
            <li
              class={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${
                status >= 2 && "text-green-600 dark:text-green-500"
              }`}
            >
              <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {status >= 2 ? (
                  <svg
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <span class="mr-2">2</span>
                )}
                <span class="hidden sm:inline-flex sm:mr-1">Application</span>{" "}
                Evaluation
              </span>
            </li>
            <li
              class={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${
                status >= 3 && "text-green-600 dark:text-green-500"
              }`}
            >
              <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {status >= 3 ? (
                  <svg
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <span class="mr-2">3</span>
                )}
                <span class="hidden sm:inline-flex sm:mr-1">Application</span>{" "}
                Approve
              </span>
            </li>
            <li
              class={`flex items-center ${
                status >= 4 && "text-green-600 dark:text-green-500"
              }`}
            >
              {status >= 4 ? (
                <svg
                  class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span class="mr-2">4</span>
              )}
              Progress <span class="hidden sm:inline-flex sm:ml-1">Check</span>
            </li>
          </ol>
        </div>
        {/* Summary & Supervisor */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          {/* Summary */}
          <div class="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Summary
            </h1>
            <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Cohort
                </dt>
                <dd class="text-base font-semibold">{sessionCohort}</dd>
              </div>
              <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Intern Period
                </dt>
                <dd class="text-base font-semibold">
                  {sessionInternStart} to {sessionInternEnd}
                </dd>
              </div>
            </dl>
          </div>
          {/* Supervisor */}
          <div class="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Supervisor
            </h1>
            <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  University Supervisor
                </dt>
                <dd class="text-base font-semibold">
                  {sessionSupervisorAssigned}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* Status = 1 & 2 */}
        <div
          class={`bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg mb-4 ${
            status !== 1 && "pointer-events-none"
          }`}
        >
          <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Company Details
          </h1>
          <form>
            {/* Company Name */}
            <div class="mb-6">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company Name
              </label>
              {status === 1 ? (
                <>
                  <input
                    list="companies"
                    id="companyInput"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select a company"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      const selectedCompanyData = companies.find((company) => company.company_name === e.target.value);
                      if (selectedCompanyData) {
                        setCompanyAddress(selectedCompanyData.address);
                      } else {
                        setCompanyAddress(""); // Clear the address if no company is selected
                      }
                    }}
                  />
                  <datalist id="companies">
                    {companies.map((company) => (
                      <option
                        key={company.company_name}
                        value={company.company_name}
                      />
                    ))}
                  </datalist>
                </>
              ) : (
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={companyName}
                />
              )}

              
            </div>
            {/* Address */}
            <div class="mb-6">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                disabled
                id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={companyAddress}
              />
              <p className="ml-2 text-xs">
                * If the address does not match the current address, please
                contact the administrator
              </p>
            </div>
            {/* Company Supervisor */}
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="company_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Supervisor Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  onChange={(e) => setComSupervisorName(e.target.value)}
                  defaultValue={status > 1 ? comSupervisorName : ""}
                />
              </div>
              {/* Email */}
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Supervisor Email
                </label>
                <input
                  type="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="johndoe@acme.com"
                  onChange={(e) => setComSupervisorEmail(e.target.value)}
                  defaultValue={status > 1 ? comSupervisorEmail : ""}
                />
              </div>
            </div>
            {/* Allowance */}
            <div className="mb-6">
              <label
                for="allowance"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Allowance
              </label>
              <div class="flex items-center">
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="mx-1 text-gray-900 dark:text-gray-300">
                      RM
                    </span>
                  </div>
                  <input
                    type="number"
                    id="allowance-start"
                    class="bg-gray-50 border border-gray-300 text-gray-900 pl-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="500"
                    min="0"
                    max="10000"
                    step="100"
                    onChange={(e) => setAllowance(e.target.value)}
                    defaultValue={status > 1 ? allowance : ""}
                  />
                </div>
              </div>
            </div>
            {/* File Upload */}
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Company Acceptance Form
                </label>
                {status === 1 ? (
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={(e) => setComAcceptanceForm(e.target.files)}
                  />
                ) : (
                  <a
                    href={comAcceptFormLink}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline pointer-events-auto"
                  >
                    {comAcceptFormName}
                  </a>
                )}
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Parent Acknowledgement Form
                </label>
                {status === 1 ? (
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={(e) => setParentAckForm(e.target.files)}
                  />
                ) : (
                  <a
                    href={parentAckFormLink}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline pointer-events-auto"
                  >
                    {parentAckFormName}
                  </a>
                )}
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Letter of Indemnity
                </label>
                {status === 1 ? (
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={(e) => setIndemnity(e.target.files)}
                  />
                ) : (
                  <a
                    href={indemnityLink}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline pointer-events-auto"
                  >
                    {indemnityName}
                  </a>
                )}
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Hired Evidence{" "}
                  <span class="text-xs font-light">(Optional)</span>
                </label>
                {status === 1 ? (
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={(e) => setHiredEvidence(e.target.files)}
                  />
                ) : (
                  <a
                    href={hiredEvidenceLink}
                    class={`font-medium  ${
                      hiredEvidenceLink &&
                      "pointer-events-auto text-blue-600 dark:text-blue-500 hover:underline"
                    }`}
                  >
                    {hiredEvidenceName ? hiredEvidenceName : "-"}
                  </a>
                )}
              </div>
            </div>
            {/* Button */}
            {status === 1 && (
              <div className="text-right">
                <button
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-4"
                  onClick={() => {
                    window.history.back();
                  }}
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
                    onClick={() => validateInputCompany()}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
        {/* Status = 3 & 4 */}
        {status > 2 && (
          <div class="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg mb-4">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Progress Check
            </h1>
            <form>
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Internship Report
                  </label>
                  {status === 3 ? (
                    <input
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      onChange={(e) => setReport1(e.target.files)}
                    />
                  ) : (
                    <a
                      href={report1Link}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {report1Name}
                    </a>
                  )}
                </div>
                <div>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Additional Document{" "}
                    <span class="text-xs font-light">(Optional)</span>
                  </label>
                  {status === 3 ? (
                    <input
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      onChange={(e) => setReport2(e.target.files)}
                    />
                  ) : (
                    <a
                      href={report2Link}
                      class={`font-medium ${
                        report2Link &&
                        "pointer-events-auto text-blue-600 dark:text-blue-500 hover:underline"
                      }`}
                    >
                      {report2Name ? report2Name : "-"}
                    </a>
                  )}
                </div>
              </div>
              {status === 3 && (
                <div className="text-right">
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
                      onClick={() => validateInputReport()}
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </main>

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
