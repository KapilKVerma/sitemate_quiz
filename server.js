const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// SERVER PORT
const PORT = 5500;

app.use(express.json());
app.use(cors());

// Serving React Frontend
app.use(express.static(path.join(__dirname, "client", "build")));

// Sercing client for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// List of items to perform CRUD operation
let items = [
  {
    id: 1,
    title: "article 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

// ***APPLICATION ROUTES***
// Route to get all the objects
app.get("/list", async (req, res) => {
  console.log("route reached to get all objects");
  res.status(200).json(items);
});

// Route to register new object
app.post("/new", async (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;
  const newItemId = items.length + 1;
  const newItem = { id: newItemId, title, description };
  items.push(newItem);
  res.status(200).json({ message: "created" });
});

// Route to update an object by ID
app.put("/update/:id", async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "updated" });
});

// Route to delete an object by ID
app.delete("/delete/:id", async (req, res) => {
  let itemsList = items;
  let result = itemsList.filter((item) => item.id !== parseInt(req.params.id));
  console.log(result);
  res.status(200).json({ message: "delete" });
});

app.listen(PORT, () => {
  console.log("App is running on port:", PORT);
});
