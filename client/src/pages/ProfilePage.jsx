import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { app } from "../../firebase";

const ProfilePage = () => {
  const imgRef = useRef();
  const { currentUser, loading, error } = useSelector((store) => store.user);
  const { userName, photoURL } = currentUser;
  const [file, setFile] = useState();
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <section className=" w-[700px]  flex items-center justify-between mt-24 gap-10 mx-auto">
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
      </div>
      <div className="w-full">
        <form action="" className="flex flex-col">
          <label className="flex gap-5 flex-col text-red-950 font-bold p-4">
            User Name
            <input
              type="text"
              className="border-2 p-2 border-red-950 rounded-lg"
            />
          </label>

          <label className="flex gap-5 flex-col text-red-950 font-bold p-4">
            Email Address
            <input
              type="text"
              className="border-2 p-2 border-red-950 rounded-lg"
            />
          </label>

          <label className="flex gap-5 flex-col text-red-950 font-bold p-4">
            Password
            <input
              type="text"
              className="border-2 p-2 border-red-950 rounded-lg"
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
