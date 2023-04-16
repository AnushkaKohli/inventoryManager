import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuth }) => {
  let navigate = useNavigate();

  return (
    <>
      <nav class="bg-gray-100 border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" class="flex items-center">
            {/* <img src="" class="h-8 mr-3" alt="Flowbite Logo" /> */}
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              onClick={() => navigate("/")}
            >
              Inventory App
            </span>
          </a>
          <div class="flex md:order-2">
            {isAuth ? (
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/login")}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 ml-2 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </button>
              </>
            )}
            {/* <button
              data-collapse-toggle="navbar-cta"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button> */}
          </div>

          <div
            class="items-center justify-between w-fit md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            {isAuth ? (
              <ul class="flex flex-col font-medium p-4 sm:p-0 mt-4 border rounded-lg sm:flex-row sm:space-x-8 sm:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    class="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0"
                    aria-current="page"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={() => navigate("/admin")}
                  >
                    Admin Page
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={() => navigate("/bills")}
                  >
                    Bills
                  </a>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
