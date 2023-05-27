const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.options('*', cors({
  origin: "https://innercalm-network.netlify.app",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
}));

app.use(cors({
  origin: "https://innercalm-network.netlify.app",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isTherapist: { type: Boolean, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    speciality: { type: String},
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            message: { type: String }
        }
    ],
    tokens: [
        {
            token:
            {
                type: String, required: true
            }
        }],
    availableSlots: [
        {
            startTime: {
                type: Date,
                required: true,
            },
            endTime: {
                type: Date,
                required: true,
            },
        },
    ],
})





//middleware
//hashing the password
userSchema.statics.hashPassword = function (password) {
    return bcryptjs.hashSync(password, 12);
};

// We are generating Token

userSchema.methods.generateAuthToken = async function () {
    // const secretkey =  process.env.secretkey;
    const secretkey = "innercalm";
    try {
        let token = jwt.sign({ "_id": this._id }, secretkey)   //payloaddata, secretkey
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;
    }
    catch (err) {
        console.log(err)
    }
}

//message storing code

userSchema.methods.addMessage = async function (name, email, message) {

    try {
        this.messages = this.messages.concat({ name, email, message })
        await this.save()
        return this.messages
    }
    catch (err) {
        console.log(err)
    }
}

const User = mongoose.model("user", userSchema);
module.exports = User;
// {
    //     name:    "Himanshu Kothari"
    //     email: "hkothari247@gmail.com"
    //     phone: 8779035327
    //     work: "Developer"
    //     password: "iamhk12"
    //     cpassword: "iamhk12"
    // }
