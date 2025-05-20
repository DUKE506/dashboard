import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  session?: Session | null;
  children: React.ReactNode;
};

const AuthSession = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthSession;
