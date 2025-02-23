import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import Button from "../components/Ui/Button";

const TopNavbar = () => {
  const { userId, logout, name } = useAuth();
  const recruiterName = name || "Recruiter";
  const profileImage = "https://randomuser.me/api/portraits/men/45.jpg";
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-20 rounded-b-[40px] overflow-hidden shadow-md bg-gradient-to-r from-red-500 to-red-400">
      {/* Background Shapes */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-red-500"></div>
      <div
        className="absolute inset-0 bg-red-400 opacity-80"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 65%, 0 100%)" }}
      ></div> */}

      {/* Navbar Content */}
      <div className="relative flex justify-between items-center px-6 h-full text-white">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Jobfinder</h1>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {userId ? (
            <div className="flex items-center gap-3">
              <Button
                onClick={logout}
                className="border border-none px-3 py-1 rounded hover:bg-red-300"
                bgColor="bg-transparent"
                textColor="text-white"
              >
                Logout
              </Button>
              <span className="hidden sm:block text-lg font-medium">
                Hello! {recruiterName}
              </span>
              <img
                src={profileImage}
                alt="Recruiter Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                className="border border-white px-4 py-1 rounded hover:bg-red-300"
                bgColor="bg-transparent"
                textColor="text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                bgColor="bg-white"
                textColor="text-red-500"
                className="rounded hover:bg-gray-200"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
