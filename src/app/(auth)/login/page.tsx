import { providerMap, auth, signIn } from "@/lib/auth";
import React from "react";
import { signInWithCustomProvider } from "../../../../serverActions/auth";
import LightDarkToggle from "@/components/common/light-dark-toggle";
import LoginForm from "./_component/login-form";
import OAuthButton from "./_component/oauth-button";

const Page = async () => {
  return (
    <div className="flex justify-center items-center gap-2 h-full">
      <div className="flex flex-col gap-8 border w-100 p-8 rounded-sm">
        <span className="text-2xl font-bold">LOGIN</span>
        <LoginForm />
        <div className="flex justify-center items-center gap-4">
          <div className="h-[1px] w-full bg-border" />
          <span className=" text-xs text-gray-500">or</span>
          <div className="h-[1px] w-full bg-border" />
        </div>
        {Object.values(providerMap).map((provider, idx) => (
          <form
            key={idx}
            action={signInWithCustomProvider.bind(null, provider)}
          >
            <OAuthButton socialName={provider.name} />
          </form>
        ))}
      </div>
    </div>
  );
};

export default Page;
