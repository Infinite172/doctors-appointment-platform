export const metadata = {
  title: "Legal Partner - eWakil",
  description: "Browse and book appointments with top legal practitioner",
};

export default async function LawyersLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
