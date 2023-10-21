import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../../firebase";
import UserProperties from "../components/UserProperties";
import {
  deleteFailure,
  deleteUserFinished,
  deleteUserStarted,
  signInFailure,
  signoutFail,
  signoutFinished,
  signoutstarted,
  updateFail,
  updateUserFinished,
  updateUserStarted,
} from "../store/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef();
  const { currentUser, loading } = useSelector((store) => store.user);
  const { userName, photoURL, email, _id } = currentUser;
  const [file, setFile] = useState();
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [successUpdate, setSuccessUpdate] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photoURL: downloadURL })
        );
      }
    );
  };
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const upadteUserInfo = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      toast.error("fill details to update");
      return;
    }
    try {
      dispatch(updateUserStarted());

      const data = await fetch(`/api/user/updateUser/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await data.json();
      console.log(json);
      if (data.success === false) {
        dispatch(updateFail(data.message));
        return;
      }
      dispatch(updateUserFinished(json));
      setSuccessUpdate(true);
    } catch (error) {
      dispatch(updateFail(error));
    }
  };

  const deleteUser = async () => {
    try {
      dispatch(deleteUserStarted());
      const data = await fetch(`/api/user/deleteUser/${_id}`, {
        method: "DELETE",
      });
      const json = await data.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteUserFinished());
      toast.success(json);
      navigate("/sigin");
    } catch (error) {
      dispatch(deleteFailure(error));
    }
  };

  const signOutUser = async () => {
    try {
      dispatch(signoutstarted());
      const data = await fetch(`/api/auth/signout`, {});
      const json = await data.json();
      if (data.success === false) {
        dispatch(signInFailure(json.message));
        return;
      }
      dispatch(signoutFinished());
    } catch (error) {
      dispatch(signoutFail(error));
    }
  };
  return (
    <main className="bg-white py-10">
      <section className="w-full lg:w-[900px]  mx-auto  bg-white p-4 rounded-lg shadow-inner shadow-black">
        <form
          onSubmit={upadteUserInfo}
          className="flex flex-col sm:flex-row items-center "
        >
          <div className="flex flex-shrink-0 flex-col gap-10 items-center">
            <div className="w-52 h-52 rounded-full ">
              <input
                type="file"
                ref={imgRef}
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
              />
              <img
                onClick={() => imgRef.current.click()}
                className="w-full h-full object-cover rounded-full"
                src={formData.photoURL || photoURL}
                alt="PROFILE PIC"
              />
              <p className="text-sm self-center">
                {fileUploadError ? (
                  <span className="text-red-700">
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">
                    Image successfully uploaded!
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
            <h1 className="text-red-950 font-bold text-xl">{userName}</h1>
            <button
              type="button"
              onClick={signOutUser}
              className="bg-red-950 text-white px-8 py-2 rounded-lg hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
          <div className="w-full">
            <label className="flex gap-5 flex-col text-red-950 font-bold p-4">
              User Name
              <input
                type="text"
                className="border-2 p-2 border-red-950 rounded-lg"
                name="userName"
                onChange={onchange}
                defaultValue={userName}
              />
            </label>

            <label className="flex gap-5 flex-col text-red-950 font-bold p-4">
              Email Address
              <input
                type="text"
                className="border-2 p-2 border-red-950 rounded-lg"
                name="email"
                onChange={onchange}
                defaultValue={email}
              />
            </label>

            <label className="flex gap-5 flex-col text-red-950 font-bold p-4">
              Password
              <input
                type="password"
                name="password"
                className="border-2 p-2 border-red-950 rounded-lg"
                onChange={onchange}
              />
            </label>
            <div className="flex justify-between px-5">
              <button
                disabled={loading}
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700"
              >
                {loading ? "Loading" : " Update"}
              </button>
              <button
                type="button"
                onClick={deleteUser}
                className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
            <p></p>
            <p>{successUpdate && "successfully Update"}</p>
          </div>
        </form>
      </section>
      <UserProperties />
    </main>
  );
};

export default ProfilePage;
