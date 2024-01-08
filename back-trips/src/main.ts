import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { connectToDBPg } from './postgrasQL/postgresQL';
import cors from 'cors';
import dotenv from 'dotenv';
import { appRouter } from './routers/tripsRouter';
import { connectToRedis } from './Redis/redisConnection';


dotenv.config();

const port = process.env.PORT

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors()
});

const startServer = async () => {
  try {
    await (connectToDBPg());
    await(connectToRedis());
    server.listen(3000);
    console.log(`listening on port ${port}`); 
  } catch (error) {
    console.error('Error during server setup:', error);
    process.exit(1); 
  }
};
startServer();