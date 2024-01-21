import morgan from "morgan";
 import cors from "cors";
import pg from 'pg';
import express from 'express'
import postgraphile from "postgraphile";

  const pgPool = new pg.Pool({
    host: "dpg-cm3v2ha1hbls73a9tb10-a.oregon-postgres.render.com",
    port: 5432,
    database: "zeevdatabase",
    user: "zeev",
    password: "dp05LCj0YwdJE3AKhLlims7jxrp2OnpJ",
    ssl: true

});

  const app = express();

  app.use(cors());

  app.use(postgraphile(pgPool,
    'test', {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      graphqlRoute: '/graphql',
      graphiqlRoute: '/graphiql',
      jwtPgTypeIdentifier: "test.jwt_token",
      jwtSecret: process.env.JWT_SECRET
    }))
  app.use(
    "/graphql",
    express.json(),
    morgan("tiny"),
  );


app.listen(4000,() => console.log("server is listen in http://localhost:4000/graphiql"))