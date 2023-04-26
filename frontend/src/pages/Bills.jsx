import React, { useState, useEffect } from "react";
import BillCard from "../components/BillCard";
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

const Bills = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [counter, setCounter] = useState(0);

  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [bills, setBills] = useState({
    customerName: "",
    billType: "",
    cashierName: "",
    itemName: "",
    price: "",
    quantity: "",
  });

  let name, value;

  let billNo = 0;

  const handleChange = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setBills({ ...bills, [name]: value });
  };

  let invoiceNumber = "INV270" + billNo;

  const fetchInfo = () => {
    return fetch("http://localhost:5000/api/bill/getBill")
      .then((res) => res.json())
      .then((d) => {
        setData(d); // getting the json data and updating the data using setData
        // setSearchResults(d); // updating the array of search results
      });
  };

  useEffect(() => {
    fetchInfo();
    // console.log(data);
  }, []);

  const addBill = () => {
    const { customerName, billType, cashierName, itemName, price, quantity } =
      bills;
    if (!bills) {
      alert("add required data for product");
    } else {
      // console.log("first");
      fetch("http://localhost:5000/api/bill/addBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // parsing the data that is to be sent to server
          customerName,
          billType,
          cashierName,
          itemName,
          price,
          quantity,
        }),
      }).then(() => {
        // console.log("hi");

        onClose();

        billNo = +1;

        fetchInfo();

        toast.success("New Bill Added", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    }
  };

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };
  const openBillPage1 = () => {
    navigate("/billSection1");
  };
  const openBillPage2 = () => {
    navigate("/billSection2");
  };
  const openBillPage3 = () => {
    navigate("/billSection3");
  };

  const deleteField = () => {
    setCounter(counter - 1);
  };

  const deleteBill = async (id) => {
    await fetch("http://localhost:5000/api/bill/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    fetchInfo();
    toast.error("Product Deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // getting the data from the form inputs

  // const inputArr = [
  //   {
  //     type: "text",
  //     id: 1,
  //     value: "",
  //   },
  // ];

  // const [arr, setArr] = useState(inputArr);

  // const addInput = () => {
  //   setArr((s) => {
  //     return [
  //       ...s,
  //       {
  //         type: "text",
  //         value: "",
  //       },
  //     ];
  //   });
  // };

  // const handleChange = (e) => {
  //   e.preventDefault();

  //   const index = e.target.id;
  //   setArr((s) => {
  //     const newArr = s.slice();
  //     newArr[index].value = e.target.value;
  //     return newArr;
  //   });
  // };

  return (
    <>
      <div className="text-4xl flex justify-center p-4 font-semibold">
        Bills Section
      </div>
      <section class="container mx-auto px-4">
        {/* <BillCard /> */}
        <div class="mt-6 flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        <button class="flex items-center gap-x-3 focus:outline-none">
                          <span>Invoice No.</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        class="px-12 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Customer Name
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Bill Type
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Edit
                      </th>

                      <th scope="col" class="relative px-4 py-3.5">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {/* {searchResults.map((dataObj, index) => { */}
                    {/* return ( */}
                    {/* <> */}
                    <tr>
                      <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                        <div>
                          <h2
                            class="font-medium text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
                            onClick={openBillPage1}
                          >
                            {/* {dataObj.itemName} */}
                            INV15001
                          </h2>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-12 py-4 text-sm ">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {/* {dataObj.quantity} */}
                            Anushka
                            <p className="hidden">
                              {/* {(totalQuantity += dataObj.quantity)} */}
                            </p>
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {/* Rs {dataObj.price} */}
                            12/12/2021
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                          {/* {dataObj.category} */}
                          New
                        </div>
                      </td>

                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-pencil-square mx-1 text-black cursor-pointer"
                            viewBox="0 0 16 16"
                            // onClick={() => editProduct(dataObj._id)}
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
                            class="bi bi-x-circle-fill text-red-600 cursor-pointer ml-3"
                            viewBox="0 0 16 16"
                            onClick={() => deleteBill(dataObj._id)}
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                    {data.map((dataObj, index) => {
                      return (
                        <>
                          <tr>
                            <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                              <div>
                                <h2
                                  class="font-medium text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
                                  onClick={openBillPage1}
                                >
                                  {invoiceNumber}
                                  {/* INV150 */}
                                </h2>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-12 py-4 text-sm ">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  {dataObj.customerName}
                                  {/* Rohit */}
                                  <p className="hidden">
                                    {/* {(totalQuantity += dataObj.quantity)} */}
                                  </p>
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  {/* Rs {dataObj.price} */}
                                  12/12/2021
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                                {dataObj.billType}
                                {/* New */}
                              </div>
                            </td>

                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div class="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  class="bi bi-pencil-square mx-1 text-black cursor-pointer"
                                  viewBox="0 0 16 16"
                                  // onClick={() => editProduct(dataObj._id)}
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
                                  class="bi bi-x-circle-fill text-red-600 cursor-pointer ml-3"
                                  viewBox="0 0 16 16"
                                  onClick={() => deleteBill(dataObj._id)}
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {/* Edit Modal */}
                    {/* <Modal isOpen={isEditOpen} onClose={onEditClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Edit Product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input
                                  value={product.itemName}
                                  onChange={handleChange}
                                  name="itemName"
                                  defaultValue={dataObj.itemName}
                                  type="text"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Input
                                  value={product.category}
                                  onChange={handleChange}
                                  name="category"
                                  defaultValue={dataObj.category}
                                  type="text"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                  value={product.price}
                                  onChange={handleChange}
                                  name="price"
                                  defaultValue={dataObj.price}
                                  type="number"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <Input
                                  defaultValue={dataObj.quantity}
                                  value={product.quantity}
                                  onChange={handleChange}
                                  name="quantity"
                                  // placeholder={dataObj.quantity}
                                  type="number"
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={editProduct}
                              >
                                Save Changes
                              </Button>
                              <ToastContainer />
                              <Button variant="ghost" onClick={onEditClose}>
                                Cancel
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal> */}
                    {/* </> */}
                    {/* ); })} */}
                  </tbody>
                  <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {/* {searchResults.map((dataObj, index) => { */}
                    {/* return ( */}
                    {/* <> */}
                    <tr>
                      <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                        <div>
                          <h2
                            class="font-medium text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
                            onClick={openBillPage2}
                          >
                            {/* {dataObj.itemName} */}
                            INV15002
                          </h2>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-12 py-4 text-sm ">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {/* {dataObj.quantity} */}
                            Diya
                            <p className="hidden">
                              {/* {(totalQuantity += dataObj.quantity)} */}
                            </p>
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {/* Rs {dataObj.price} */}
                            15/04/2022
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                          Return
                        </div>
                      </td>

                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-pencil-square mx-1 text-black cursor-pointer"
                            viewBox="0 0 16 16"
                            // onClick={() => editProduct(dataObj._id)}
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
                            class="bi bi-x-circle-fill text-red-600 cursor-pointer ml-3"
                            viewBox="0 0 16 16"
                            onClick={() => deleteBill(dataObj._id)}
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                    {data.map((dataObj, index) => {
                      return (
                        <>
                          <tr>
                            <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                              <div>
                                <h2
                                  class="font-medium text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
                                  onClick={openBillPage2}
                                >
                                  {invoiceNumber}
                                  {/* INV150 */}
                                </h2>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-12 py-4 text-sm ">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  {dataObj.customerName}
                                  {/* Rohit */}
                                  <p className="hidden">
                                    {/* {(totalQuantity += dataObj.quantity)} */}
                                  </p>
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  {/* Rs {dataObj.price} */}
                                  15/04/2022
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                                {dataObj.billType}
                                {/* New */}
                              </div>
                            </td>

                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div class="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  class="bi bi-pencil-square mx-1 text-black cursor-pointer"
                                  viewBox="0 0 16 16"
                                  // onClick={() => editProduct(dataObj._id)}
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
                                  class="bi bi-x-circle-fill text-red-600 cursor-pointer ml-3"
                                  viewBox="0 0 16 16"
                                  onClick={() => deleteBill(dataObj._id)}
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {/* Edit Modal */}
                    {/* <Modal isOpen={isEditOpen} onClose={onEditClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Edit Product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input
                                  value={product.itemName}
                                  onChange={handleChange}
                                  name="itemName"
                                  defaultValue={dataObj.itemName}
                                  type="text"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Input
                                  value={product.category}
                                  onChange={handleChange}
                                  name="category"
                                  defaultValue={dataObj.category}
                                  type="text"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                  value={product.price}
                                  onChange={handleChange}
                                  name="price"
                                  defaultValue={dataObj.price}
                                  type="number"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <Input
                                  defaultValue={dataObj.quantity}
                                  value={product.quantity}
                                  onChange={handleChange}
                                  name="quantity"
                                  // placeholder={dataObj.quantity}
                                  type="number"
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={editProduct}
                              >
                                Save Changes
                              </Button>
                              <ToastContainer />
                              <Button variant="ghost" onClick={onEditClose}>
                                Cancel
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal> */}
                    {/* </> */}
                    {/* ); })} */}
                  </tbody>
                  <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {/* {searchResults.map((dataObj, index) => { */}
                    {/* return ( */}
                    {/* <> */}
                    <tr>
                      <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                        <div>
                          <h2
                            class="font-medium text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
                            onClick={openBillPage3}
                          >
                            {/* {dataObj.itemName} */}
                            INV15003
                          </h2>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-12 py-4 text-sm ">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {/* {dataObj.quantity} */}
                            Adarsh
                            <p className="hidden">
                              {/* {(totalQuantity += dataObj.quantity)} */}
                            </p>
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {/* Rs {dataObj.price} */}
                            16/02/2020
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                          Cancel
                        </div>
                      </td>

                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-pencil-square mx-1 text-black cursor-pointer"
                            viewBox="0 0 16 16"
                            // onClick={() => editProduct(dataObj._id)}
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
                            class="bi bi-x-circle-fill text-red-600 cursor-pointer ml-3"
                            viewBox="0 0 16 16"
                            onClick={() => deleteBill(dataObj._id)}
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                    {data.map((dataObj, index) => {
                      return (
                        <>
                          <tr>
                            <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                              <div>
                                <h2
                                  class="font-medium text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
                                  onClick={openBillPage3}
                                >
                                  {invoiceNumber}
                                  {/* INV150 */}
                                </h2>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-12 py-4 text-sm ">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  {dataObj.customerName}
                                  {/* Rohit */}
                                  <p className="hidden">
                                    {/* {(totalQuantity += dataObj.quantity)} */}
                                  </p>
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  {/* Rs {dataObj.price} */}
                                  16/02/2020
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                                {dataObj.billType}
                                {/* New */}
                              </div>
                            </td>

                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div class="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  class="bi bi-pencil-square mx-1 text-black cursor-pointer"
                                  viewBox="0 0 16 16"
                                  // onClick={() => editProduct(dataObj._id)}
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
                                  class="bi bi-x-circle-fill text-red-600 cursor-pointer ml-3"
                                  viewBox="0 0 16 16"
                                  onClick={() => deleteBill(dataObj._id)}
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {/* Edit Modal */}
                    {/* <Modal isOpen={isEditOpen} onClose={onEditClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Edit Product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input
                                  value={product.itemName}
                                  onChange={handleChange}
                                  name="itemName"
                                  defaultValue={dataObj.itemName}
                                  type="text"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Input
                                  value={product.category}
                                  onChange={handleChange}
                                  name="category"
                                  defaultValue={dataObj.category}
                                  type="text"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                  value={product.price}
                                  onChange={handleChange}
                                  name="price"
                                  defaultValue={dataObj.price}
                                  type="number"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <Input
                                  defaultValue={dataObj.quantity}
                                  value={product.quantity}
                                  onChange={handleChange}
                                  name="quantity"
                                  // placeholder={dataObj.quantity}
                                  type="number"
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={editProduct}
                              >
                                Save Changes
                              </Button>
                              <ToastContainer />
                              <Button variant="ghost" onClick={onEditClose}>
                                Cancel
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal> */}
                    {/* </> */}
                    {/* ); })} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-2">
          <button
            class="flex w-fit shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-blue-500 sm:w-auto"
            onClick={onOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Generate Bill</span>
          </button>
        </div>

        {/* Add Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Bill</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={4}>
              <FormControl>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  value={bills.customerName}
                  className="mb-2"
                  onChange={handleChange}
                  name="itemName"
                  placeholder="john"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bill Type</FormLabel>
                <select
                  id="tags"
                  className="border-4 p-1 rounded-sm mb-2"
                  name="accountType"
                  onChange={handleChange}
                  type="text"
                  value={bills.billType}
                  // onChange={(e) => {
                  //   setTags(e.currentTarget.value);
                  // }}
                >
                  <option value="Admin">New</option>
                  <option value="Salesman">Return</option>
                  <option value="Sales manager">Cancelled</option>
                </select>
              </FormControl>
              <FormControl>
                <FormLabel>Cashier Name</FormLabel>
                <Input
                  value={bills.cashierName}
                  onChange={handleChange}
                  className="mb-2"
                  name="category"
                  placeholder="Anushka"
                  type="text"
                />
              </FormControl>
              <h2 className="font-semibold text-lg mt-4 mb-3">
                Add Product Details
              </h2>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  value={bills.itemName}
                  onChange={handleChange}
                  className="mb-2"
                  name="category"
                  placeholder="Product"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  value={bills.price}
                  onChange={handleChange}
                  className="mb-2"
                  name="category"
                  placeholder="$400"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={bills.quantity}
                  onChange={handleChange}
                  className="mb-2"
                  name="category"
                  placeholder="10"
                  type="text"
                />
              </FormControl>
              {Array.from(Array(counter)).map((c, index) => {
                {
                  /* {arr.map((item, i) => { */
                }
                return (
                  <>
                    <div key={c}>
                      <FormControl>
                        <FormLabel>
                          Product Name {(prodNum += 1)}
                          <button
                            className="text-red-500 ml-2"
                            onClick={() => deleteField()}
                          >
                            Delete
                          </button>
                        </FormLabel>
                        <Input
                          // value={product.category}
                          onChange={handleChange}
                          className="mb-2"
                          name="category"
                          placeholder="Anushka"
                          type="text"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Price</FormLabel>
                        <Input
                          // value={product.category}
                          onChange={handleChange}
                          className="mb-2"
                          name="category"
                          placeholder="$400"
                          type="text"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Quantity</FormLabel>
                        <Input
                          // value={product.category}
                          onChange={handleChange}
                          className="mb-2"
                          name="category"
                          placeholder="10"
                          type="text"
                        />
                      </FormControl>
                    </div>
                  </>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleClick}>
                Add Products
              </Button>
              <ToastContainer />
              <Button
                variant=""
                className="bg-blue-700 text-white"
                onClick={addBill}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
    </>
  );
};

export default Bills;
