import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { connectToDBPg } from './postgrasQL/postgresQL';
import cors from 'cors';
import dotenv from 'dotenv';
import { appRouter } from './routers/tripsRouter'


dotenv.config();

const port = process.env.PORT

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors()
});

const startServer = async () => {
  try {
    server.listen(3000);
    console.log(`listening on port ${port}`);    
    await connectToDBPg();
  } catch (error) {
    console.error('Error during server setup:', error);
    process.exit(1); 
  }
};
startServer();