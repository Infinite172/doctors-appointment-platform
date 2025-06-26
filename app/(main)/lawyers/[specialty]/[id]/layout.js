import { getLawyerById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const { lawyer } = await getLawyerById(id);
  return {
    title: `Dr. ${lawyer.name} - eWakil`,
    description: `Book an appointment with Dr. ${lawyer.name}, ${lawyer.specialty} specialist with ${lawyer.experience} years of experience.`,
  };
}

export default async function LawyerProfileLayout({ children, params }) {
  const { id } = await params;
  const { lawyer } = await getLawyerById(id);

  if (!lawyer) redirect("/lawyers");

  return (
    <div className="container mx-auto">
      <PageHeader
        // icon={<Gavel />}
        title={"Dr. " + lawyer.name}
        backLink={`/lawyers/${lawyer.specialty}`}
        backLabel={`Back to ${lawyer.specialty}`}
      />

      {children}
    </div>
  );
}
