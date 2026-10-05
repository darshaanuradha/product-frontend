import { BackButton } from "@/components/BackButton";

export default function Contact() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
            <h1 className="text-3xl font-bold">Contact Page</h1>
            <p className="mt-4 text-lg text-gray-700">
                This is the Contact page of our application. You can reach us through the contact form or find our contact information here.
            </p>
             <BackButton/>
        </div>
    );
}