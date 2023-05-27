const express = require("express");
const mongoose = require("mongoose")
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://innercalm-network.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


// const db =  process.env.DATABASE;
const db = "mongodb+srv://innercalm:innercalm@innercalm.hyeb5s1.mongodb.net/test";
const port = process.env.PORT || 5050


mongoose.set("strictQuery", true)
mongoose.connect(db).then(() => { console.log("Connection successful") }).catch((err) => { if (err) console.log(err) })


// const User = require("./models/UserSchema")

app.use(require("./routes"));

app.listen(port, () => { console.log("Server running at port : ", port) })
