import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyProfile.css"
import defpp from "../components/defpp.jpg"
import Nav from "../components/Nav";

const MyProfile = () => {

    const navigate = useNavigate()
    const callProfilePage = async () => {
        try {
            const resFromBack = await fetch('https://innercalm-network-server.onrender.com/myprofile', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await resFromBack.json()
            setUserData(data)

            if (resFromBack.status !== 200 || !data) {
                console.log("Not logged in")
                window.alert("Please log in")
                navigate("/login")
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        callProfilePage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [userData, setUserData] = useState({})

    return (
        <>
            <Nav />
            <div className="mypro">
                <div className="inmypro">
                    <div className="mpleft">
                        <img src={defpp} alt="Profile" />
                    </div>
                    <div className="myproright">
                        <div className="det">
                            <p className="detid">ID : <span>{userData._id}</span> </p>
                            <p className="detname">Name : <span>{userData.name}</span> </p>
                            <p className="detemail">Email : <span>{userData.email}</span> </p>
                            <p className="detphone">Phone : <span>{userData.phone}</span> </p>
                            <p className="detphone">Password : <span>********</span> </p>
                            <button className="changePassbtn"> <Link to="/changepassword">Change Password</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile