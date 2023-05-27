const express = require("express");
const mongoose = require("mongoose")
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");
app.use(cors());

app.use(cors({
  origin: "https://innercalm-network.netlify.app",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

app.use(express.json())


// const db =  process.env.DATABASE;
const db = "mongodb+srv://innercalm:innercalm@innercalm.hyeb5s1.mongodb.net/test";
const port = process.env.PORT || 5050


mongoose.set("strictQuery", true)
mongoose.connect(db).then(() => { console.log("Connection successful") }).catch((err) => { if (err) console.log(err) })


// const User = require("./models/UserSchema")

app.use(require("./routes"));

app.listen(port, () => { console.log("Server running at port : ", port) })
