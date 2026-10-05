import { BackButton } from "@/components/BackButton";

export default function Forms(){
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-3xl font-bold">Forms Page</h1>
                <p className="mt-4 text-lg text-gray-700">This is the Forms page of our application. Here you can find various forms for different purposes.
                </p>
                 <BackButton/>
            </div>
  );
}