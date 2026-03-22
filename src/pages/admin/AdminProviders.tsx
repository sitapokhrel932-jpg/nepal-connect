import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type ProviderStatus = Database["public"]["Enums"]["provider_status"];

export default function AdminProviders() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {
    const { data } = await supabase
      .from("provider_profiles")
      .select("*, profiles(full_name), services(name)")
      .order("created_at", { ascending: false });
    setProviders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProviders(); }, []);

  const updateStatus = async (id: string, status: ProviderStatus) => {
    await supabase.from("provider_profiles").update({ status }).eq("id", id);
    fetchProviders();
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  const statusColors: Record<string, string> = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
    suspended: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Providers</h1>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{providers.length} providers</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {providers.length === 0 ? (
            <p className="p-6 text-center text-muted-foreground">No providers registered yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.profiles?.full_name || "—"}</TableCell>
                    <TableCell>{p.services?.name || "—"}</TableCell>
                    <TableCell>{p.city || "—"}</TableCell>
                    <TableCell>{p.rating || 0}</TableCell>
                    <TableCell>{p.total_jobs || 0}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[p.status] || ""}>{p.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {p.status === "pending" && (
                          <Button size="sm" onClick={() => updateStatus(p.id, "approved")}>Approve</Button>
                        )}
                        {p.status === "approved" && (
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(p.id, "suspended")}>Suspend</Button>
                        )}
                        {p.status === "suspended" && (
                          <Button size="sm" onClick={() => updateStatus(p.id, "approved")}>Activate</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
