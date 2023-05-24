const jwt = require("jsonwebtoken")
const User = require("./schema")
const cors = require("cors");
const express = require("express")
const app = express();
app.use(cors());
const authenticate = async (req, res, next) => {
    // const secretkey =  process.env.secretkey;
    const secretkey =  "innercalm" ;
    try {
        const token = req.cookies.jwttoken;
        const veryifyToken = jwt.verify(token, secretkey);
        
        const rootUser = await User.findOne({_id:veryifyToken._id, "tokens.token":token})
        if(!rootUser){
            throw new Error("User not found")
        }

        // console.log(rootUser)

        req.token = token;
        req.rootUser = rootUser
        req.UserID = rootUser._id

        next();
    }
    catch (err) {
        console.log(err)
        res.status(401).send({error : "Unauthorized"})
    }
}

module.exports = authenticate