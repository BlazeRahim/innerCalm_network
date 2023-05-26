import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavB from "../components/NavB";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      window.alert("Enter Details");
      return;
    }

    try {
      const res = await fetch("https://innercalm-network-server.onrender.com/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
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
        window.alert("Kindly register");
      } else if (res.status === 421 || !data) {
        window.alert("Incorrect details");
      } else {
        navigate("/appointments");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavB />
      <div className="loginpage">
        <div className="loginform">
          <h3>Login</h3>
          <form onSubmit={loginUser}>
            <div className="detailslogin">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder=""
                className="form-input"
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder=""
                className="form-input"
              />

              <input
                type="submit"
                value="Login"
                className="submit-btn"
              />
            </div>
          </form>
          <p className="regline">
            New User?{" "}
            <Link className="registerLink" to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;