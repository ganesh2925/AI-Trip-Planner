import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };
    try {
      const result = await GetPlaceDetails(data);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[0].name
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
              hotel?.hotelName +
              "," +
              hotel?.hotelAddress
            }
            target="_blank"
          >
            <div
              className="hover:scale-105 transition-all cursor-pointer py-3"
            >
              <img src={photoUrl?photoUrl:'/flight.jpg'} alt="Hotel Image" className="rounded-xl h-[220px] w-full object-cover" />
              <div className="m-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h3 className="texr-xs text-gray-500">
                  📌 {hotel?.hotelAddress}
                </h3>
                <h2 className="text-sm font-bold">💰 {hotel?.price}</h2>
                <h2 className="text-sm font-bold">⭐ {hotel?.rating} stars</h2>
              </div>
            </div>
          </Link>
  )
}

export default HotelCardItem