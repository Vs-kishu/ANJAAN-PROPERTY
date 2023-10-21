import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
const Home = () => {
  const [offerProperties, setOfferProperties] = useState([]);
  const [rentProperties, setRentProperties] = useState([]);
  const [sellProperties, setSellProperties] = useState([]);
  console.log(offerProperties);
  console.log(rentProperties);
  console.log(sellProperties);
  useEffect(() => {
    const fetchOfferProp = async () => {
      const res = await fetch("/api/property/get?offer=true&limit=4");
      const data = await res.json();
      setOfferProperties(data);
      fetchRentProp();
    };
    fetchOfferProp();
    const fetchRentProp = async () => {
      const res = await fetch("/api/property/get?type=rent&limit=4");
      const data = await res.json();
      setRentProperties(data);
      fetchsellProp();
    };
    const fetchsellProp = async () => {
      const res = await fetch("/api/property/get?type=sell&limit=4");
      const data = await res.json();
      setSellProperties(data);
    };
  }, []);
  return (
    <main>
      <Link to={"/property"}>
        <button className="text-2xl animate-pulse font-medium text-center border w-full py-2 hover:bg-red-200 text-red-600">
          {" "}
          BUY OR RENT PROPERTY
        </button>{" "}
      </Link>
      <h1 className="text-xl md:text-4xl font-medium text-center w-full lg:w-1/2 mx-auto my-9">
        Your One-Stop Destination for Real Estate Deals
      </h1>
      <div className="w-full h-[70vh] relative">
        <img
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dngrtoqfe/image/upload/v1697806075/anjaan-property/y43kbwkbspfb3nsyp87r.jpg"
          alt="cover"
        />
        <h2 className="absolute top-0 font-pacifico leading-loose py-20 px-10 lg:px-40 left-0 h-full bg-black w-full bg-opacity-50  text-white font-bold text-4xl lg:text-6xl">
          Unlock the Door to Opportunity: Buy and Sell Properties Today
        </h2>
      </div>
      <section className="flex flex-col items-center my-10">
        <h3 className="text-red-800 text-6xl my-4 font-nosifer">
          hot Deals{" "}
          <span className="text-xl text-blue-600 font-normal">
            <Link to={"/search?offer=true"}>Show more </Link>
          </span>
        </h3>

        <div className="flex flex-wrap justify-evenly gap-5">
          {offerProperties.map((prop) => (
            <PropertyCard key={prop._id} prop={prop} />
          ))}
        </div>
      </section>
      <hr className="h-1 bg-gray-400" />

      <section className="flex flex-col items-center my-10">
        <h3 className="text-red-800 text-6xl my-10 font-nosifer">
          Rent Deals{" "}
          <span className="text-xl text-blue-600 font-normal">
            <Link to={"/search?type=rent"}>Show more </Link>
          </span>
        </h3>

        <div className="flex flex-wrap justify-evenly gap-5">
          {rentProperties.map((prop) => (
            <PropertyCard key={prop._id} prop={prop} />
          ))}
        </div>
      </section>
      <hr className="h-1 bg-gray-400" />

      <section className="flex flex-col items-center my-10">
        <h3 className="text-red-800 text-6xl my-10 font-nosifer">
          Sell Deals{" "}
          <span className="text-xl text-blue-600 font-normal">
            <Link to={"/search?type=sell"}>Show more </Link>
          </span>
        </h3>

        <div className="flex flex-wrap justify-evenly gap-5">
          {sellProperties.map((prop) => (
            <PropertyCard key={prop._id} prop={prop} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
