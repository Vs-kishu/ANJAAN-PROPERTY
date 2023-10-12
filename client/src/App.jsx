import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp, About } from "./pages";
import Header from "./components/Header";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
