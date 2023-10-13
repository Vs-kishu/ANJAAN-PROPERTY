import { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };
  return (
    <div className="p-3  mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <div className="flex flex-col md:flex-row justify-center">
        <img
          src="https://res.cloudinary.com/dngrtoqfe/image/upload/v1697108390/anjaan-property/ji1m4jslssv9nx7b94zg.gif"
          alt="signup"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-96 justify-center"
        >
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="userName"
            onChange={handleChange}
          />
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
            Sign Up
          </button>
        </form>
      </div>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
