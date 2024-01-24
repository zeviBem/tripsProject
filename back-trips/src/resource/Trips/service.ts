import { createTripsRedis } from "../../Redis/DalRedis";
import { TripInterFaceCreate } from "../interfaces/tripInterFace";
import { createNewTripDal, deleteTripByIdDal, editTripByIdDal } from "./DalTrips";
import { checkToken } from "./checkToken";


export const deleteByIdService = async (id: number, token: string) => {
    try {
        const check = checkToken(token);

        if (check) {
            const result = await deleteTripByIdDal( id, token)
        }
    } catch (error) {
        console.error('Error in editTripById procedure:', error);
        throw error;
    }
}

export const editByIdService = async (id: string, token: string, data: {}) => {
    try {
        const check = checkToken(token);

        if (check) {
            const result = await editTripByIdDal(id, token, data)
            return result
        }
    } catch (error) {
        console.error('Error in editTripById procedure:', error);
        throw error;
    }
}

export const createTripService = async (token: string, data: TripInterFaceCreate) => {
    try {
        const check = checkToken(token);

        if (check) {
            const dbPromise = createNewTripDal(token, data).then((data) => ({ source: 'db', data }));
            const redisPromise = createTripsRedis(token, data).then((data) => ({ source: 'redis', data }));
            return await Promise.any([dbPromise, redisPromise]);
            // return dbPromise
        }
    } catch (error) {
        console.error('Error in editTripById procedure:', error);
        throw error;
    }
}