import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp } from "lucide-react";
import { mockEarnings } from "@/lib/adminMockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AdminEarnings() {
  const { totalRevenue, totalCommission, monthlyBreakdown, recentPayouts } = mockEarnings;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Earnings</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <DollarSign className="w-10 h-10 text-green-600 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Total Platform Revenue</p>
              <p className="text-2xl font-bold text-foreground">Rs {totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Total Commission (40%)</p>
              <p className="text-2xl font-bold text-foreground">Rs {totalCommission.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `Rs ${v.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="hsl(160 45% 28%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="commission" name="Commission" fill="hsl(36 90% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Completed Payments</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyBreakdown.map((m) => (
                  <TableRow key={m.month}>
                    <TableCell>{m.month}</TableCell>
                    <TableCell>Rs {m.revenue.toLocaleString()}</TableCell>
                    <TableCell>Rs {m.commission.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Provider Payout History</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayouts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell>{p.provider}</TableCell>
                    <TableCell>Rs {p.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{p.date}</TableCell>
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
