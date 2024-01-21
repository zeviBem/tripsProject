import { createNewTripDal } from "../resource/Trips/DalTrips";
import { TripInterFaceCreate } from "../resource/interfaces/tripInterFace";
import { client } from "./redisConnection";

export const createTripsRedis = async (token: string, newTrip: TripInterFaceCreate) => {
    const cacheKey = 'createTrip';
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    try {
        const createdTrip = await createNewTripDal(token, newTrip);
        await client.set(cacheKey, JSON.stringify(createdTrip));
        console.log("ssssss");
        return createdTrip;
    } catch (error) {
        console.error('Error creating new trip and caching in Redis:', error);
        return Promise.reject(error);
    }
}
