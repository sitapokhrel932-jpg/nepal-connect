import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProviders } from "@/lib/adminMockData";

type ProviderStatus = "approved" | "pending" | "suspended";

const statusBadge: Record<ProviderStatus, { variant: "default" | "destructive" | "secondary"; label: string }> = {
  approved: { variant: "default", label: "Approved" },
  pending: { variant: "secondary", label: "Pending Approval" },
  suspended: { variant: "destructive", label: "Suspended" },
};

export default function AdminProviders() {
  const [providers, setProviders] = useState(mockProviders);

  const updateStatus = (id: string, status: ProviderStatus) => {
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const pendingCount = providers.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-foreground">Providers</h1>
        {pendingCount > 0 && (
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">{pendingCount} Pending Approval</Badge>
        )}
      </div>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{providers.length} registered providers</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Earned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((p) => {
                const badge = statusBadge[p.status];
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.service}</TableCell>
                    <TableCell>{p.city}</TableCell>
                    <TableCell>{p.rating > 0 ? `⭐ ${p.rating}` : "—"}</TableCell>
                    <TableCell>{p.totalJobs}</TableCell>
                    <TableCell>Rs {p.totalEarned.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5 flex-wrap">
                        {p.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => updateStatus(p.id, "approved")}>Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => updateStatus(p.id, "suspended")}>Reject</Button>
                          </>
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
