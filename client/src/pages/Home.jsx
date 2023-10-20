import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
const Home = () => {
  // const [allProp, setAllProp] = useState([]);
  // const fetchAllProperty = async () => {
  //   try {
  //     const res = await fetch("/api/property/allProp");
  //     const data = await res.json();
  //     setAllProp(data);
  //   } catch (error) {
  //     console.log("error occured");
  //   }
  // };
  // useEffect(() => {
  //   fetchAllProperty();
  // }, []);

  return (
    <main>
      <Link to={"/property"}>
        <button className="text-2xl animate-pulse font-medium text-center border w-full py-2 hover:bg-red-200 text-red-600">
          {" "}
          BUY OR RENT PROPERTY
        </button>{" "}
      </Link>
      <h1 className="text-4xl font-medium text-center w-1/2 mx-auto my-9">
        Your One-Stop Destination for Real Estate Deals
      </h1>
      <div className="w-full h-[70vh] relative">
        <img
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dngrtoqfe/image/upload/v1697806075/anjaan-property/y43kbwkbspfb3nsyp87r.jpg"
          alt="cover"
        />
        <h2 className="absolute top-0 font-pacifico leading-loose py-20 px-40 left-0 h-full bg-black w-full bg-opacity-50  text-white font-bold text-6xl">
          Unlock the Door to Opportunity: Buy and Sell Properties Today
        </h2>
      </div>
      <section className="flex flex-col items-center my-10">
        <h3 className="text-red-800 text-6xl font-nosifer">hot Deals</h3>
        <div>
          <PropertyCard />
        </div>
      </section>
    </main>
  );
};

export default Home;
