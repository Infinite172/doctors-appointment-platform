import React from "react";
import { Button } from "./ui/button";
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Gavel,
  User,
  Scale,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import { checkAndAllocateCredits } from "@/actions/credits";

export default async function Header() {
  const user = await checkUser();
  if (user?.role === "CLIENT") {
    await checkAndAllocateCredits(user);
  }

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-20 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center cursor-pointer">
          <Scale
            // src="/logo-single.png"
            alt="eWakil"
            width={60}
            height={60}
            className="h-10 object-contain text-emerald-400"
          />
          <p className="text-emerald-400 font-bold text-2xl hidden sm:block whitespace-nowrap">eWakil</p>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <SignedIn>
            {/* Admin Links */}
            {user?.role === "ADMIN" && (
              <div className="hidden md:block">
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
              </div>
            )}

            {/* Lawyer Links */}
            {user?.role === "LAWYER" && (
              <div className="hidden md:block">
                <Link href="/lawyer">
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Gavel className="h-4 w-4" />
                    Lawyer Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Client Links */}
            {user?.role === "CLIENT" && (
              <Link className="cursor-pointer" href="/appointments">
                <Button
                  variant="outline"
                  className="hidden cursor-pointer md:inline-flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>
                <Button variant="ghost" className="md:hidden cursor-pointer w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Unassigned Role */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          {(!user || user?.role !== "ADMIN") && (
          <Link href={!user || user?.role === "LAWYER" ? "" : "/pricing"}>
              <Badge
                variant="outline"
                className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 cursor-default flex items-center gap-2"
              >
                <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">
                  {user && user.role !== "ADMIN" ? (
                    <>
                      {user.credits}{" "}
                      <span className="">
                        {user?.role === "CLIENT"
                          ? "Credits"
                          : "Earned Credits"}
                      </span>
                    </>
                  ) : (
                    <>Pricing</>
                  )}
                </span>
              </Badge>
            </Link>
          )}

          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}