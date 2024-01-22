import { DataTypes, Model } from "sequelize";
import { sequelize } from "./postgresQL";
import { MessageInterFaceReade } from "../resource/interfaces/tripInterFace";

export const Message = sequelize.define<Model<MessageInterFaceReade>>(
    'messages' , {
        trip_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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

export const createTableMessage = async ()=>{
    try {
      await Message.sync()
    } catch (error) {
      console.error(error);
    }
  }
