import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="my-7 flex justify-between items-center max-md:flex-col gap-1">
      <h2 className="text-center text-gray-500">Created By KUMILI GANESH The Project Name: EVAGUY</h2>
      <Link className="font-bold" to={"https://github.com/ganesh2925"}>Github Account Link</Link>
    </div>
  );
}

export default Footer;
