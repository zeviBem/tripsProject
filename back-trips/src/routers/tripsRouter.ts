import { error } from "console";
import { router , publicProcedure} from "../Trpc/trpc"
import { getAllTripsDal ,  getTripByIdDal, getTripByCategoryNameDal, getTripByCityDal, getMessageByTripIdDal, createNewMessageDal } from '../resource/Trips/DalTrips';
import { z } from "zod"
import { createTripService, deleteByIdService, editByIdService } from "../resource/Trips/service";


export const appRouter = router({
  getAllTrips: publicProcedure.query(getAllTripsDal),

    getTripById: publicProcedure.input(z.string()).query(async (opts) => {
      try {
        return await getTripByIdDal(opts.input);
      } catch (error) {
        console.error('Error in getTripById procedure:', error);
        throw error;
      }
    }),  

    getTripByCategoryName: publicProcedure.input(z.string()).query(async (opts) => {
      try {
        return await getTripByCategoryNameDal(opts.input)
      } catch (err) {
        console.error('Error in getTripByCategoryName procedure:', err);
        throw error
      }
    }),
    getTripByCity: publicProcedure.input(z.string()).query(async (opts) => {
      try {
        return await getTripByCityDal(opts.input)
      } catch (err) {
        console.error('Error in get trip by city procedure:', err);
        throw error
      }
    }),
    
    createNewTrip: publicProcedure.input(z.object({
      token: z.string(),
      newData: z.object({
        title: z.string(),
        city: z.string(),
        land: z.string(),
        street: z.string(),
        coordinatesx: z.string(),
        coordinatesy: z.string(),
        imageurl: z.string(),
        imagealt: z.string(),
        description: z.string(),
        price: z.string(),
        activitytime: z.string(),
        category: z.string(),
    })
    })).mutation(async (opts) => {
      const {token, newData: {title, city, land, street, coordinatesx, coordinatesy, imageurl, imagealt, description, price, activitytime, category}} = opts.input;
    const data = {title, city, land, street, coordinatesx, coordinatesy, imageurl, imagealt, description, price, activitytime, category};
      try {
        const createTrip = await createTripService(token ,data);
        return createTrip
        } catch (err) {
        console.error('Error in creating a new trip:', err);
        throw err;
      }
    }),


    deleteById: publicProcedure.input(z.object({id: z.number(), token: z.string()})).mutation(async (opts) => {
      try {
        const { id, token } = opts.input
        const deleted = await deleteByIdService( id, token );
        return deleted
      } catch (err) {
        console.error('Error in deletingTripById procedure:', err);
        throw err;
      }
    }),

    editTripById: publicProcedure.input(z.object({
      id: z.string(),
      token: z.string(),
      updateData: z.object({
        title: z.string(),
        city: z.string(),
        land: z.string(),
        street: z.string(),
        coordinatesx: z.string(),
        coordinatesy: z.string(),
        imageurl: z.string(),
        imagealt: z.string(),
        description: z.string(),
        price: z.string(),
        activitytime: z.string(),
        category: z.string()
      })
    })).mutation( async(opts) => {
      try {
        const { id, token, updateData } = opts.input;
        const editTrip = await editByIdService(id, token, updateData);
        return editTrip;
      } catch(err) {
        console.error('Error in editTripById procedure:', err);
        throw err;
      }
    }),

    getMessageByTripId: publicProcedure.input(z.number()).query(async (opts) => {
      try {
        return await getMessageByTripIdDal(opts.input)
      } catch (err) {
        console.error('Error in get message by trip id procedure:', err);
      }
    }),

    createNewMessage: publicProcedure.input(z.object({
      trip_id: z.number(),
      name: z.string(),
      massage: z.string()
    })).mutation(async (opts) => {
      const {trip_id, name, massage} = opts.input;
      const newMessage = {trip_id, name, massage}
      try {
      const createMessage = await createNewMessageDal(newMessage);
      return createMessage
    } catch (err){
      console.error('Error in create message  procedure:', err);
    }
    })

})