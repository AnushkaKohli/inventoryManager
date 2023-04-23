import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

// import Table from "../components/Table";
import { user } from "../user";

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "",
  });

  let name, value;

  const handleChange = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value }); //
  };

  const callAdminPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/getUsers", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // credentials: "include",
      })
        .then((res) => res.json())
        .then((d) => {
          setData(d);
          setSearchResults(d);
        });
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  // fetching all the users from the database
  // const callAdminPage = () => {
  //   return fetch("http://localhost:5000/api/users/getUsers")
  //     .then((res) => res.json())
  //     .then((d) => {
  //       setData(d);
  //       setSearchResults(d);
  //     });
  // };

  useEffect(() => {
    callAdminPage();
  }, []);

  console.log(searchResults);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const addUser = async () => {
    // e.preventDefault();

    const { name, email, password, accountType } = user; //getting the value for each property from the state (product)
    if (!user) {
      alert("fill the data");
    } else {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // parsing the data that is to be sent to server
          name,
          email,
          password,
          accountType,
        }),
      });
      callAdminPage();

      let msg = `User ${name} added successfully`;

      toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
      });

      onAddClose();
    }
  };

  const editUser = () => {
    console.log("editing ...");
    onEditOpen();
  };

  const deleteUser = async (id) => {
    await fetch("http://localhost:5000/api/users/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    callAdminPage();
    toast.error("Product Deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSearchChange = (e) => {
    const resultsArray = data.filter(
      (data) =>
        data.name.includes(e.target.value) ||
        data.accountType.includes(e.target.value)
    );

    setSearchResults(resultsArray);
  };

  return (
    <>
      <div className="text-4xl flex justify-center p-4 font-semibold">
        Users Dashboard
        <div className="inline rounded-full bg-gray-100 py-2 ml-2 px-5 text-lg font-normal text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          {JSON.parse(localStorage.getItem("credentials")).accountType} View
        </div>
      </div>
      <ToastContainer />
      <section className="container mx-auto px-4">
        {/* <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mt-4 flex items-center gap-x-3">
            <button className="flex w-1/2 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Add product</span>
            </button>
          </div>
        </div> */}

        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className="relative mt-4 flex items-center md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mx-3 h-5 w-5 text-gray-400 dark:text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-11 pr-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 rtl:pl-5 rtl:pr-11 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:w-80"
            />
          </div>

          <button
            className="flex w-1/2 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
            onClick={onAddOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Add User</span>
          </button>
          {/* Add modal */}
          <Modal isOpen={isAddOpen} onClose={onAddClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add User</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="johndoe"
                    onChange={handleChange}
                    name="name"
                    type="text"
                    value={user.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="johndoe@gmail.com"
                    onChange={handleChange}
                    name="email"
                    type="email"
                    value={user.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="******"
                    onChange={handleChange}
                    name="password"
                    type="text"
                    value={user.password}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>User Type</FormLabel>
                  <select
                    id="tags"
                    className="border-4 p-1 rounded-sm"
                    name="accountType"
                    onChange={handleChange}
                    type="text"
                    value={user.accountType}
                    // onChange={(e) => {
                    //   setTags(e.currentTarget.value);
                    // }}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Salesman">Salesman</option>
                    <option value="Sales manager">SalesManager</option>
                    <option value="Inventory manager">InventoryManager</option>
                  </select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={addUser}>
                  Save
                </Button>
                <Button variant="ghost" onClick={onAddClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isEditOpen} onClose={onEditClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add User</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="johndoe"
                    onChange={handleChange}
                    name="name"
                    type="text"
                    value={user.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="johndoe@gmail.com"
                    onChange={handleChange}
                    name="email"
                    type="email"
                    value={user.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="******"
                    onChange={handleChange}
                    name="password"
                    type="text"
                    value={user.password}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>User Type</FormLabel>
                  <select
                    id="tags"
                    className="border-4 p-1 rounded-sm"
                    name="accountType"
                    onChange={handleChange}
                    type="text"
                    value={user.accountType}
                    // onChange={(e) => {
                    //   setTags(e.currentTarget.value);
                    // }}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Salesman">Salesman</option>
                    <option value="Sales manager">SalesManager</option>
                    <option value="Inventory manager">InventoryManager</option>
                  </select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={addUser}>
                  Save
                </Button>
                <Button variant="ghost" onClick={onEditClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-3 focus:outline-none">
                          <span>Email</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        User Type
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Username
                      </th>

                      {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Password
                      </th> */}
                      {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Created on
                      </th> */}

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Edit
                      </th>

                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {searchResults.map((dataObj, index) => {
                      return (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white">
                                {dataObj.email}
                              </h2>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                            {/* {dataObj.accountType === "Admin" ? ( */}
                            {/* <div className="inline gap-x-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-normal text-red-600 dark:bg-gray-800 dark:text-gray-400">
                                  {dataObj.accountType}
                                </div> */}

                            <div className="inline gap-x-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                              {dataObj.accountType}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm">
                            <div>
                              <h4 className="text-gray-700 dark:text-gray-200">
                                {dataObj.name}
                              </h4>
                            </div>
                          </td>
                          {/* <td className="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 className="text-gray-700 dark:text-gray-200">
                                  {dataObj.password}
                                </h4>
                              </div>
                            </td> */}
                          {/* <td className="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 className="text-gray-700 dark:text-gray-200">
                                  {dataObj.createdAt}
                                </h4>
                              </div>
                            </td> */}
                          <td className="whitespace-nowrap px-4 py-4 text-sm">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-pencil-square mx-1 text-black cursor-pointer"
                                viewBox="0 0 16 16"
                                onClick={editUser}
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-x-circle-fill text-red-600 cursor-pointer ml-3"
                                viewBox="0 0 16 16"
                                onClick={() => deleteUser(dataObj._id)}
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                              </svg>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
