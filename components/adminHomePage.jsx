import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { checkUser } from "@/lib/checkUser";
import { adminFeatures } from "@/lib/data";
import CreditBenefits from "@/components/credit-benefits";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Testimonials from "@/components/testimonials";
import { ShieldCheck } from "lucide-react";


export default async function AdminHomePage() {
  const user = await checkUser();

  if (user?.role !== "ADMIN") {
    return null; // Optional: redirect or return 403 page
  }

  return (
    <div className="bg-background">
      {/* Admin Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium"
              >
                Admin
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Manage your platform <br />
                <span className="gradient-title">transparently and efficiently</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Oversee users, lawyers, credits, appointments, and all platform operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-emerald-600 text-white hover:bg-emerald-700 md:hidden"
                  >
                  <Link href="/admin">
                  <ShieldCheck className="h-4 w-4" />
                    DashBoard
                  </Link>
                    </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-emerald-700/30 hover:bg-muted/80"
                >
                  <Link href="/lawyers">View Lawyers</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/qwer.png"
                alt="Admin"
                fill
                priority
                className="object-cover md:pt-14 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section id="feature" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Admin Capabilities
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tools to monitor, manage, and maintain the platform's integrity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        <Testimonials />
    
        <CreditBenefits />

    </div>
  );
}
