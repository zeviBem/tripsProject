import * as dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();
const postgresUrl = process.env.POSTGRES_URL
export const sequelize = new Sequelize(postgresUrl, 
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

  });

export const connectToDBPg = async () => {
  try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL")
  } catch (err) {
    console.log("error to get the data", err)
  }
}




