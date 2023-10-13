import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data);
        setSuccess(null);
        return;
      }
      setSuccess(data.message);
      navigate("/signin");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
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
            {loading ? "loading..." : "Sign Up"}
          </button>
          <p className="text-green-600">{success && success}</p>
          <p className="text-red-600">{error && error.message}</p>
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
