import React from "react";

import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { IconType } from "react-icons/lib";

const OAuthButton = ({ socialName }: { socialName: string }) => {
  switch (socialName) {
    case "Kakao":
      return <Button label="카카오 로그인" icon={RiKakaoTalkFill} />;
    case "Google":
      return <Button label="구글 로그인" icon={FaGoogle} />;
    default:
      return <button>로그인</button>;
  }
};

const Button = ({ icon: Icon, label }: { icon: IconType; label: string }) => {
  return (
    <button
      className="flex gap-2 items-center justify-center  w-full py-2 border rounded-sm overflow-hidden hover:cursor-pointer hover:bg-gray-200/30"
      type="submit"
    >
      <Icon size={20} />
      <span className="text-xs">{label}</span>
    </button>
  );
};

export default OAuthButton;
