import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function AdminEarnings() {
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [completedBookings, setCompletedBookings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, services(name)")
        .eq("status", "completed")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load earnings: " + error.message);
        setLoading(false);
        return;
      }

      const bookings = data || [];
      setCompletedBookings(bookings);
      setTotalRevenue(bookings.reduce((sum, b) => sum + (b.final_price || 0), 0));
      setTotalCommission(bookings.reduce((sum, b) => sum + (b.commission || 0), 0));
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
              <p className="text-lg font-bold">Rs {totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Platform Commission</p>
              <p className="text-lg font-bold">Rs {totalCommission.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Completed Payments</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {completedBookings.length === 0 ? (
            <p className="p-6 text-center text-muted-foreground">No completed payments yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedBookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.booking_number}</TableCell>
                    <TableCell>{b.services?.name || "—"}</TableCell>
                    <TableCell>Rs {(b.final_price || 0).toLocaleString()}</TableCell>
                    <TableCell>Rs {(b.commission || 0).toLocaleString()}</TableCell>
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
