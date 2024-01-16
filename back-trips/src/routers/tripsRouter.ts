import { error } from "console";
import { router , publicProcedure} from "../Trpc/trpc"
import { getAllTripsDal , createNewTripDal, getTripByIdDal, deleteTripByIdDal, editTripByIdDal, getTripByCategoryNameDal } from '../resource/Trips/DalTrips';
import { z } from "zod"
import { createTripsRedis } from "../Redis/DalRedis";
import { createTripService, deleteByIdService, editByIdService } from "../resource/Trips/service";
// import { getAllTripsRedis } from "../Redis/DalRedis";


export const appRouter = router({
  // getAllTrips: publicProcedure.query(async () => {
  //     const dbPromise = getAllTripsDal().then((data) => ({ source: 'db', data }));
  //     const redisPromise = getAllTripsRedis().then((data) => ({ source: 'redis', data }));

  //     try {
  //       const data = await Promise.any([dbPromise, redisPromise])
  //       console.log("aaaaaaaa", data)
  //         return await Promise.any([dbPromise, redisPromise]);
          
  //     } catch (error) {
  //         console.error('Both Redis and DB queries failed:', error);
  //         throw error;
  //     }
  // }),
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
    })
    
    
    
})