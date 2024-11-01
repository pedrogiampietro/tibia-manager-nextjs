"use client";

import AnimatedOutfit from "@/components/aimations/AnimatedOutfit";
import { RankItem } from "./RankItem.interface";

export function RankingList({ data }: { data: RankItem[] }) {
  return (
    <div className="space-y-2">
      {data.slice(3).map((item, index) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="w-6 font-bold text-muted-foreground">{index + 4}</div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
            <AnimatedOutfit
                outfit={item} alt={item.name}
            />
          </div>
          <div className="flex-1">
            <div className="font-medium">{item.name}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Level
            <div className="font-medium text-foreground text-right">{item.level}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
