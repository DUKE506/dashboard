"use client";

import { useSession } from "next-auth/react";
import React from "react";

export const Nav = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="">
        <span className="text-lg font-bold">DashBoard</span>
      </div>
      <Profile />
    </div>
  );
};

const Profile = () => {
  const { data } = useSession();
  return (
    <div className="border rounded-sm px-6 py-2">
      <span className="text-sm">{data?.user?.name}</span>
    </div>
  );
};

export default Nav;
