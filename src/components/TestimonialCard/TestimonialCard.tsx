import { Card, CardContent } from "@/components/ui/card";
import { Star, UserRound } from "lucide-react";

export default function TestimonialCard() {
  return (
    <Card className="w-full bg-card border border-primary shadow-sm">
      <CardContent>
        <div className="flex items-center gap-4">
          <UserRound className="w-10 h-10" />
          <article>
            <p className="text-base font-semibold">
              Misal di sini nama reviewer
            </p>
            <div className="flex items-center gap-1.5">
              <Star className="fill-yellow-400 text-yellow-400" size={16} />
              <p>4/5</p>
            </div>
          </article>
        </div>
        <article className="mt-6">
          <p className="text-gray-700 text-justify line-clamp-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            semper accumsan dictum. Suspendisse maximus, felis id lobortis
            commodo, tellus nunc varius purus, finibus feugiat mi orci ut
            tortor. Sed porta euismod dolor in auctor. Morbi sed malesuada
            magna. Ut lorem neque, tempor in dui a, feugiat porttitor nibh.{" "}
          </p>
        </article>
      </CardContent>
    </Card>
  );
}
