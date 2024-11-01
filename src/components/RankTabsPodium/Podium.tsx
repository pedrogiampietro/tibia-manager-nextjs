"use client";

import AnimatedOutfit from "@/components/aimations/AnimatedOutfit";
import { RankItem } from "./RankItem.interface";

export function Podium({ data }: { data: RankItem[] }) {
  const positions =
    data.length >= 3 ? [2, 1, 3] : data.length === 2 ? [1, 2] : [1];

  return (
    <div className="flex justify-center items-end mb-6 mt-2">
      {positions.map((position, index) => {
        const item: RankItem = data[position - 1] || data[index];
        const podiumHeight =
          position === 1 ? "h-20" : position === 2 ? "h-16" : "h-12";

        return (
          <div key={position} className="flex flex-col items-center mx-2">
            <div className="relative mb-2 flex items-center justify-center">
              <div className="rounded-full border-2 border-gray-300 w-16 h-16 flex items-center justify-center bg-background overflow-hidden">
                {item && (
                  <div className="w-14 h-14 flex items-center justify-center">
                    <AnimatedOutfit outfit={item} alt={item.name} />
                  </div>
                )}
              </div>
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {position}
              </div>
            </div>

            <div className="text-center mb-2">
              <div className="font-semibold text-sm truncate max-w-[80px]">
                {item?.name || "N/A"}
              </div>
              <div className="text-xs text-muted-foreground">
                Level {item?.level || "N/A"}
              </div>
            </div>
            <div className={`w-full bg-primary rounded-t-md ${podiumHeight}`}></div>
          </div>
        );
      })}
    </div>
  );
}
