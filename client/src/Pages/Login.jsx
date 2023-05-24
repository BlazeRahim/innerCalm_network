import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import NavB from "../components/NavB";

const Login = () => {
    /* eslint-disable no-unused-vars */
    /* eslint-enable no-unused-vars */

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {

        e.preventDefault()

        // const res = await fetch("/loginuser", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email,password
        //     })

        // });

        if (email === "" || password === "") {
            window.alert("Enter Details")
            return
        }

        const res = await fetch("/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            console.log("Error:", res.status, res.statusText);
            // Handle the error appropriately
        } else {
            // Process the successful response
        }
        if (res.status === 401 || !data) {
            window.alert("Kindly register")
        }
        else if (res.status === 421 || !data) {
            window.alert("Incorrect details")
        }
        else {
            navigate("/appointments")
        }

    }


    return (
        <>
            <NavB />
            <div className="login">
                <div className="loginform">
                    <h3>Login</h3>
                    <form method="post">
                        <div className="detailslogin">
                            <input type="text" name="email" onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                                value={email}
                                placeholder="Enter your email"
                                className="form-input" />

                            <input type="password" name="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                                value={password}
                                placeholder="Enter your password"
                                className="form-input" />
                            <input onClick={loginUser} type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login