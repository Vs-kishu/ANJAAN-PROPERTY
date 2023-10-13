import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data);
        console.log(data);
        return;
      }
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
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
