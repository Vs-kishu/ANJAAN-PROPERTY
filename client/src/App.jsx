import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { About, Home, SignIn, SignUp } from "./pages";
import AddProperty from "./pages/AddProperty";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <main className="bg-zinc-100">
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
          <Route path="/property" element={<AddProperty />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
