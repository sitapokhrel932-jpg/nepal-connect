import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Briefcase, CalendarCheck, DollarSign, TrendingUp } from "lucide-react";
import { mockUsers, mockProviders, mockBookings, mockEarnings, weeklyBookings } from "@/lib/adminMockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  active: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  disputed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-600",
};

const stats = [
  { label: "Total Users", value: mockUsers.length, icon: Users, color: "text-primary" },
  { label: "Total Providers", value: mockProviders.length, icon: Briefcase, color: "text-accent" },
  { label: "Total Bookings", value: mockBookings.length, icon: CalendarCheck, color: "text-blue-600" },
  { label: "Total Revenue", value: `Rs ${mockEarnings.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
  { label: "Commission (40%)", value: `Rs ${mockEarnings.totalCommission.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
];

export default function AdminDashboard() {
  const recentBookings = mockBookings.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
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

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Bookings This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(160 45% 28%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.id}</TableCell>
                    <TableCell>{b.service}</TableCell>
                    <TableCell>Rs {b.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColor[b.status]}>{b.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
