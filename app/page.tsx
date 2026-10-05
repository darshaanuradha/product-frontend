import { BackButton } from "@/components/BackButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p className="mt-4 text-lg text-gray-700">
        Welcome to the Home page of our application. This is the main landing page where you can find an overview of the application and its features.
      </p>
      <BackButton />
    </div>
    
  );
}
