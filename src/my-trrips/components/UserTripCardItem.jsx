import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    <Link to={"/view-trip/"+ trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          className="h-[250px] w-full object-cover rounded-xl hover:shadow-2xl"
          src={photoUrl}
          alt="City Image"
        />
        <div>
          <h2 className="text-xl font-bold">
            {trip?.userSelection?.location?.label}
          </h2>
          <h3 className="text-md">
            <b>{trip?.userSelection?.NumberOfDays}</b> Days trips with{" "}
            <b>{trip?.userSelection?.budget}</b> Budget
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
