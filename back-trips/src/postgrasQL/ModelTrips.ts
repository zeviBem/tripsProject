import { DataTypes, Model } from "sequelize";
import { sequelize } from "./postgresQL";
import { TripInterFaceRead, TripInterFaceCreate } from "../resource/interfaces/tripInterFace";

export const Trips = sequelize.define<Model<TripInterFaceRead, TripInterFaceCreate>>(
    'trips', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    
        title: {
            type: DataTypes.STRING,
        },
    
        city: {
            type: DataTypes.STRING,
        },
        land: {
            type: DataTypes.STRING,
        },
        street: {
            type: DataTypes.STRING,
        },
        coordinatesx: {
            type: DataTypes.STRING,
        },
        coordinatesy: {
            type: DataTypes.STRING,
        },
        imageurl: {
            type: DataTypes.STRING,
        },
        imagealt: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        },
        activitytime: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        
    },{
        createdAt: false,
        updatedAt: false
    }
)

export const createTable = async ()=>{
    try {
      await Trips.sync()
    } catch (error) {
      console.error(error);
    }
  }
