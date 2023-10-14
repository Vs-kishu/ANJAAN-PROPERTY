import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../store/userSlice";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3  mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <div className="flex flex-col md:flex-row justify-center">
        <img
          src="https://res.cloudinary.com/dngrtoqfe/image/upload/v1697109096/anjaan-property/mtozapbxo6fk79sqmqv3.gif"
          alt="signup"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-96 justify-center"
        >
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Loading..." : "Sign In"}
          </button>
          <GoogleAuth />
          <p className="text-red-600">{error && error?.message}</p>
        </form>
      </div>

      <div className="flex gap-2 mt-5">
        <p>Not Account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
