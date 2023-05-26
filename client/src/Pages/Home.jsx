import React, { useEffect, useState } from "react";
import NavB from "../components/NavB";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import homebg from "../components/homebg.jpeg";

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
      const userData = await resFromBack.json();
      setuser(userData);
      if (userData.name) {
        navigate("/appointments");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAuth();
  }, []);

  return (
    <>
      <NavB />
      <div className="homepage">
        <div className="backdrop">
          <div className="background-video">
            <img src={homebg} alt="bg" />
          </div>
          <div className="content-container">
            <h2 className="title">Welcome to InnerCalm network</h2>
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
            <Link to="/login">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
