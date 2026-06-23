import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="py-10 px-40">
      <Card className="bg-primary-foreground border border-primary">
        <CardContent>
          <p>Current Role: Buyer</p>
          <p>Email: Buyer</p>
          <p>Username: Buyer</p>
          <Button>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
}
