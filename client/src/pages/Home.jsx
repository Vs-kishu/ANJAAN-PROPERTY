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
          src="https://firebasestorage.googleapis.com/v0/b/anjaan-property-38af0.appspot.com/o/1323363915.jpg?alt=media&token=af5ad24a-3615-4ba4-baa3-b202fcbe7568&_gl=1*1i8br9s*_ga*MTI2OTU3MDYyLjE2OTcxOTc3NDE.*_ga_CW55HF8NVT*MTY5NzY4MTYwNy4xNy4xLjE2OTc2ODE2ODMuNDcuMC4w"
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
