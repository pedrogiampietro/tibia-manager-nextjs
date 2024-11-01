import { prisma } from "@/lib/prisma";

const TOP_PLAYERS_LIMIT = 5;

export async function fetchTopPlayersByExperience() {
  try {
    const players = await prisma.players.findMany({
      where: {
        AND: [
          { id: { not: { in: [1, 2, 3, 4, 5] } } },
          { group_id: { not: { in: [6] } } },
        ],
      },
      select: {
        id: true,
        name: true,
        level: true,
        vocation: true,
        looktype: true,
        lookaddons: true,
        lookhead: true,
        lookbody: true,
        looklegs: true,
        lookfeet: true,
      },
      orderBy: { experience: "desc" },
      take: TOP_PLAYERS_LIMIT,
    });

    return players;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch top players.");
  }
}
