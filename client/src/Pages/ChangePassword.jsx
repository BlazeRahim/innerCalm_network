import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [userData, setuser] = useState({});
  const callAuth = async () => {
    try {
      const resFromBack = await fetch("https://innercalm-network-server.onrender.com/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const userData = await resFromBack.json();
      setuser(userData);
      if (!userData.name) {
        alert("Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callAuth();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      window.alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch("https://innercalm-network-server.onrender.com/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword, email: userData.email }),
        credentials: "include",
      });

      if (response.ok) {
        window.alert("Password changed successfully!");
        navigate("/myprofile");
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        window.alert("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      window.alert("Failed to change password. Please try again.");
    }
  };

  return (
      <>
        <Nav />
    <div style={containerStyle}>
      <h2 style={headingStyle}>Change Password</h2>
      <form onSubmit={handleChangePassword} style={formStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="oldPassword" style={labelStyle}>
            Old Password:&nbsp;
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="newPassword" style={labelStyle}>
            New Password:&nbsp;
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="confirmNewPassword" style={labelStyle}>
            Confirm New Password: &nbsp;
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={buttonContainerStyle}>
          <button type="submit" style={submitButtonStyle}>
            Change Password
          </button>
        </div>
      </form>
    </div>
      </>
  );
};

export default ChangePassword;

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px",
  marginTop :"50px"
};

const headingStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const inputContainerStyle = {
  marginBottom: "10px",
};

const labelStyle = {
  fontWeight: "bold",
};

const inputStyle = {
  padding: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "300px",
};

const buttonContainerStyle = {
  marginTop: "20px",
};

const submitButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

