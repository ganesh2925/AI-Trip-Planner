import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    try {
      const result = await GetPlaceDetails(data);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[9].name
      );

      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place?.placeName +
        "," +
        place?.placeDetails
      }
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-3 flex max-md:flex-col gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer">
        <img
          src={photoUrl?photoUrl:'/flight.jpg'}
          alt="Place Image"
          className="w-[140px] h-[150px] object-cover max-md:w-full max-md:h-[220px] rounded-xl"
        />
        <div className="m-2 flex flex-col gap-2">
          <h3 className="text-md font-medium">
            Time To Travel: {place.timeToTravel} ⌛
          </h3>
          <h3 className="text-md font-bold">
            Ticket Price : {place.ticketPricing} 🏷️
          </h3>
          <p className="text-sm font-medium text-gray-500">
            {place.placeDetails}
          </p>
          <Button>
            <FaMapLocationDot className="text-2xl" />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
