import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const {
        user: { displayName, email, photoURL },
      } = result;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: displayName,
          email,
          photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      type="buttton"
      onClick={handleClick}
      className="bg-red-950 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    >
      GO with Google
    </button>
  );
};

export default GoogleAuth;
