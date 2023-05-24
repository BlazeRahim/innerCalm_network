import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Appointments from "./Pages/Appointments";
import Book from "./Pages/Book";
import Login from "./Pages/Login";
import MyProfile from "./Pages/MyProfile";
import Logout from "./Pages/Logout";
function App() {
    return (
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/appointments" element={<Appointments/>}></Route>
        <Route exact path="/bookappointment" element={<Book/>}></Route>
        <Route exact path="/myprofile" element={<MyProfile/>}></Route>
        <Route exact path="/logout" element={<Logout/>}></Route>
      </Routes>
    )
 
}

export default App;