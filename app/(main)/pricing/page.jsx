import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, Shield, Check } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Pricing from "@/components/pricing";
import Questions from "@/components/questions";

export default async function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex cursor-pointer justify-start mb-2">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-full mx-auto mb-12 text-center">
        <Badge
          variant="outline"
          className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
        >
          Affordable legal services
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
          Simple, Transparent Pricing
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect consultation package that resolve your legal
          concerns with no hidden fees or long-term commitments
        </p>
      </div>

      {/* Pricing Table Section */}
      <Pricing />

      {/* FAQ Section - Optional */}
      <Questions />
    </div>
  );
}
