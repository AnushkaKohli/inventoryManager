// APIs
//PRODUCT - add, delete, update price(patch)
//User - add, delete

const admin = [
    {
        email: "johndoe@gmail.com",
        password: "123456",
        username: "",
        role: "admin",
        perms: [addUser, addItem, changePrice]
    },
    {
        email: "salesman@gmail.com",
        password: "12345678",
        username: "",
        role: "salesman",
        perms: [checkStatus, searchItem, newBill, cancelBill, returnBill]
    },
    {
        email: "inventorymanager@gmail.com",
        password: "123446",
        username: "",
        role: "inventoryManager",
        perms: [checkItemsAval, inventoryReport]
    },
    {
        email: "salemanager@gmail.com",
        password: "123446",
        username: "",
        role: "inventoryManager",
        perms: [checkItemsAval, inventoryReport]
    },
]