import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Places To Visit</h2>
      <div>
        {trip.tripData?.itinerary && Array.isArray(trip.tripData.itinerary) && trip.tripData.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h1 className="text-xl font-medium">Day {item.day}</h1>
            <div className="grid lg:grid-cols-2 gap-5">
              {item.plan.map((place, index) => {
                return (
                  <div key={index} className="my-3">
                    <h2 className="font-bold text-lg ">⛩️. {place.placeName}</h2>
                    <h3 className="text-md font-medium text-orange-500">
                      {place.bestTimeToVisit}
                    </h3>
                    <PlaceCardItem place={place} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
