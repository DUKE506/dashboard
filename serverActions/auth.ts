"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { Provider } from "next-auth/providers";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (formData: FormData) => {
  console.log(formData);

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/error?error=${error.type}`);
    }
    throw error;
  }
};

export const signInWithCustomProvider = async (
  provider: Record<string, string>
) => {
  try {
    await signIn(provider.id, { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/error?error=${error.type}`);
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
