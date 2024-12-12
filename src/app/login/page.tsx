"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const loginFromBackend = async () => {
    try {
      setLoading(true);
      await axios.post("/api/Users/login", user);
      console.log("Signup Successfull");
      toast.success(
        "Signup Successfull✅✅ Please Verify Your Account from mail"
      );
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("error.message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 1) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div>
      <div className="login flex flex-col justify-center items-center mt-40">
        <h1 className="font-serif text-2xl font-semibold mb-3">
          {loading ? "Processing...." : "Login"}
        </h1>
        <div className="form flex flex-col gap-3">
          <div className="email flex flex-col justify-center items-start">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="px-3 py-2 font-mono text-xl outline-none bg-slate-100 rounded-lg"
            />
          </div>
          <div className="password flex flex-col justify-center items-start">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              className="px-3 py-2 font-mono text-xl outline-none bg-slate-100 rounded-lg"
            />
          </div>
          <button
            onClick={loginFromBackend}
            className="px-3 py-2 bg-black text-white transition-all ease-out hover:bg-white hover:text-black rounded-xl"
          >
            {buttonDisabled ? "No Login" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
