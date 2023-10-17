import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { About, Home, SignIn, SignUp } from "./pages";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            {" "}
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
