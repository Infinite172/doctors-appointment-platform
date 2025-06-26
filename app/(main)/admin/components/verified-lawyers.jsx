"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Ban, Loader2, User, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { updateLawyerActiveStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function VerifiedLawyers({ lawyers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [targetLawyer, setTargetLawyer] = useState(null);
  const [actionType, setActionType] = useState(null);

  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateLawyerActiveStatus);

  const filteredLawyers = lawyers.filter((lawyer) => {
    const query = searchTerm.toLowerCase();
    return (
      lawyer.name.toLowerCase().includes(query) ||
      lawyer.specialty.toLowerCase().includes(query) ||
      lawyer.email.toLowerCase().includes(query)
    );
  });

  const handleStatusChange = async (lawyer, suspend) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${suspend ? "suspend" : "reinstate"} ${
        lawyer.name
      }?`
    );
    if (!confirmed || loading) return;

    const formData = new FormData();
    formData.append("lawyerId", lawyer.id);
    formData.append("suspend", suspend ? "true" : "false");

    setTargetLawyer(lawyer);
    setActionType(suspend ? "SUSPEND" : "REINSTATE");

    await submitStatusUpdate(formData);
  };

  useEffect(() => {
    if (data?.success && targetLawyer && actionType) {
      const actionVerb = actionType === "SUSPEND" ? "Suspended" : "Reinstated";
      toast.success(`${actionVerb} ${targetLawyer.name} successfully!`);
      setTargetLawyer(null);
      setActionType(null);
    }
  }, [data]);

  return (
    <div>
      <Card className="bg-muted/20 border-emerald-900/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-white">
                Manage Lawyers
              </CardTitle>
              <CardDescription>
                View and manage all verified lawyers
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lawyers..."
                className="pl-8 bg-background border-emerald-900/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredLawyers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No lawyers match your search criteria."
                : "No verified lawyers available."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLawyers.map((lawyer) => {
                const isSuspended = lawyer.verificationStatus === "REJECTED";
                return (
                  <Card
                    key={lawyer.id}
                    className="bg-background border-emerald-900/20 hover:border-emerald-700/30 transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted/20 rounded-full p-2">
                            <User className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {lawyer.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {lawyer.specialty} • {lawyer.experience} years
                              experience
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {lawyer.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                          {isSuspended ? (
                            <>
                              <Badge
                                variant="outline"
                                className="bg-red-900/20 border-red-900/30 text-red-400"
                              >
                                Suspended
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(lawyer, false)
                                }
                                disabled={loading}
                                className="border-emerald-900/30 hover:bg-muted/80"
                              >
                                {loading && targetLawyer?.id === lawyer.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4 mr-1" />
                                )}
                                Reinstate
                              </Button>
                            </>
                          ) : (
                            <>
                              <Badge
                                variant="outline"
                                className="bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
                              >
                                Active
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(lawyer, true)}
                                disabled={loading}
                                className="border-red-900/30 hover:bg-red-900/10 text-red-400"
                              >
                                {loading && targetLawyer?.id === lawyer.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Ban className="h-4 w-4 mr-1" />
                                )}
                                Suspend
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
