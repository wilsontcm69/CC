import React from "react";
import WelcomeBanner from "../components/WelcomeBanner";

export default function Home() {
  return (
    <>
      {/* Welcome banner */}
      <WelcomeBanner />

      <section class="dark:bg-gray-900">
        <div class="py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* Company */}
            <div class="flex flex-col p-12 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-14 dark:bg-gray-800 dark:text-white hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
              <h3 class="mb-4 text-4xl font-semibold"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Company</span></h3>
              <div class="flex justify-center items-baseline my-12 px-24">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
              <a
                href="/Dashboard/AddCompany"
                class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 mb-4"
              >
                Add
              </a>
              <a
                href="/Dashboard/ViewCompany"
                class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
              >
                View
              </a>
            </div>
            {/* Supervisor */}
            <div class="flex flex-col p-12 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-14 dark:bg-gray-800 dark:text-white hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            <h3 class="mb-4 text-4xl font-semibold"><span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Supervisor</span></h3>
              <div class="flex justify-center items-baseline my-12 px-24">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <a
                href="/Dashboard/AddSupervisor"
                class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 mb-4"
              >
                Add
              </a>
              <a
                href="/Dashboard/ViewSupervisor"
                class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
              >
                View
              </a>
            </div>
            {/* Student */}
            <div class="flex flex-col p-12 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-14 dark:bg-gray-800 dark:text-white hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            <h3 class="mb-4 text-4xl font-semibold"><span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Student</span></h3>
              <div class="flex justify-center items-baseline my-12 px-24">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
              </div>
              <a
                href="/Dashboard/AddStudent"
                class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 mb-4"
              >
                Add
              </a>
              <a
                href="/Dashboard/ViewStudent"
                class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
              >
                View
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
