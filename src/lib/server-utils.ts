import configLua from "@/hooks/configLua";
import { StatusServer } from "@/utils/statusServer";
import { prisma } from "./prisma";

const lua = configLua()

export async function status() {
    try {
      const statusServer = new StatusServer();
      const host = lua['ip']
      const port = +lua['statusProtocolPort'];
      const status = await statusServer.getStatus(host, port);
      return {
        status: !!status,
      };
    } catch (error) {
      console.error('Ocorreu um erro ao verificar o status do servidor:', error);
      return {
        status: false,
      };
    }
  }
  
  export async function totalOnline() {
    try {
      const som = await prisma.players_online.count()
      return som
    } catch (error) {
      console.error('Ocorreu um erro ao contar o toral de players online:', error);
      return 0
    }
  }
  
  function extractIdsFromArrayOfObjects(array: any) {
    function extractIdFromUrl(url: string) {
      const match = url.match(/id=(\d+)/);
      return match ? match[1] : null;
    }
  
    function extractIdsFromObject(obj: any) {
      const id = extractIdFromUrl(obj.value);
      return { id, config: obj.config };
    }
  
    return array.map(extractIdsFromObject);
  }
  
export async function getSeverConfig(value: string) {
    const array1 = await prisma.$queryRaw<{ config: string, value: string }>`SELECT * from server_config WHERE config = ${value}`
  
    return extractIdsFromArrayOfObjects(array1);
  }