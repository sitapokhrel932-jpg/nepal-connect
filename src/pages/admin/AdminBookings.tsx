import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockBookings } from "@/lib/adminMockData";

const statusColor: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  active: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  disputed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-600",
};

const allCities = ["All", ...Array.from(new Set(mockBookings.map((b) => b.city)))];
const allServices = ["All", ...Array.from(new Set(mockBookings.map((b) => b.service)))];
const allStatuses = ["All", "pending", "active", "completed", "disputed", "cancelled"];

export default function AdminBookings() {
  const [cityFilter, setCityFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return mockBookings.filter((b) => {
      if (cityFilter !== "All" && b.city !== cityFilter) return false;
      if (serviceFilter !== "All" && b.service !== serviceFilter) return false;
      if (statusFilter !== "All" && b.status !== statusFilter) return false;
      return true;
    });
  }, [cityFilter, serviceFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Bookings</h1>

      <div className="flex flex-wrap gap-3">
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="City" /></SelectTrigger>
          <SelectContent>{allCities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Service" /></SelectTrigger>
          <SelectContent>{allServices.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>{allStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{filtered.length} bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell>{b.customer}</TableCell>
                  <TableCell>{b.provider}</TableCell>
                  <TableCell>{b.service}</TableCell>
                  <TableCell>{b.city}</TableCell>
                  <TableCell>Rs {b.price.toLocaleString()}</TableCell>
                  <TableCell>Rs {b.commission.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColor[b.status]}>{b.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs">{b.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
