import morgan from "morgan";
 import cors from "cors";
import pg from 'pg';
import { ApolloServer } from 'apollo-server';
import { makeSchemaAndPlugin } from 'postgraphile-apollo-server';
import http from "http";
import express,{ request, response} from 'express'
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import postgraphile from "postgraphile";

    const pgPool = new pg.Pool({
      // connectionString:"postgres://postgres:postgres@localhost:5432/users"
      host: "dpg-cm3v2ha1hbls73a9tb10-a.oregon-postgres.render.com",
      port: 5432,
      database: "zeevdatabase",
      user: "zeev",
      password: "dp05LCj0YwdJE3AKhLlims7jxrp2OnpJ",
      ssl: true

  });
  


  const app = express();
  app.use(postgraphile(pgPool,
    'test', {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }))
  // const httpServer = http.createServer(app);
  
  // const main = async() => {
  //   const { schema, plugin } = await makeSchemaAndPlugin(
  //     pgPool,
  //     'test', 
  //     {
  //       watchPg: true,
  //       graphiql: true,
  //       enhanceGraphiql: true,
  //       ownerConnectionString: 'owner',
  //       jwtSecret: "secret",
  //       //jwtPgTypeIdentifier: "app_public.jwt_token",
  //       pgDefaultRole: true,
   
  //     }
  //   );

  //   const server = new ApolloServer({
  //     schema,
  //     plugins: [plugin ,ApolloServerPluginDrainHttpServer({ httpServer }), ],
  //     context: ({ request, response })

  //   });

    app.use(
      "/graphql",
      cors(),
      express.json(),
      morgan("tiny"),
    );
    // const { url } = await server.listen();
    // console.log(`🚀 Server ready at ${url}`);
  //  }


// main().catch(e => {
//   console.error(e);
//   process.exit(1);
// });


app.listen(4000,() => console.log("server is listen in http://localhost:4000/graphiql"))



