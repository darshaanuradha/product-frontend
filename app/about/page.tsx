import { BackButton } from "@/components/BackButton";

export default function About() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-3xl font-bold">About Page</h1>
            <p className="mt-4 text-lg text-gray-700">
                This is the About page of our application. Here you can find information about our mission, vision, and team.
            </p>
             <BackButton/>
        </div>
    );
}   