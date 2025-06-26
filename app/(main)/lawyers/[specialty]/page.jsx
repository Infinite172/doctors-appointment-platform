import { redirect } from "next/navigation";
import { getLawyersBySpecialty } from "@/actions/lawyers-listing";
import { LawyerCard } from "../components/lawyer-card";
import { PageHeader } from "@/components/page-header";

export default async function LawyerSpecialtyPage({ params }) {
  const { specialty } = await params;

  // Redirect to main lawyers page if no specialty is provided
  if (!specialty) {
    redirect("/lawyers");
  }

  // Fetch lawyers by specialty
  const { lawyers, error } = await getLawyersBySpecialty(specialty);

  if (error) {
    console.error("Error fetching lawyers:", error);
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={specialty.split("%20").join(" ")}
        backLink="/lawyers"
        backLabel="All Specialties"
      />

      {lawyers && lawyers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white mb-2">
            No lawyers available
          </h3>
          <p className="text-muted-foreground">
            There are currently no verified lawyers in this specialty. Please
            check back later or choose another specialty.
          </p>
        </div>
      )}
    </div>
  );
}
