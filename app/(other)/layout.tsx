
export default function OtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col bg-green-300">
                {children}
        </div>
    </>
  );
}