import { Card } from "@/components/ui/card";
import TempContent from "./TempContent";

export default function ProfilePage() {
  return (
    <div className="py-10 px-40">
      <Card className="bg-primary-foreground border border-primary">
        <TempContent />
      </Card>
    </div>
  );
}
