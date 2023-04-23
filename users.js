// APIs
//PRODUCT - add, delete, update price(patch)
//User - add, delete

// const admin = [
//   {
//     email: "johndoe@gmail.com",
//     password: "123456",
//     username: "",
//     role: "admin",
//     perms: [addUser, addItem, changePrice],
//   },
//   {
//     email: "salesman@gmail.com",
//     password: "12345678",
//     username: "",
//     role: "salesman",
//     perms: [checkStatus, searchItem, newBill, cancelBill, returnBill],
//   },
//   {
//     email: "inventorymanager@gmail.com",
//     password: "123446",
//     username: "",
//     role: "inventoryManager",
//     perms: [checkItemsAval, inventoryReport],
//   },
//   {
//     email: "salemanager@gmail.com",
//     password: "123446",
//     username: "",
//     role: "inventoryManager",
//     perms: [checkItemsAval, inventoryReport],
//   },
// ];

// github copilot
function calculateDaysBetweenDates(begin, end) {
  let diff = Math.abs(end.getTime() - begin.getTime());
  const hrs = Math.ceil(diff / (1000 * 60 * 60));
  const mins = Math.ceil(diff / (1000 * 60));
  console.log(hrs);
  console.log(mins);
}

// write a function that takes in a string and returns the number of vowels in the string
function vowels(str) {
  let count = 0;
  const checker = ["a", "e", "i", "o", "u"];
  for (let char of str.toLowerCase()) {
    if (checker.includes(char)) {
      count++;
    }
  }
  //   return count;
  console.log(count);
}

vowels("chutiyaa sala");
