import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-black py-6 px-6 sm:px-12 md:px-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading + Back Link Row */}
        <div className="flex items-center ">
          <PageHeader
            title={"Terms And Conditions"}
            backLink="/"
            backLabel="Back to Home"
          />
        </div>

        <p className="text-md text-white mb-12">
          Welcome to eWakil. Please read these Terms and Conditions carefully
          before using our platform.
        </p>

        {/* Clients Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-emerald-400 border-l-4 border-emerald-600 pl-4">
            For Clients
          </h2>
          <ul className="list-none space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                Clients must provide accurate and complete information during
                registration and appointment booking.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                Appointments booked through eWakil are subject to availability
                and confirmation by the lawyer.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                Clients agree to respect the lawyers’ time and cancel or
                reschedule appointments in a timely manner.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                All payments and credits used for services are non-refundable
                unless otherwise stated.
              </p>
            </li>
          </ul>
        </section>

        {/* Lawyers Section */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400 border-l-4 border-emerald-600 pl-4">
            For Lawyers
          </h2>
          <ul className="list-none space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                Lawyers must maintain professional conduct and adhere to
                applicable legal ethics.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                Lawyers are responsible for confirming appointments and managing
                their availability accurately.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                All client data received through the platform must be handled with
                confidentiality and care.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <p className="text-white text-md leading-relaxed">
                Lawyers must ensure timely communication with clients and respond
                promptly to appointment requests.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
