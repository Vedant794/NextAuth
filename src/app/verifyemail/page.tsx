"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function page() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyMail = async () => {
    try {
      await axios.post("/api/Users/verify", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const userToken = window.location.search.split("=")[1];
    setToken(userToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyMail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-4xl font-serif">
          {verified ? "Verified..." : "Not Verified"}
        </h1>
      </div>
      {verified && (
        <div className="p-2 bg-green-400 text-xl">
          {token.length > 0 ? `${token}` : "no token"}
        </div>
      )}

      {error && <h1>Error Occurs</h1>}
    </div>
  );
}

export default page;
