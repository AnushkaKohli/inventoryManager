import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// import Table from "../components/Table";
// import { product } from "../product";
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

const Dashboard = () => {
  const [data, setData] = useState([]); //product data from backend
  const [searchResults, setSearchResults] = useState([]);
  const [product, setProduct] = useState({
    itemName: "",
    category: "",
    price: "",
    quantity: "",
  }); //product data to be added
  const [edit, setEdit] = useState({
    itemName: "",
    category: "",
    price: "",
    quantity: "",
  }); //product data to be added

  let name, value; //declaring the variable

  const handleChange = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setProduct({ ...product, [name]: value });
    setEdit({ ...edit, [name]: value });
    // setProduct({ ...product, [name]: "" });
  };

  let navigate = useNavigate();

  const fetchInfo = () => {
    return fetch("http://localhost:5000/api/admin/getProducts")
      .then((res) => res.json())
      .then((d) => {
        setData(d); // getting the json data and updating the data using setData
        setSearchResults(d); // updating the array of search results
      });
  };

  useEffect(() => {
    fetchInfo();
    // console.log(data);
  }, []);

  // console.log(searchResults);
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
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const getProducts = async () = {

  //     setProducts(product.map)
  //   }
  // })

  // getting the name and value for all inputs and then updating the state using setProduct

  const addProduct = () => {
    const { itemName, category, price, quantity } = product; //getting the value for each property from the state (product)

    if (!product) {
      alert("add required data for product");
    } else {
      // console.log("first");
      fetch("http://localhost:5000/api/admin/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // parsing the data that is to be sent to server
          itemName,
          category,
          price,
          quantity,
        }),
      }).then(() => {
        // console.log("hi");

        onAddClose();
        let msg = `Product ${itemName} added successfully`;

        toast.success("Product Added", {
          position: toast.POSITION.TOP_CENTER,
        });

        fetchInfo();
      });
    }
  };

  const editProduct = (id) => {
    console.log("editing ...");
    onEditOpen();
    // const { itemName, category, price, quantity } = dataObj;
  };

  const deleteProduct = async (id) => {
    // console.log("product deletes");
    // useEffect(() => {
    // DELETE request using fetch with async/await
    // async function deletePost() {
    await fetch("http://localhost:5000/api/admin/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    fetchInfo();

    // let msg = ``

    toast.error("Product Deleted", {
      position: toast.POSITION.TOP_CENTER,
    });

    // setStatus("Delete successful");
  };

  // const notify = () => toast("Wow so easy!");

  // const totalInventoryValue = (price, quantity) => {
  // }

  let totalInventoryValue = 0;

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(data);

    const resultsArray = data.filter(
      (data) =>
        data.itemName.includes(e.target.value) ||
        data.category.includes(e.target.value)
    );

    setSearchResults(resultsArray);
  };

  // deletePost();
  // window.location.reload();
  // }, []);
  // };

  return (
    <>
      <div className="text-4xl flex justify-center p-4 font-semibold">
        Inventory Dashboard
      </div>
      {/* <button onClick={notify}>notify</button> */}
      <ToastContainer />
      <section class="container mx-auto px-4">
        {/* <div class="sm:flex sm:items-center sm:justify-between">
          <div class="mt-4 flex items-center gap-x-3">
            <button class="flex w-1/2 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto">
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

              <span>Add product</span>
            </button>
          </div>
        </div> */}

        <div class="mt-6 md:flex md:items-center md:justify-between">
          <div class="relative mt-4 flex items-center md:mt-0">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                // onClick={searchQuery}
                class="mx-3 h-5 w-5 text-gray-400 dark:text-gray-600"
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
              class="block w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-11 pr-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 rtl:pl-5 rtl:pr-11 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:w-80"
            />
          </div>

          <button
            class="flex w-1/2 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
            onClick={onAddOpen}
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

            <span>Add product</span>
          </button>
          {/* Add Modal */}
          <Modal isOpen={isAddOpen} onClose={onAddClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    value={product.itemName}
                    onChange={handleChange}
                    name="itemName"
                    placeholder="product X"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input
                    value={product.category}
                    onChange={handleChange}
                    name="category"
                    placeholder="Electric"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    value={product.price}
                    onChange={handleChange}
                    name="price"
                    placeholder="$499"
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    value={product.quantity}
                    onChange={handleChange}
                    name="quantity"
                    placeholder="0"
                    type="number"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={addProduct}>
                  Add
                </Button>
                <ToastContainer />
                <Button variant="ghost" onClick={onAddClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

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
                          <span>Product</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        class="px-12 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Value
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
                    {searchResults.map((dataObj, index) => {
                      return (
                        <>
                          <tr>
                            <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                              <div>
                                <h2 class="font-medium text-gray-800 dark:text-white">
                                  {dataObj.itemName}
                                </h2>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
                              <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                                {dataObj.category}
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  Rs {dataObj.price}
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  {dataObj.quantity}
                                </h4>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-4 py-4 text-sm">
                              <div>
                                <h4 class="text-gray-700 dark:text-gray-200">
                                  Rs. {dataObj.quantity * dataObj.price}
                                  <p className="hidden">
                                    {
                                      (totalInventoryValue +=
                                        dataObj.quantity * dataObj.price)
                                    }
                                  </p>
                                </h4>
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
                                  onClick={() => editProduct(dataObj._id)}
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
                                  onClick={() => deleteProduct(dataObj._id)}
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                              </div>
                            </td>
                          </tr>
                          {/* Edit Modal */}
                          <Modal isOpen={isEditOpen} onClose={onEditClose}>
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
                          </Modal>
                        </>
                      );
                    })}
                    {/* <tr>
                      <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            Product one
                          </h2>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
                        <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                          Fan
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            $ 450
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-pencil-square mx-1 text-black"
                            viewBox="0 0 16 16"
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
                            class="bi bi-x-circle-fill text-red-600"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            Product one
                          </h2>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
                        <div class="inline gap-x-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          Churned
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            $ 450
                          </h4>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-4 py-4 text-sm">
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-pencil-square mx-1 text-black"
                            viewBox="0 0 16 16"
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
                            class="bi bi-x-circle-fill text-red-600"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <button onClick={notify}> Notify </button> */}
        <div class="flex justify-center items-center mt-5">
          <div class="bg-gray-50 p-4 rounded-lg w-fit text-xl font-medium shadow-lg text-blue-500">
            Total Inventory Value = {totalInventoryValue}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
