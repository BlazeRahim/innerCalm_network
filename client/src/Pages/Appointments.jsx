import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "./apppoint.css"
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const [userData, setuser] = useState({});
  const callAuth = async () => {
    try {
      const resFromBack = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const userData = await resFromBack.json(); // Parse the response body as JSON
      setuser(userData);
      if (!userData.name) {
        alert("Please login.");
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAuth();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (response.status !== 200 || !data) {
        window.alert("Please log in");
        navigate("/login");
      }
      setAppointments(data.userAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav />
      <div className="appointmentspage">
        <h2>My Appointments</h2>
        {appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Therapist</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{new Date(appointment.time).toLocaleTimeString()}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.therapist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
        <Link to="/bookappointment">Book Appointment</Link>
      </div>
    </>
  );
}

export default Appointments;