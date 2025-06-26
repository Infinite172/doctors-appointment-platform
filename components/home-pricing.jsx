import React from 'react';
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/pricing";


export default async function HomePricing() {
return(
<>
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
            >
              Affordable Legal Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Consultation Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect consultation package that fits your legal
              needs
            </p>
          </div>
          <Pricing />
          </>
)}