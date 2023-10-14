import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp, About } from "./pages";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <main>
      <BrowserRouter>
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
