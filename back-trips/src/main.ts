import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { connectToDBPg } from './postgrasQL/postgresQL';
import cors from 'cors';
import { appRouter } from "./routers/tripsRouter";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import ws from "ws";
import { connectToRedis } from "./Redis/redisConnection";
import { createTable } from "./postgrasQL/ModelTrips";

type AppRouter = typeof appRouter;
export default AppRouter;

const ourServer = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
})

applyWSSHandler({
  wss: new ws.Server(ourServer),
  router: appRouter,
  createContext: () => {
    return {};
  }
});

console.log('server is up on port 3000');
ourServer.listen(3000);
connectToDBPg();
// createTable();
connectToRedis();
