import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "./apppoint.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState(null); // Initialize with null
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [userData, setuser] = useState({});
  // eslint-disable-next-line
  const callAuth = async () => {
    console.log("call auth");
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
      console.log(userData);
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
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://innercalm-network-server.onrender.com/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setAppointments(data.userAppointments);
    } catch (error) {
      console.log(error);
      // Handle the error condition
      setAppointments([]);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const getStatusClassNameCard = (status) => {
    if (status === "Approved") {
      return "statusApproved";
    } else if (status === "Rejected") {
      return "statusRejected";
    } else if (status.toLowerCase() === "requested") {
      return "statusRequested";
    } else if (status === "Completed") {
      return "statusCompleted";
    } else {
      return "";
    }
  };

  const getStatusClassNameSpan = (status) => {
    if (status === "Approved") {
      return "approved_span";
    } else if (status === "Rejected") {
      return "rejected_span";
    } else if (status.toLowerCase() === "requested") {
      return "requested_span";
    } else if (status === "Completed") {
      return "statusCompleted";
    } else {
      return "";
    }
  };

  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };

  return (
    <>
      <Nav />
      <div className="appointmentspage">
        <h2>My Appointments</h2>
        <div className="appointmentList">
          {appointments === null ? ( // Render a loading state while fetching data
            <p>Loading appointments...</p>
          ) : appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className={`appointmentItem ${getStatusClassNameCard(appointment.status)}`}
              >
                <div className="appointmentDetails">
                  <div className="detailItem">
                    <span className="itemLabel">Date:</span>
                    <span>{new Date(appointment.date).toLocaleDateString('en-GB', options)}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemLabel">Time:</span>
                    <span>{new Date(appointment.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemLabel">Status:</span>
                    <span className={getStatusClassNameSpan(appointment.status)}>{appointment.status}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemLabel">Therapist:</span>
                    <span>{appointment.therapist}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
        <div className="bookBtnDiv">
          <button className="bookAppBTN"><Link to="/bookappointment">Book Appointment</Link></button>
        </div>
      </div>
    </>
  );
};

export default Appointments;
