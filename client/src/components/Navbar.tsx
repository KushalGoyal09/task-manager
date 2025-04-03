import { useNavigate, Link, useLocation } from "react-router";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Button } from "./ui/button";
import { logout } from "@/store/slices/userSlice";

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
            <h1 className="text-xl font-semibold text-gray-900">
              Task Manager
            </h1>
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
