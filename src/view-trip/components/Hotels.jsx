import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommedation</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 max-sm:grid-cols-1 gap-5">
        {trip?.tripData?.hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
