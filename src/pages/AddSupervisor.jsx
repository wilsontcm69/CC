import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddSupervisor() {
  const [supervisorID, setSupervisorID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [hide1, setHide1] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hide2, setHide2] = useState(true);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const handleDateChange = (date) => {
    setBirthDate(date);
  };
  const [gender, setGender] = useState("Male");
  const [positionTitle, setPositionTitle] = useState("");
  const [major, setMajor] = useState("Management Information Systems");
  const [dbsupervisorID, setDBSupervisorID] = useState([]); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    // Validate Empty Input
    if (supervisorID === "") {
      toast.error("Please enter supervisor ID");
      return;
    }

    if (isNaN(supervisorID) || supervisorID.length !== 4) {
      toast.error("Please enter a valid supervisor ID");
      return;
    }

    // Validate Duplicate Supervisor ID
    if (dbsupervisorID.includes(supervisorID)) {
      toast.error("Supervisor ID already exists");
      return;
    }

    if (email === "") {
      toast.error("Please enter email");
      return;
    }

    if (!email.endsWith("@tarc.edu.my")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (password === "") {
      toast.error("Please enter password");
      return;
    }

    if (confirmPassword === "") {
      toast.error("Please enter confirm password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be same");
      return;
    }

    if (firstName === "") {
      toast.error("Please enter first name");
      return;
    }

    if (lastName === "") {
      toast.error("Please enter last name");
      return;
    }

    if (phone === "") {
      toast.error("Please enter phone");
      return;
    }

    if (isNaN(phone)) {
      toast.error("Phone number must contain only digits");
      return;
    }

    if (positionTitle === "") {
      toast.error("Please enter position title");
      return;
    }

    if (birthDate === "") {
      toast.error("Please enter birth date");
      return;
    }

    onSubmit();
  };

  const onSubmit = () => {
    setLoading(true);
    console.log("Supervisor ID: " + supervisorID);
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);
    console.log("Name: " + firstName + " " + lastName);
    console.log("Phone: " + phone);
    console.log("Birth Date: " + birthDate);
    console.log("Gender: " + gender);
    console.log("Position: " + positionTitle);
    console.log("Major of Study: " + major);

    handleAddSupervisor();
    setTimeout(() => {
      setLoading(false);
      toast.success("Supervisor added successfully");
      navigate("/Dashboard/ViewSupervisor");
    }, 1500);

  };

  // ---------- Add Supervisor ----------
  const handleAddSupervisor = () => {
    // Create a data object to send to your Flask API
    const data = {
      supervisor_id: supervisorID,
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
      phone: phone,
      birth_date: formatDate(birthDate), //birthDate.toISOString().split('T')[0]
      gender: gender,
      position_title: positionTitle,
      major: major,
    };

    // Send a POST request to your Flask API endpoint for adding supervisors
    fetch("http://localhost:5000/add_supervisor", {
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
        alert("Supervisor added successfully!");

        // Clear the form fields
        setSupervisorID("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setPhone("");
        setBirthDate(new Date());
        setGender("");
        setPositionTitle("");
        setMajor("");
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error:", error);
        alert("An error occurred while adding the supervisor.");
      });
  };
  // ---------- Add Supervisor ----------

  // ---------- Get all Supervisor ID ----------
  useEffect(() => {
    // Make a GET request to retrieve supervisor ID only
    fetch("ALB-890423990.us-east-1.elb.amazonaws.com/get_supervisors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // map the data and extract the all supervisor ID
        const supervisorID = data.map((item) => item.id);
        setDBSupervisorID(supervisorID);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  // ---------- Get all Supervisor ID ----------

  // Function to format the date as DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string if date is null

    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-indexed
    const year = date.getFullYear();

    // Use template literals to format the date as DD/MM/YYYY
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };

  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Add Supervisor
      </div>

      <form
        action="/add_supervisor"
        autoComplete="on"
        method="POST"
        enctype="multipart/form-data"
        className="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg"
      >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          {/* Staff ID */}
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Staff ID
            </label>
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              maxLength={4}
              placeholder="4096"
              onChange={(e) => setSupervisorID(e.target.value)}
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
              placeholder="johndoe@tarc.edu.my"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type={hide1 ? "password" : "text"}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 flex right-0 items-center pr-1 pt-7">
              {hide1 ? (
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  type="button"
                  onClick={() => setHide1(!hide1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  type="button"
                  onClick={() => setHide1(!hide1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Supervisor First Name */}
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
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type={hide2 ? "password" : "text"}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 flex right-0 items-center pr-1 pt-7">
              {hide2 ? (
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  type="button"
                  onClick={() => setHide2(!hide2)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  type="button"
                  onClick={() => setHide2(!hide2)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Supervisor Last Name */}
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
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              for="phone"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0126855400"
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Position */}
          <div>
            <label
              for="position_title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Position
            </label>
            <input
              type="text"
              id="position_title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Senior Lecturer"
              onChange={(e) => setPositionTitle(e.target.value)}
            />
          </div>

          {/* Birth Date */}
          <div>
            <label
              htmlFor="birthDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Birth Date
            </label>
            <DatePicker
              id="birthDate"
              selected={birthDate}
              onChange={handleDateChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholderText="Select a date"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              for="Gender"
              class="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>

            <div class="flex">
              <div class="flex items-center mr-4">
                <input
                  defaultChecked
                  id="male"
                  type="radio"
                  value=""
                  name="gender"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setGender("Male")}
                />
                <label
                  for="Male"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div class="flex items-center mr-4">
                <input
                  id="female"
                  type="radio"
                  value=""
                  name="gender"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setGender("Female")}
                />
                <label
                  for="Female"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </div>
          </div>

          {/* Major of Study */}
          <div>
            <label
              for="workingday"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Major of Study / Specialization
            </label>
            <div class="flex items-center">
              <div class="relative">
                <select
                  id="major"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setMajor(e.target.value)}
                >
                  <option value="Management Information Systems">
                    Management Information Systems
                  </option>
                  <option value="Information Security">
                    Information Security
                  </option>
                  <option value="Networking">Networking</option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="ICT">ICT</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Mathematics and Statistics">
                    Mathematics and Statistics
                  </option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligent">
                    Artificial Intelligent
                  </option>
                  <option value="Grahpic Computing">Grahpic Computing</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2"></div>
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
