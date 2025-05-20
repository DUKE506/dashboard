import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();

  console.log("서버 렌더링");
  console.log(session);

  return (
    <div className="space-y-8">
      <div className="text-2xl">After Login Page</div>
      <div className="space-y-4">
        <div className="space-x-4">
          <span className="min-w-15">Expires</span>
          <span>{session?.expires}</span>
        </div>
        <div className="space-x-4">
          <span className="min-w-15">User</span>
          <span>{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
};
