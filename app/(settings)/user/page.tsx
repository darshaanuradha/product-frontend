import { BackButton } from "@/components/BackButton";

export default function User(){
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-3xl font-bold">User Page</h1>
                <p className="mt-4 text-lg text-gray-700">This is the User Settings page of our application. Here you can find information about your account settings and preferences.
                </p>
                 <BackButton/>
            </div>
  );
}