const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const bcryptjs = require("bcryptjs")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const authenticate = require("./auth")
const cors = require("cors");
const app = express();
app.use(cors());

require("./schema")

const User = require("./schema")
router.use(cookieParser())

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    therapist: {
        type: String,
        required: true,
    },
    status: {
        type: String
    }
});

const Appointment = mongoose.model('appointment', appointmentSchema);


//Register
router.post('/registeruser', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all information to continue" });
    } else if (password !== cpassword) {
        return res.status(422).json({ error: "Password and cpassword are not the same." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(421).json({ error: "Email already exists" });
        }

        const hashedPassword = User.hashPassword(password);
        const user = new User({
            name,
            email,
            isTherapist: false,
            phone,
            password: hashedPassword,
            cpassword: hashedPassword
        });

        await user.save();
        console.log("Registered new user");
        res.json({ message: "Registered user successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get("/therapists", async (req, res) => {
    try {
        const therapists = await User.find({ isTherapist: true });
        res.json({ therapists });
        console.log(therapists);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/registerdr', async (req, res) => {
    const { name, email, phone, password, cpassword, availableSlots } = req.body;

    if (!name || !email || !phone || !password || !cpassword || !availableSlots) {
        return res.status(422).json({ error: "Fill all information to continue" });
    } else if (password !== cpassword) {
        return res.status(422).json({ error: "Password and cpassword are not the same." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(421).json({ error: "Email already exists" });
        }

        const hashedPassword = User.hashPassword(password);
        const user = new User({
            name,
            email,
            isTherapist: true,
            phone,
            password: hashedPassword,
            cpassword: hashedPassword,
            availableSlots,
        });

        await user.save();
        console.log("Registered therapist user");
        res.json({ message: "Registered therapist successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});




//Handing login 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Enter all information" });
        }

        const user = await User.findOne({ email: email });

        if (user) {
            // Email exists, now check the password
            const passwordMatch = await bcryptjs.compare(password, user.password);

            if (passwordMatch) {
                const token = await user.generateAuthToken();
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 186400000),
                    httpOnly: true
                });
                if (user.isTherapist)
                    return res.status(200).json({ message: "Therapist login successful.", therapist: true });
                else
                    return res.status(200).json({ message: "User login successful." });
            } else {
                return res.status(421).json({ error: "Invalid password" });
            }
        } else {
            return res.status(401).json({ error: "User does not exist." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/myprofile', authenticate, (req, res) => {
    console.log("myprofile");
    res.send(req.rootUser)
})

router.get('/getdata', authenticate, (req, res) => {
    console.log("Getting data");
    // console.log(req.rootUser)
    res.json(req.rootUser)
})

router.post('/contact', authenticate, async (req, res) => {

    try {

        const { name, email, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Please fill contact form" })
        }

        const userContact = await User.findOne({ _id: req.UserID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, message);

            await userContact.save()

            res.status(201).json({ message: "Contact successful" })
        }
    }
    catch (err) {
        console.log(err)
    }
})


router.get('/logout', (req, res) => {
    console.log("Logout page");
    res.clearCookie("jwttoken", { path: '/' })
    res.status(200).send("logged out")
})

router.get('/appointments', authenticate, async (req, res) => {
    try {
        const curr_user = req.rootUser;
        const userEmail = curr_user.email; // Get the email of the current user

        if (req.rootUser.isTherapist) {
            // Therapist logic
            const sessionRequests = await Appointment.find({ therapist: userEmail }).populate('user', 'name');
            res.json({ sessionRequests });
        } else {
            // User logic
            const userAppointments = await Appointment.find({ user: userEmail });
            res.json({ userAppointments });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// router.post('/bookappointment', authenticate, async (req, res) => {
//     try {
//         const { time, therapistEmail } = req.body;

//         if (!time || !therapistEmail) {
//             return res.status(400).json({ error: "Please provide time and therapist email" });
//         }

//         // Check if the therapist exists
//         const therapist = await User.findOne({ email: therapistEmail, isTherapist: true });
//         if (!therapist) {
//             return res.status(400).json({ error: "Invalid therapist email" });
//         }

//         // Find the selected time slot in the therapist's available slots
//         const selectedSlot = therapist.availableSlots.find(slot =>
//             slot.startTime.getTime() === new Date(time).getTime()
//         );

//         if (!selectedSlot) {
//             return res.status(400).json({ error: "Selected time slot is not available" });
//         }

//         let therapistmail = therapist.email;
//         let userEmail = req.rootUser.email;

//         // Create a new appointment
//         const appointment = new Appointment({
//             time: time,
//             user: userEmail,
//             therapist: therapistmail,
//         });

//         console.log(appointment);

//         await appointment.save();
//         res.status(201).json({ message: "Appointment booked successfully" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
router.post("/requestappointment", async (req, res) => {
    try {
        const { date, time, user, therapist } = req.body;

        const appointment = new Appointment({
            date: date,
            time: time, // Combine the date and time into a single Date object
            user,
            therapist,
            status: "requested", // Set the default status to "requested"
        });

        await appointment.save();

        res.json({ message: "Appointment requested successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to request appointment" });
    }
});

module.exports = router;