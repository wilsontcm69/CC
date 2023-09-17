import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/TARUMT-Logo.png";
import ThemeToggle from "../components/ThemeToggle";
import toast from "react-hot-toast";

export default function StudentHome() {
  const navigate = useNavigate();
  const status = 1;
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [allowance, setAllowance] = useState("");
  const [comAcceptanceForm, setComAcceptanceForm] = useState("");
  const [parentAckForm, setParentAckForm] = useState("");
  const [indemnity, setIndemnity] = useState("");
  const [hiredEvidence, setHiredEvidence] = useState("");
  const [loading, setLoading] = useState(false);

  const dummyCompany = [
    {
      name: "Aeon Co. (M) Bhd.",
      address: "No. 1, Jalan 1, Taman 1, 11111 Kuala Lumpur",
    },
    {
      name: "Joah",
      address: "No. 2, Jalan 2, Taman 2, 22222 Kuala Lumpur",
    },
    {
      name: "TARUC",
      address: "No. 3, Jalan 3, Taman 3, 33333 Kuala Lumpur",
    },
    {
      name: "XYZ Corporation",
      address: "123 Main Street, Suite 456, Cityville, 54321",
    },
    {
      name: "ABC Industries",
      address: "456 Elm Avenue, Apt 789, Townsville, 98765",
    },
    {
      name: "Tech Innovators Inc.",
      address: "789 Oak Road, Unit 101, Techville, 12345",
    },
    {
      name: "Greenfield Farms Ltd.",
      address: "101 Willow Lane, Farmville, 67890",
    },
  ];

  const validateInput = () => {
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

    if (supervisorName === "") {
      toast.error("Please enter supervisor name");
      return;
    }

    if (supervisorEmail === "") {
      toast.error("Please enter supervisor email");
      return;
    }

    if (!emailRegex.test(supervisorEmail)) {
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

    onSubmit();
  };

  const onSubmit = () => {
    setLoading(true);
    console.log("companyName: ", companyName);
    console.log("companyAddress: ", companyAddress);
    console.log("supervisorName: ", supervisorName);
    console.log("supervisorEmail: ", supervisorEmail);
    console.log("allowance: ", allowance);
    console.log("comAcceptanceForm: ", comAcceptanceForm);
    console.log("parentAckForm: ", parentAckForm);
    console.log("indemnity: ", indemnity);
    console.log("hiredEvidence: ", hiredEvidence);

    setTimeout(() => {
      toast.success("Submit successfully");
      setLoading(false);
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    dummyCompany.map((company) => {
      if (company.name === companyName) {
        setCompanyAddress(company.address);
      }
    });
  }, [companyName]);

  return (
    <>
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="flex items-center">
              <img src={Logo} class="mr-3 h-6 sm:h-9" alt="Logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
                TARUMT Internship Portal
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={() => {
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

      <main class="p-4 h-auto sm:p-6 xl:px-28 xl:py-8">
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
                <dd class="text-base font-semibold">
                  JUNE 2021 YR1 ENTRY (20/11/2023 - 5/5/2024)
                </dd>
              </div>
              <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Intern Period
                </dt>
                <dd class="text-base font-semibold">
                  20 Nov 2023 - 05 May 2024
                </dd>
              </div>
              <div class="flex flex-col pt-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Remark
                </dt>
                <dd class="text-base font-semibold">-</dd>
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
                <dd class="text-base font-semibold">MOHD RIDZUAN BIN AHMAD</dd>
              </div>
              <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  University Supervisor Email
                </dt>
                <dd class="text-base font-semibold">
                  mohdridzuana@tarc.edu.my
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* Company Details */}
        <div class="bg-white rounded-lg dark:bg-gray-800 h-auto p-6 shadow-lg mb-4">
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
              <input
                list="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select a company"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <datalist id="countries">
                {dummyCompany.map((company) => (
                  <option value={company.name} />
                ))}
              </datalist>
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
                  onChange={(e) => setSupervisorName(e.target.value)}
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
                  onChange={(e) => setSupervisorEmail(e.target.value)}
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
                  />
                </div>
              </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Company Acceptance Form
                </label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e) => setComAcceptanceForm(e.target.value)}
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Parent Acknowledgement Form
                </label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e) => setParentAckForm(e.target.value)}
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Letter of Indemnity
                </label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e) => setIndemnity(e.target.value)}
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Hired Evidence{" "}
                  <span class="text-xs font-light">(Optional)</span>
                </label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e) => setHiredEvidence(e.target.value)}
                />
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
        </div>
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
