import { BackButton } from "@/components/BackButton";

export default function Pictures(){
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-3xl font-bold">Pictures Page</h1>
                <p className="mt-4 text-lg text-gray-700">This is the Pictures page of our application. Here you can find various images for different purposes.
                </p>
                 <BackButton/>
            </div>
  );
}