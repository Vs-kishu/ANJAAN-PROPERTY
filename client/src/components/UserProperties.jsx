import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserProperties = () => {
  const { currentUser } = useSelector((store) => store.user);
  const [userprop, setUserProps] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProps = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/property/userProperties/${currentUser._id}`
      );
      const data = await res.json();
      if (data.length === 0) {
        toast.error("No property found!");
        return;
      }

      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setUserProps(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProp = async (id) => {
    try {
      await fetch(`/api/property/delProp/${id}`, {
        method: "DELETE",
      });

      setUserProps(userprop.filter((prop) => prop._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <Link
        to={"/property"}
        className="text-center mx-auto w-1/2 justify-center flex my-6 py-2 rounded-lg hover:bg-slate-800 bg-slate-900 text-white font-semibold"
      >
        Add Property
      </Link>
      <button
        type="button"
        onClick={getProps}
        className="text-center mx-auto w-1/2 justify-center flex my-6 py-2 rounded-lg hover:bg-slate-800 bg-slate-900 text-white font-semibold"
      >
        Show Mine Property
      </button>
      {loading ? (
        <h1 className="text-2xl">Loading.....</h1>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {userprop.map(({ imageUrls, name, _id }) => (
            <div
              className="flex items-center gap-10 border border-black shadow-inner shadow-black p-4 rounded-lg"
              key={_id}
            >
              <img
                className="w-24 h-14 hover:scale-105"
                src={imageUrls[0]}
                alt="property"
              />
              <Link to={`/propertydetails/${_id}`}>
                <h4 className="text-xl font-bold">{name}</h4>
              </Link>
              <div className="flex flex-col items-center font-semibold">
                <Link to={`/editProperty/${_id}`}>
                  <span className="text-green-600 cursor-pointer hover:scale-110">
                    EDIT
                  </span>
                </Link>
                <span
                  onClick={() => deleteProp(_id)}
                  className="text-red-600 cursor-pointer hover:scale-110"
                >
                  DELETE
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserProperties;
