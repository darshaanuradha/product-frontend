import { BackButton } from "@/components/BackButton";

export default function Instructions() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
            <h1 className="text-3xl font-bold">Instructions Page</h1>
            <p className="mt-4 text-lg text-gray-700">
                This is the Instructions page of our application. Here you can find detailed instructions on how to use the application effectively.
            </p>
            <BackButton href="/about">
                Back to About
            </BackButton>
        </div>
    );
}