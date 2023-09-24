import React, { useState, useEffect} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [address, setAddress] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [workingDayStart, setWorkingDayStart] = useState("Monday");
  const [workingDayEnd, setWorkingDayEnd] = useState("Friday");
  const [workingHourStart, setWorkingHourStart] = useState("");
  const [workingHourEnd, setWorkingHourEnd] = useState("");
  const [allowanceStart, setAllowanceStart] = useState("");
  const [allowanceEnd, setAllowanceEnd] = useState("");
  const [openFor, setOpenFor] = useState("Degree");
  const [accomodation, setAccomodation] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowanceRegex = /^[0-9]+$/;

    // Validate Empty Input
    if (companyName === "") {
      toast.error("Please enter company name");
      return;
    }

    if (email === "") {
      toast.error("Please enter email");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (jobTitle === "") {
      toast.error("Please enter job title");
      return;
    }

    if (address === "") {
      toast.error("Please enter address");
      return;
    }

    if (jobDescription === "") {
      toast.error("Please enter job description");
      return;
    }

    if (workingHourStart === "") {
      toast.error("Please enter working hour start");
      return;
    }

    if (workingHourEnd === "") {
      toast.error("Please enter working hour end");
      return;
    }

    if (allowanceStart === "") {
      toast.error("Please enter allowance start");
      return;
    }

    if (allowanceEnd === "") {
      toast.error("Please enter allowance end");
      return;
    }

    if (
      !allowanceRegex.test(allowanceStart) ||
      !allowanceRegex.test(allowanceEnd)
    ) {
      toast.error("Please enter a valid allowance range");
      return;
    }

    // Validate Allowance
    if (allowanceStart > allowanceEnd) {
      toast.error("Please enter a valid allowance range");
      return;
    }

    if (workingHourStart === "") {
      toast.error("Please enter working hour start");
      return;
    }

    if (workingHourEnd === "") {
      toast.error("Please enter working hour end");
      return;
    }
    // Validate Same Company Name??

    // Validate Website
    if (!(website === "") && !website.includes(".")) {
      toast.error("Please enter a valid website");
      return;
    }

    // Validate Job Description
    if (jobDescription.length < 20) {
      toast.error("Job description must be at least 20 characters");
      return;
    }

    //Validate Working Day
    if (workingDayStart === workingDayEnd) {
      toast.error("Start working day cannot be the same as end working day");
      return;
    }

    // Validate Working Hour
    if (workingHourStart > workingHourEnd) {
      toast.error("Start working hour cannot be later than end working hour");
      return;
    }

    onSubmit();
  };

  const onSubmit = () => {
    setLoading(true);
    console.log("Company Name: " + companyName);
    console.log("Email: " + email);
    console.log("Website: " + website);
    console.log("Job Title: " + jobTitle);
    console.log("Address: " + address);
    console.log("Job Description: " + jobDescription);
    console.log("Working Day Start: " + workingDayStart);
    console.log("Working Day End: " + workingDayEnd);
    console.log("Working Hour Start: " + workingHourStart);
    console.log("Working Hour End: " + workingHourEnd);
    console.log("Allowance Start: " + allowanceStart);
    console.log("Allowance End: " + allowanceEnd);
    console.log("Open For: " + openFor);
    console.log("Accomodation: " + accomodation);

    handleAddCompany();
    setTimeout(() => {
      setLoading(false);
      toast.success("Company added successfully");
      navigate("/dashboard/ViewCompany");
    }, 1000);
  };

  // ---------- Add Company ----------
  const handleAddCompany = () => {
    // Create a data object to send to your Flask API
    const data = {
      company_name: companyName,
      email: email,
      website: website,
      job_title: jobTitle,
      address: address,
      job_description: jobDescription,
      working_day_start: workingDayStart,
      working_day_end: workingDayEnd,
      working_hour_start: workingHourStart,
      working_hour_end: workingHourEnd,
      allowance_start: allowanceStart,
      allowance_end: allowanceEnd,
      open_for: openFor,
      accomodation: accomodation,
    };

    // Send a POST request to your Flask API endpoint for adding supervisors
    fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/add_company", {
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
        alert("Company added successfully!");  
        
        // Clear the form fields
        setCompanyName("");
        setEmail("");
        setWebsite("");
        setJobTitle("");
        setAddress("");
        setJobDescription("");
        setWorkingDayStart("Monday");
        setWorkingDayEnd("Friday");
        setWorkingHourStart("");
        setWorkingHourEnd("");
        setAllowanceStart("");
        setAllowanceEnd("");
        setOpenFor("Degree");
        setAccomodation(false);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        alert("An error occurred while adding the company.");
      });
  };
  // ---------- Add Company----------

  // ---------- Get all Company Name ----------
  useEffect(() => {
    // Make a GET request to retrieve Company Name only
    fetch("http://cherngmingtan-loadbalancer-88123096.us-east-1.elb.amazonaws.com/get_companies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // map the data and extract the all Company Name
        const companyName = data.map((item) => item.id);
        setCompanyName(companyName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  // ---------- Get all Company Name----------

  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Add Company
      </div>

      <form 
      action="/add_company"
      autoComplete="on"
      method="POST"
      enctype="multipart/form-data"
      className="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg"
      >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          {/* Company Name */}
          <div>
            <label
              for="company_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Acme Inc. (M) Sdn Bhd"
              onChange={(e) => setCompanyName(e.target.value)}
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
              placeholder="johndoe@acme.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Website */}
          <div>
            <label
              for="website"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Website URL <span class="text-xs font-light">(Optional)</span>
            </label>
            <input
              type="url"
              id="website"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="www.acmeinc.com"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          {/* Job Title */}
          <div>
            <label
              for="job_title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job Title
            </label>
            <input
              type="text"
              id="job_title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Software Engineer, Frontend Developer"
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
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
            type="email"
            id="address"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Jalan Genting Kelang, Setapak, 53300 Kuala Lumpur, Federal Territory of Kuala Lumpur"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {/* Job Description */}
        <div class="mb-6">
          <label
            for="job_description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Description
          </label>
          <textarea
            id="job_description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a description for this job (E.g. Individual with the knowledge of HTML, CSS, Javascript)"
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          {/* Working Day */}
          <div>
            <label
              for="workingday"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Working Day
            </label>
            <div class="flex items-center">
              <div class="relative">
                <select
                  id="workingday-start"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setWorkingDayStart(e.target.value)}
                >
                  {days.map((day) => (
                    <option value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <span class="mx-4 text-gray-500 dark:text-gray-400">to</span>
              <div class="relative">
                <select
                  id="workingday-end"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setWorkingDayEnd(e.target.value)}
                >
                  {/* Friday is selected */}
                  {days.map((day) => (
                    <option value={day} selected={day === "Friday"}>{day}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Working Hour */}
          <div>
            <label
              for="workinghour"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Working Hours
            </label>
            <div class="flex items-center">
              <div class="relative">
                <input
                  name="workinghour-start"
                  type="time"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setWorkingHourStart(e.target.value)}
                />
              </div>
              <span class="mx-4 text-gray-500 dark:text-gray-400">to</span>
              <div class="relative">
                <input
                  name="workinghour-end"
                  type="time"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setWorkingHourEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Allowance */}
          <div>
            <label
              for="allowance"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Allowance
            </label>
            <div class="flex items-center">
              <div class="relative w-1/4">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="mx-1 text-gray-900 dark:text-gray-300">RM</span>
                </div>
                <input
                  type="number"
                  id="allowance-start"
                  class="bg-gray-50 border border-gray-300 text-gray-900 pl-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="500"
                  min="0"
                  max="10000"
                  step="100"
                  onChange={(e) => setAllowanceStart(e.target.value)}
                />
              </div>
              <span class="mx-4 text-gray-500 dark:text-gray-400">to</span>
              <div class="relative w-1/4">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="mx-1 text-gray-900 dark:text-gray-300">RM</span>
                </div>
                <input
                  type="number"
                  id="allowance-end"
                  class="bg-gray-50 border border-gray-300 text-gray-900 pl-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="800"
                  min={allowanceStart}
                  max="10000"
                  step="100"
                  onChange={(e) => setAllowanceEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Open For*/}
          <div>
            <label
              for="openFor"
              class="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Open For
            </label>

            <div class="flex">
              <div class="flex items-center mr-4">
                <input
                  defaultChecked
                  id="Degree"
                  type="radio"
                  value=""
                  name="openFor"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setOpenFor("Degree")}
                />
                <label
                  for="Degree"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Degree
                </label>
              </div>
              <div class="flex items-center mr-4">
                <input
                  id="Diploma"
                  type="radio"
                  value=""
                  name="openFor"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setOpenFor("Diploma")}
                />
                <label
                  for="Diploma"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Diploma
                </label>
              </div>
              <div class="flex items-center mr-4">
                <input
                  id="Master"
                  type="radio"
                  value=""
                  name="openFor"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setOpenFor("Master")}
                />
                <label
                  for="Master"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Master
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="Degree & Diploma"
                  type="radio"
                  value=""
                  name="openFor"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setOpenFor("Degree & Diploma")}
                />
                <label
                  for="Degree & Diploma"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Degree & Diploma
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Accomodation */}
        <div class="mb-6">
          <label
            for="accomodation"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Accomodation
          </label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              onClick={() => {
                setAccomodation(!accomodation);
              }}
            />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {accomodation ? "Yes" : "No"}
            </span>
          </label>
        </div>
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
              onClick={() => validateInput()}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}
