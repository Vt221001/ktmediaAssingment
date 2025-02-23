import { Route, Routes, useLocation } from "react-router-dom";
import AddJob from "./pages/AddJob";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopNavbar from "./layout/TopNavbar";
import JobDetails from "./pages/JobDetails";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/add-job";

  return (
    <>
      {!hideNavbar && <TopNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="edit-job/:id" element={<AddJob />} />
        <Route path="job-des/:id" element=<JobDetails /> />
      </Routes>
    </>
  );
}

export default App;
