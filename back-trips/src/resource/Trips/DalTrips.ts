import { Trips } from "../../postgrasQL/ModelTrips";
import { TripInterFaceCreate } from "../interfaces/tripInterFace";

export const getAllTripsDal = async () => {
    const getAllData = (await Trips.findAll()).map((trip) => {
        return trip.dataValues;
    })
    return getAllData;
};

export const getTripByIdDal = async (id: string) => {
      const getById = await Trips.findOne({
          where: { id: id },
      });
      return getById.dataValues;
};

export const createNewTripDal = async (newTrip: TripInterFaceCreate) => {
    const createTrip = await Trips.create({ ...newTrip });
    return createTrip.dataValues;
};

  export const deleteTripByIdDal = async (id: number) => {
      const deleteTrip = await Trips.destroy({
         where: { id: id } 
        });
      return ( "deleted senseful");
  };

export const editTripByIdDal = async(id: string, updateData: {}) => {
    const updatedTrip = await Trips.update(updateData, {
      where: {id: id}
    })
    return updateData;
}

export const getTripByCategoryNameDal = async(categoryName: string) => {
    const getByCategory = (await Trips.findAll({
      where: { category: categoryName },
    })).map((trip) => { return trip.dataValues});
    return getByCategory;
}
  
  

