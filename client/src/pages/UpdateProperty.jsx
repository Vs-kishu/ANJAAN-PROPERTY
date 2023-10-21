import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../../firebase";
import { convertBlobURLsToFiles } from "../utils/helperFunction";

const UpdateProperty = () => {
  const { propID } = useParams();
  const { currentUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [propError, setPropError] = useState(null);
  const [localblobURLs, setLocalBlobURLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
  });

  useEffect(() => {
    fetchProp();
  }, []);

  const fetchProp = async () => {
    console.log(propID);
    try {
      const res = await fetch(`/api/property/getProp/${propID}`);
      const data = await res.json();

      if (data.success === false) {
        setPropError(data.message);
        return;
      }
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImages = (e) => {
    if (e.target.files.length > 5) {
      toast.error("select max 5 Images");
      return;
    }

    if (e.target.files.length > 0) {
      const localblobURL = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setLocalBlobURLs([...localblobURLs, ...localblobURL]);
    }
  };

  const uploadImages = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const files = await convertBlobURLsToFiles(localblobURLs);

      const promises = [];

      for (const file of files) {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const uploadPromise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  resolve(downloadURL);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          );
        });

        promises.push(uploadPromise);
      }

      const urls = await Promise.all(promises);

      // Use the callback function of setFormData to send data to the backend
      const updatedFormData = {
        ...formData,
        imageUrls: [...urls],
      };

      // Now that image URLs are updated, send the data to the backend
      try {
        console.log("uploading");
        const res = await fetch(`/api/property/editProp/${propID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedFormData,
            userRef: currentUser._id,
          }),
        });

        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
        setLoading(false);
        navigate(`/propertydetails/${data._id}`);

        // handle success, e.g., navigate or show a success message
      } catch (error) {
        console.log(error);
        // handle error, e.g., show an error message
      } finally {
        setLoading(false);
      }

      console.log("Upload completed");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const onChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const deleteImage = (index) => {
    const updateLocalBlobUrls = [...localblobURLs];
    updateLocalBlobUrls.splice(index, 1);
    setLocalBlobURLs(updateLocalBlobUrls);
  };
  if (propError) {
    console.log(propError);
    return <h1 className="text-4xl">{propError}</h1>;
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Property
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={onChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={onChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={onChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap ">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                onChange={onChange}
                className="w-5"
                checked={formData.type == "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                onChange={onChange}
                className="w-5"
                checked={formData.type == "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                onChange={onChange}
                className="w-5"
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                onChange={onChange}
                className="w-5"
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                onChange={onChange}
                className="w-5"
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={onChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="50"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={onChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={onChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {formData.type == "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={onChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  {formData.type == "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImages}
            />
          </div>

          <button
            type="button"
            onClick={uploadImages}
            className={` ${
              loading && "animate-pulse"
            } p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80`}
          >
            {loading ? "Updating..." : "Update PROPERTY"}
          </button>
          <div className="space-y-4">
            {formData?.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-slate-50 p-4 rounded-md "
              >
                <img
                  className="w-32 h-28 object-cover"
                  src={url}
                  alt="property"
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {localblobURLs.map((url, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-slate-50 p-4 rounded-md "
              >
                <img
                  className="w-32 h-28 object-cover"
                  src={url}
                  alt="property"
                />
                <span
                  onClick={() => deleteImage(index)}
                  className="text-red-700 font-medium hover:bg-red-100 cursor-pointer p-2 rounded-md hover:shadow-sm hover:shadow-red-600"
                >
                  DELETE
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </main>
  );
};

export default UpdateProperty;
