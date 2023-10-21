import { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdBathtub,
  MdChair,
  MdMyLocation,
  MdOutlineBedroomParent,
  MdOutlineLocalParking,
} from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PropertyDetails = () => {
  SwiperCore.use([Navigation]);
  const { propID } = useParams();
  const [propDetail, setPropDetail] = useState(null);
  const [propError, setPropError] = useState(null);

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
      setPropDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!propDetail) {
    return <h1 className="text-4xl">Loading....</h1>;
  }
  const {
    imageUrls,
    name,
    description,
    address,
    bedrooms,
    bathrooms,
    parking,
    type,
    furnished,
    offer,
    regularPrice,
    discountPrice,
  } = propDetail;
  return (
    <main>
      <Swiper navigation>
        {imageUrls.map((url) => (
          <SwiperSlide key={url}>
            <div
              className="h-[550px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className="text-4xl  my-5 text-center text-blue-900">
        {name}-({regularPrice}
        {type === "rent" ? "$/month" : "$"})
      </h1>
      <p className="text-center text-sm md:text-lg px-5 md:px-20">
        {description}
      </p>
      <div className="px-5 md:px-20 flex gap-20 my-5 text-4xl">
        <span className="flex items-center gap-2">
          <MdAttachMoney className="text-green-400" />
          {regularPrice - discountPrice}-{type === "rent" ? "$/month" : "$"}
        </span>
        <span className="flex items-center gap-2">
          <TbDiscount2 className="text-red-500" />
          {offer ? `Offer-${discountPrice}$` : "No-Offer Available"}
        </span>
      </div>
      <div className="flex gap-10 py-8 flex-wrap px-5 md:px-20">
        <span className="flex items-center gap-2 text-2xl">
          <MdMyLocation className="text-red-600" />
          {address}
        </span>
        <span className="flex items-center gap-2 text-2xl">
          <MdOutlineBedroomParent className="text-blue-950" />
          {bedrooms}
        </span>
        <span className="flex items-center gap-2 text-2xl">
          <MdBathtub className="text-blue-950" />
          {bathrooms}
        </span>
        <span className="flex items-center gap-2 text-2xl">
          <MdOutlineLocalParking className="text-blue-950" />
          {parking ? "Available" : "Not-Available"}
        </span>
        <span className="flex items-center gap-2 text-2xl">
          <MdChair className="text-blue-950" />
          {furnished ? "Fully Furnished" : "Not-Furnished"}
        </span>
      </div>
      <div className="flex justify-center">
        <button className="text-2xl font-semibold py-2 bg-green-800 hover:bg-green-600 w-full rounded-lg text-white uppercase">
          {type}
        </button>
      </div>
    </main>
  );
};

export default PropertyDetails;
