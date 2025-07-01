import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GrSend } from "react-icons/gr";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip.userSelection.location.label,
    };
    try {
      const result = await GetPlaceDetails(data);
      const photos = result?.data?.places?.[0]?.photos;
      if (photos && photos.length > 0) {
        const photoRef = photos[Math.min(7, photos.length - 1)].name;
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
        setPhotoUrl(photoUrl);
      } else {
        setPhotoUrl(null); // fallback to default
      }
    } catch (error) {
      console.error("Failed to fetch photo:", error);
      setPhotoUrl(null);
    }
  };

  return (
    <div>
      <img
        src={photoUrl || "/flight.jpg"}
        alt="City Image"
        className="h-[400px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.NumberOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💸 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              👣 No of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <GrSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
