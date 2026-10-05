
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col bg-red-300">
                {children}
        </div>
    </>
  );
}