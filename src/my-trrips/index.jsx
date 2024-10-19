import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);

  // use to get all data
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    const trips = querySnapshot.docs.map((doc) => doc.data());
    setUserTrips(trips);
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 max-sm:p-10">
      <h1 className="font-bold text-4xl max-sm:text-xl">My Trips</h1>
      <div className="grid grid-cols-3 gap-5 mt-5 max-sm:grid-cols-1">
        {userTrips?.length > 0
          ? userTrips?.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div key={index} className="h-[250px] w-full bg-slate-300 animate-pulse rounded-xl">

              </div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
