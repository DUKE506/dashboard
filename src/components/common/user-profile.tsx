import { auth } from "@/lib/auth";
import React from "react";

const UserProfile = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <img src={session.user.image ?? undefined} alt="avatar" />
    </div>
  );
};

export default UserProfile;
