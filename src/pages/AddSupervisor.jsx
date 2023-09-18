import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddSupervisor() {
  const [firstName, setFirstName] = useState("");
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    // Validate Empty Input
    if (firstName === "") {
      toast.error("Please enter first name");
      return;
    }

    if (lastName === "") {
      toast.error("Please enter last name");
      return;
    }

    if (email === "") {
      toast.error("Please enter email");
      return;
    }

    if (phone === "") {
      toast.error("Please enter phone");
      return;
    }

    if (birthDate === "") {
      toast.error("Please enter birth date");
      return;
    }

    if (positionTitle === "") {
      toast.error("Please enter position title");
      return;
    }

    // Validate Same Supervisor Name??

    // Validate Email
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email");
      return;
    }

    // Validate Birth Date

    // Validate Phone length
    if (isNaN(phone)) {
      toast.error("Phone number must contain only digits");
      return;
    }

    onSubmit();
  };

  const onSubmit = () => {
    setLoading(true);
    /*
    console.log("First Name: " + first);
    console.log("Last Name: " + lastName);
    console.log("Email: " + email);
    console.log("Phone: " + phone);
    console.log("Birth Date: " + birthDate);
    console.log("Gender: " + gender);
    console.log("Position: " + positionTitle);
    console.log("Major of Study: " + major);
    */

    setTimeout(() => {
      toast.success("Supervisor added successfully");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <>
      <div class="block mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Add Supervisor
      </div>

      <form className="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          {/* Supervisor Name */}
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
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
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
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}
