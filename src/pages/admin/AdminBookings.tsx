import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  accepted: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  disputed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-600",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("bookings")
      .select("*, services(name)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error("Failed to load bookings: " + error.message);
        setBookings(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{bookings.length} bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {bookings.length === 0 ? (
            <p className="p-6 text-center text-muted-foreground">No bookings yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.booking_number}</TableCell>
                    <TableCell>{b.services?.name || "—"}</TableCell>
                    <TableCell>{b.city || "—"}</TableCell>
                    <TableCell>Rs {(b.final_price || b.proposed_price || 0).toLocaleString()}</TableCell>
                    <TableCell>Rs {(b.commission || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColor[b.status] || ""}>{b.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{new Date(b.created_at).toLocaleDateString()}</TableCell>
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
