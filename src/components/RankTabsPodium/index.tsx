import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users } from "lucide-react";
import { fetchTopPlayersByExperience } from "./actions";
import { Podium } from "./Podium";
import { RankingList } from "./RankingList";

export async function RankPodiumListWidget() {
  const topPlayers = await fetchTopPlayersByExperience();

  return (
    <Card className="w-full max-w-md">
      <Tabs defaultValue="players" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="guilds" className="gap-2">
            <Users className="h-4 w-4" />
            Top Guilds
          </TabsTrigger>
          <TabsTrigger value="players" className="gap-2">
            <Trophy className="h-4 w-4" />
            Top Players
          </TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          <CardContent>
            <Podium data={topPlayers} />
            <RankingList data={topPlayers} />
          </CardContent>
        </TabsContent>

        {/* Include the guilds tab if needed */}
      </Tabs>
    </Card>
  );
}
