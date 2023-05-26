import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Appointments from "./Pages/Appointments";
import Book from "./Pages/Book";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MyProfile from "./Pages/MyProfile";
import Logout from "./Pages/Logout";
import ChatBot from "./Pages/ChatBot";
import ChangePassword from "./Pages/ChangePassword";
import Contact from "./Pages/Contact";
function App() {
  useEffect(() => {
    // Update document title when component mounts
    document.title = 'InnerCalm | Network';
    // Clean up document title when component unmounts
    return () => {
      document.title = 'InnerCalm';
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/appointments" element={<Appointments />}></Route>
      <Route exact path="/bookappointment" element={<Book />}></Route>
      <Route exact path="/myprofile" element={<MyProfile />}></Route>
      <Route exact path="/chat-innercalm-ai" element={<ChatBot/>}></Route>
      <Route exact path="/contact" element={<Contact/>}></Route>
      <Route exact path="/logout" element={<Logout />}></Route>
      <Route path="/changepassword" element={<ChangePassword/>} />
    </Routes>
  )

}

export default App;