import NavigationCard from "./NavigationCard";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="my-8 grid grid-cols-4 gap-8 items-start">
        <NavigationCard />
        <div className="col-span-3 space-y-8">{children}</div>
      </div>
    </>
  );
}
