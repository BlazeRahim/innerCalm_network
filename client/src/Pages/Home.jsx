import React, { useEffect, useState } from "react";
import NavB from "../components/NavB";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
          setuser(userData)
          if (userData.name) {
            alert("Please login.")
            navigate('/appointments')
          }
          // Perform any necessary actions with the user data
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        callAuth();
      }, [])



    useEffect(() => {
        callAuth();
    }, []);

    return (
        <>
            <NavB />
            <div className="homepage">
                <h2 className="title">Welcome to innerCalm network</h2>
                <p className="description">
                    Connect with licensed therapists for online therapy sessions from the
                    comfort of your home.
                </p>
                <p className="content">
                    Our platform provides a secure and confidential environment for
                    individuals seeking mental health support.
                </p>
                <p className="content">
                    Whether you're dealing with stress, anxiety, depression, or other
                    mental health concerns, our therapists are here to help you.
                </p>
                <button className="button">Get Started</button>
            </div>
        </>
    );
};

export default Home;
