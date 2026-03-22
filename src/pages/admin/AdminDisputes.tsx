import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDisputes = async () => {
    const { data } = await supabase
      .from("disputes")
      .select("*, bookings(booking_number, city, proposed_price, final_price)")
      .order("created_at", { ascending: false });
    setDisputes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchDisputes(); }, []);

  const updateStatus = async (id: string, status: "open" | "resolved") => {
    await supabase.from("disputes").update({ status }).eq("id", id);
    fetchDisputes();
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Disputes</h1>
      {disputes.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="py-12 text-center text-muted-foreground">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-green-500" />
            No disputes found
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {disputes.map((d) => (
            <Card key={d.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                    <CardTitle className="text-base">Booking {d.bookings?.booking_number || d.booking_id}</CardTitle>
                  </div>
                  <Badge variant={d.status === "open" ? "destructive" : "default"}>{d.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  <p className="text-muted-foreground text-xs mb-1 font-medium">Reason</p>
                  <p>{d.reason}</p>
                </div>
                {d.status === "open" && (
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" onClick={() => updateStatus(d.id, "resolved")}>Mark Resolved</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
