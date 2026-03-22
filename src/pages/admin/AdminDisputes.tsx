import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { mockDisputes } from "@/lib/adminMockData";

type DisputeStatus = "open" | "resolved" | "refunded";

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState(mockDisputes.map(d => ({ ...d, status: d.status as DisputeStatus })));

  const updateStatus = (id: string, status: DisputeStatus) => {
    setDisputes((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Disputes</h1>

      {disputes.length === 0 && (
        <Card className="shadow-sm">
          <CardContent className="py-12 text-center text-muted-foreground">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-green-500" />
            No open disputes
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {disputes.map((d) => (
          <Card key={d.id} className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                  <CardTitle className="text-base">{d.id} — Booking {d.bookingId}</CardTitle>
                </div>
                <Badge
                  variant={d.status === "open" ? "destructive" : "default"}
                  className={d.status === "refunded" ? "bg-amber-100 text-amber-800" : ""}
                >
                  {d.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div><span className="text-muted-foreground">Customer:</span> {d.customer}</div>
                <div><span className="text-muted-foreground">Provider:</span> {d.provider}</div>
                <div><span className="text-muted-foreground">Service:</span> {d.service}</div>
                <div><span className="text-muted-foreground">Price:</span> Rs {d.price.toLocaleString()}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <p className="text-muted-foreground text-xs mb-1 font-medium">Customer Complaint</p>
                <p>{d.complaint}</p>
              </div>
              {d.status === "open" && (
                <div className="flex gap-2 pt-1">
                  <Button size="sm" onClick={() => updateStatus(d.id, "resolved")}>Mark Resolved</Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(d.id, "refunded")}>Refund Customer</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
