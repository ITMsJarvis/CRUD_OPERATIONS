let express = require("express");
const app = express();
const cors = require("cors");
let path = require("path");
app.use(cors());
app.use(express.json());
let todos = [];
let PORT = process.env.PORT || 3000;
app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  let current = req.body;
  let addId = { ...current, id: Math.floor(Math.random() * 110000) };
  todos.push(addId);
  res.status(201).send(addId);
});

app.get("/todos/:id", (req, res) => {
  let idVal = req.params.id;
  let value = todos.find((x) => x.id == idVal);
  res.send(value);
});
app.put("/todos/:id", (req, res) => {
  let idVal = req.params.id;
  let value = todos.find((x) => x.id == idVal);
  if (!value) {
    res.send("404");
  } else {
    value.title = req.body.title;
    value.description = req.body.description;
    res.json(value);
  }
});
app.delete("/todos/:id", (req, res) => {
  let idVal = req.params.id;
  let filtered = todos.filter((x) => x.id != idVal);
  todos = filtered;
  res.send("Deleted");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// //for all other routes 404 error
// app.use((req,res,next)=> {
//   res.status(404).send()
// })
app.listen(PORT, () => {
  console.log("Your port is working", PORT);
});
