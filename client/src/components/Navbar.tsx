import { useNavigate, Link, useLocation } from "react-router";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Button } from "./ui/button";
import { logout } from "@/store/slices/userSlice";
import { CheckCircle } from "lucide-react";

export default function Navbar() {
  const { username, isLoggedIn } = useAppSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to={"/"}>
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TaskMaster
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {isLoggedIn && location.pathname !== "/home" && (
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Go to App
              </Button>
            )}
            {isLoggedIn && location.pathname === "/home" && (
              <span className="text-sm text-gray-600">Welcome, {username}</span>
            )}
            {isLoggedIn && (
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            )}
            {!isLoggedIn && (
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
