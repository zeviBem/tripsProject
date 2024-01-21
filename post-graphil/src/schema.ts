// schema.ts
import { postgraphile } from 'postgraphile';

const { DBNAME, USER, PASSWORD, HOST, PORT_PG } = process.env;
console.log(typeof(USER), USER);

const postgraphileInstance = postgraphile(
    {
        database: 'users',
        user: 'zeev',
        password: "dp05LCj0YwdJE3AKhLlims7jxrp2OnpJ",
        host: 'dpg-cm3v2ha1hbls73a9tb10-a.oregon-postgres.render.com',
        port: 5432,
        ssl: { rejectUnauthorized: false }, // Adjust this as needed
    },
    'public',
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
);


export default postgraphileInstance;
