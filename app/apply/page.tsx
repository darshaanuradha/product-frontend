import { BackButton } from "@/components/BackButton";

export default function apply() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <h1 className="text-3xl font-bold">Apply Page</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is the Apply page of our application. Here you can find information about how to apply and submit your application.
      </p>
       <BackButton/>
    </div>
    
  );
}