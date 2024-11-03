import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "../service/AIModal";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handelInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      GetUserProfile(codeResponse);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }
    if (
      (formData?.NumberOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill the all detailes");
      return;
    } else {
      if (formData?.NumberOfDays > 5) {
        toast("Number of days should be less than 5 Days");
      } else {
        setLoading(true);
        toast("Wait... for the Trip Planing");
        const FINAL_PROMPT = AI_PROMPT.replace(
          "{location}",
          formData?.location?.label
        )
          .replace("{totalDays}", formData?.noofDays)
          .replace("{traveler}", formData?.traveler)
          .replace("{budget}", formData?.budget)
          .replace("{totalDays}", formData?.noofDays);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);
        SaveAiTrip(result?.response?.text());
      }
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp?.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 max-sm:p-10">
      <h2 className="front-bold text-3xl mt-2">
        Tell us your travel preferences 🏕️🏝️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div>
        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handelInputChange("location", v);
                },
              }}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days will you be traveling?
            </h2>
            <Input
              placeholder={"Ex.2"}
              type="number"
              onChange={(e) =>
                handelInputChange("NumberOfDays", e.target.value)
              }
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5 max-sm:grid-cols-1">
              {SelectBudgetOption.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`p-4 cursor-pointer border rounded-lg hover:shadow-xl ${
                      formData?.budget == item.title &&
                      "shadow-lg border-cyan-500"
                    }`}
                    onClick={() => handelInputChange("budget", item.title)}
                  >
                    <h2 className="text-5xl">{item.icon}</h2>
                    <h2 className="font-bold text-2xl">{item.title}</h2>
                    <h2 className="text-lg text-gray-500">{item.desc}</h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5 max-sm:grid-cols-1">
              {SelectTravelesList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`p-4 cursor-pointer border rounded-lg hover:shadow-xl ${
                      formData?.traveler == item.people &&
                      "shadow-xl border-cyan-500"
                    }`}
                    onClick={() => handelInputChange("traveler", item.people)}
                  >
                    <h2 className="text-5xl">{item.icon}</h2>
                    <h2 className="font-bold text-2xl">{item.title}</h2>
                    <h2 className="text-lg text-gray-500">{item.desc}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="my-10 flex justify-end">
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
        <Dialog open={openDailog} disabled="ture">
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.png" className="w-50 h-20" />
                <h2 className="fount-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button
                  onClick={login}
                  className="mt-5 w-full flex gap-4 items-center"
                  varient=" outline"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateTrip;