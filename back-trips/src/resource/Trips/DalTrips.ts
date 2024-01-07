import { Trips } from "../../postgrasQL/ModelTrips";
import { TripInterFaceReade } from "../interfaces/tripInterFace";

export const getAllTripsDal = async () => {
  try {
    const getAllData = await Trips.findAll({raw: true})
    return getAllData; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTripByIdDal = async (id: string) => {
  try {
      console.log('Received ID:', id);
      const getById = await Trips.findOne({
          where: { id: id },
          raw: true,
      });
      console.log('Result from Database:', getById);
      return getById;
  } catch (error) {
      console.error('Error in getTripByIdDal:', error);
      throw error;
  }
};


export const createNewTripDal = async (newTrip: TripInterFaceReade) => {
  try {
    const createTrip = await Trips.create({ ...newTrip });
    console.log("Trips added successfully!");
    return createTrip.dataValues;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  export const deleteTripByIdDal = async (id: number) => {
    try {
      const deleteTrip = await Trips.destroy({
         where: { id: id } 
        });
      console.log("deleted senseful", deleteTrip);
      return "deleted senseful"
    }catch (error) {
      console.error("error to delete this trip", error);
      throw error;
    }
  };

export const editTripByIdDal = async(id: string, updateData: {}) => {
  try {
    const updatedTrip = await Trips.update(updateData, {
      where: {id: id}
    })
    console.log("Updated trip:", updatedTrip)
    return updateData;
  } catch(error) {
    console.error("error to edit this trip", error);
    throw error;
  }
}

export const getTripByCategoryNameDal = async(categoryName: string) => {
  try {
    const getByCategory = await Trips.findAll({
      where: { category: categoryName },
      raw: true,
    });
    console.log('Result from Database:', getByCategory);
    return getByCategory;
  }catch (error) {
    console.error("error to get trip by category", error);
    throw error;
  }
}
  
  

