import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store";
import { lazy, Suspense } from "react";
import RootLayout from "./components/RootLayout";
import LoadingPage from "./components/LoadingPage";

const Login = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const Home = lazy(() => import("./pages/HomePage"));
const Landing = lazy(() => import("./pages/LandingPage"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Landing />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
