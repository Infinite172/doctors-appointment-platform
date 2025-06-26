import React from 'react';
import { checkUser } from "@/lib/checkUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { creditBenefitsLawyers, creditBenefitsClients } from "@/lib/data";

export default async function CreditBenefits() {
    const user = await checkUser();

    // Set benefits based on role
    const isAdminOrNoUser = user?.role === 'ADMIN' || !user;
    const isTwoColumn = isAdminOrNoUser;

    let leftBenefits = [];
    let rightBenefits = [];

    if (user?.role === 'LAWYER') {
        leftBenefits = creditBenefitsLawyers;
    } else if (user?.role === 'CLIENT') {
        leftBenefits = creditBenefitsClients;
    } else if (isAdminOrNoUser) {
        leftBenefits = creditBenefitsClients;
        rightBenefits = creditBenefitsLawyers;
    }

    return (
        <Card className=" bg-muted/20 border-emerald-900/30">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-emerald-500" />
                    How Our Credit System Works
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isTwoColumn ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Column 1: Clients */}
                        <div>
                            <h3 className="pl-8 text-lg font-semibold text-white mb-4 border-l-4 border-emerald-500">For Clients:</h3>
                            <ul className="space-y-3">
                                {leftBenefits.map((benefit, index) => (
                                    <li key={`client-${index}`} className="flex items-start">
                                        <div className="mr-3  bg-emerald-900/20 p-1 rounded-full">
                        <svg
                          className="h-4 w-4 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Lawyers */}
                        <div>
                            <h3 className="pl-8 text-lg font-semibold text-white mb-4 border-l-4 border-emerald-500">For Lawyers:</h3>
                            <ul className="space-y-3">
                                {rightBenefits.map((benefit, index) => (
                                    <li key={`lawyer-${index}`} className="flex items-start">
                                        <div className="mr-3 bg-emerald-900/20 p-1 rounded-full">
                        <svg
                          className="h-4 w-4 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    // Single column layout
                    <ul className="space-y-3">
                        {leftBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                                <div className="mr-3 bg-emerald-900/20 p-1 rounded-full">
                        <svg
                          className="h-4 w-4 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
