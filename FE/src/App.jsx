import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/edit_profile" element={<EditProfile/>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
