const PropertyCard = () => {
  return (
    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3>name</h3>
      <div className="w-96 h-96">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/anjaan-property-38af0.appspot.com/o/1323363915.jpg?alt=media&token=af5ad24a-3615-4ba4-baa3-b202fcbe7568&_gl=1*y952gz*_ga*MTI2OTU3MDYyLjE2OTcxOTc3NDE.*_ga_CW55HF8NVT*MTY5NzY4MTYwNy4xNy4xLjE2OTc2ODE2ODYuNDQuMC4w"
          alt="card"
        />
      </div>
      <p>description</p>
      <p>3000</p>
      <button type="submit">Rent </button>
      <button>Sell</button>
    </div>
  );
};

export default PropertyCard;
