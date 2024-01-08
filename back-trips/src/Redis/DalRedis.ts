import { createNewTripDal } from "../resource/Trips/DalTrips";
import { TripInterFaceCreate } from "../resource/interfaces/tripInterFace";
import { client } from "./redisConnection";

export const createTripsRedis = async (newTrip: TripInterFaceCreate) => {
    const cacheKey = 'createTrip';
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    try {
        const createdTrip = await createNewTripDal(newTrip);
        await client.set(cacheKey, JSON.stringify(createdTrip));
        return createdTrip;
    } catch (error) {
        console.error('Error creating new trip and caching in Redis:', error);
        return Promise.reject(error);
    }
}
