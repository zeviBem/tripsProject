import { DataTypes, Model } from "sequelize";
import { sequelize } from "./postgresQL";
import { MessageInterFaceCreate, MessageInterFaceReade } from "../resource/interfaces/tripInterFace";

export const Message = sequelize.define<Model<MessageInterFaceReade, MessageInterFaceCreate>>(
    
    'messages' , {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        trip_id:{
            type: DataTypes.INTEGER,

        },

        name: {
            type: DataTypes.STRING,
        },

        massage: {
            type: DataTypes.STRING,
        }
    }, {
        createdAt: false,
        updatedAt: false
    }
)

