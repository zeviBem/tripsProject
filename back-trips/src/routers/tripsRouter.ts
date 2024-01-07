import { error } from "console";
import { router , publicProcedure} from "../Trpc/trpc"
import { getAllTripsDal , createNewTripDal, getTripByIdDal, deleteTripByIdDal, editTripByIdDal, getTripByCategoryNameDal } from '../resource/Trips/DalTrips';
import { z } from "zod"
import { TripInterFaceRead } from "../resource/interfaces/tripInterFace";


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

    createNewTrip: publicProcedure.input(z.object({
      id: z.number().optional(),
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
    })).mutation(async (opts) => {
      const {input} = opts
      try {
        const createTrip = await createNewTripDal(opts.input as TripInterFaceRead);
        return createTrip;
      } catch (err) {
        console.error('Error in creating a new trip:', err);
        throw err;
      }
    }),

    deleteById: publicProcedure.input(z.number()).mutation(async (opts) => {
      try {
        const deleted = await deleteTripByIdDal(opts.input);
        return deleted
      } catch (err) {
        console.error('Error in deletingTripById procedure:', err);
        throw err;
      }
    }),

    editTripById: publicProcedure.input(z.object({
      id: z.string(),
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
    }) ).mutation( async(opts) => {
      try {
        const { id, updateData } = opts.input;
        const editTrip = await editTripByIdDal(id, updateData);
        return editTrip;
      } catch(err) {
        console.error('Error in editTripById procedure:', err);
        throw err;
      }
    })
    
    
    
})