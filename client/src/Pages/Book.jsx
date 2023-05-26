import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "./Book.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Book = () => {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();
  // eslint-disable-next-line
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
      const userData = await resFromBack.json(); // Parse the response body as JSON
      setuser(userData)
      if (!userData.name) {
        alert("Please login.")
        navigate('/login')
      }
      // Perform any necessary actions with the user data
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callAuth();
    // eslint-disable-next-line
  }, [])





  useEffect(() => {
    fetchTherapists();
    // eslint-disable-next-line
  }, []);

  const fetchTherapists = async () => {
    try {
      const response = await fetch("https://innercalm-network-server.onrender.com/therapists");
      const data = await response.json();
      const therapistsData = data.therapists;
      setTherapists(therapistsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTherapistSelection = (therapist) => {
    setSelectedTherapist(therapist);
  };

  const handleAppointmentRequest = async () => {
    if (selectedTherapist && selectedDate && selectedTime) {
      const selectedDateTime = new Date(selectedDate);

      // Check if the selected date is not less than today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDateTime < today) {
        alert("Please select a date that is not less than today.");
        return;
      }

      const date = new Date(selectedDate);
      const dayDate = date.getDate();

      const time = new Date(selectedTime);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      const requestedDateTime = new Date(date.getFullYear(), date.getMonth(), dayDate, hours, minutes, seconds).toISOString();

      console.log(requestedDateTime)
      try {
        const response = await fetch("https://innercalm-network-server.onrender.com/requestappointment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: requestedDateTime,
            user: userData.email,
            therapist: selectedTherapist.email,
          }),
        });

        const data = await response.json();
        console.log(data.message);
        navigate("/appointments")
        setSelectedTherapist(null);

        // Handle the response message as needed
      } catch (error) {
        console.log(error);
        // Handle the error as needed
      }
    }
  };




  console.log(selectedDate)
  console.log(selectedTime)

  return (
    <>
      <Nav />
      <div className="bookappointmentpage">
        <h2>Book Appointment</h2>
        <p>Select a therapist from the list below:</p>
        <table className="therapist-table">
          <thead>
            <tr>
              <th>Therapist</th>
              <th>Speciality</th>
              {/* Add more therapist fields if needed */}
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist) => (
              <tr
                className="rowoftable"
                key={therapist.id}
                onClick={() => handleTherapistSelection(therapist)}
              >
                <td>{therapist.name}</td>
                <td>{therapist.speciality}</td>
                {/* Add more therapist fields if needed */}
              </tr>
            ))}
          </tbody>
        </table>
        {selectedTherapist ? (
          <div className="selected-therapist">
            <h3>Selected Therapist:</h3>
            <p>Name: {selectedTherapist.name}</p>
            <p>Email: {selectedTherapist.email}</p>
            <p>Phone: {selectedTherapist.speciality}</p>
            {/* Display additional therapist information if needed */}
            <div>
              <h3>Select a Time Slot:</h3>
              {/* Replace the options below with your actual time slots */}
              <div>
                <h3>Select a Date:</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div>
                <h3>Select a Time:</h3>
                <DatePicker
                  selected={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
                />
              </div>
              <br />
              <br />
            </div>
            <button className="appointment-button" onClick={handleAppointmentRequest}>
              Request Appointment
            </button>
          </div>
        ) : (
          <p>No therapist selected.</p>
        )}
        <Link to="/appointments">  <button className="btn btn-outline-primary">View My Appointments</button></Link>
      </div>
    </>
  );
};

export default Book;
