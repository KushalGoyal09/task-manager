import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { fetchUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useEffect } from "react";
const RootLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
