import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { About, Home, SignIn, SignUp } from "./pages";
import AddProperty from "./pages/AddProperty";
import ProfilePage from "./pages/ProfilePage";
import PropertyDetails from "./pages/PropertyDetails";
import Search from "./pages/Search";
import UpdateProperty from "./pages/UpdateProperty";

const App = () => {
  return (
    <main className="bg-stone-50 h-full">
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
          <Route path="/search" element={<Search />} />
          <Route
            path="/propertydetails/:propID"
            element={<PropertyDetails />}
          />
          <Route path="/editProperty/:propID" element={<UpdateProperty />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
