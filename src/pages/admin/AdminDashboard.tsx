import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Briefcase, CalendarCheck, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const statusColor: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  active: "bg-blue-100 text-blue-800",
  accepted: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  disputed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-600",
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, providers: 0, bookings: 0, revenue: 0, commission: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [profilesRes, providersRes, bookingsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("provider_profiles").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      const allBookings = await supabase.from("bookings").select("final_price, commission").eq("status", "completed");
      const revenue = allBookings.data?.reduce((sum, b) => sum + (b.final_price || 0), 0) || 0;
      const commission = allBookings.data?.reduce((sum, b) => sum + (b.commission || 0), 0) || 0;

      setStats({
        users: profilesRes.count || 0,
        providers: providersRes.count || 0,
        bookings: bookingsRes.data?.length || 0,
        revenue,
        commission,
      });
      setRecentBookings(bookingsRes.data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.users, icon: Users, color: "text-primary" },
    { label: "Total Providers", value: stats.providers, icon: Briefcase, color: "text-accent" },
    { label: "Total Bookings", value: stats.bookings, icon: CalendarCheck, color: "text-blue-600" },
    { label: "Total Revenue", value: `Rs ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
    { label: "Commission (40%)", value: `Rs ${stats.commission.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-20" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color} shrink-0`} />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate">{s.label}</p>
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentBookings.length === 0 ? (
            <p className="p-6 text-center text-muted-foreground">No bookings yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.booking_number}</TableCell>
                    <TableCell>Rs {(b.final_price || b.proposed_price || 0).toLocaleString()}</TableCell>
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
