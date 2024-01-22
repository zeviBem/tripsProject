import { MessageInterFaceReade } from './../interfaces/tripInterFace';
import { Message } from "../../postgrasQL/ModelMassage";
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

export const createNewTripDal = async (token: string, newTrip: TripInterFaceCreate) => {
    const createTrip = await Trips.create({ ...newTrip });
    return createTrip.dataValues;
};

  export const deleteTripByIdDal = async (id: number, token: string) => {
      const deleteTrip = await Trips.destroy({
         where: { id: id } 
        });
      return {"deleted senseful": token} ;
  };

export const editTripByIdDal = async(id: string, token: string, updateData: {}) => {
    const updatedTrip = await Trips.update(updateData, {
      where: {id: id}
    })

    return {updateData, token};
}

export const getTripByCategoryNameDal = async(categoryName: string) => {
    const getByCategory = (await Trips.findAll({
      where: { category: categoryName },
    })).map((trip) => { return trip.dataValues});
    return getByCategory;
}

export const getTripByCityDal = async(city: string) => {
  const getByCity = (await Trips.findAll({
    where: { city: city },
  })).map((trip) => { return trip.dataValues});
  return getByCity;
}

export const getMessageByTripIdDal = async(tripId: number) => {
  const getByTripId = (await Message.findAll({
    where: {trip_id: tripId},
  })).map((m) => { return m.dataValues});
  return getByTripId
}


export const createNewMessageDal = async (newMessage: MessageInterFaceReade) => {
  const createMessage = await Message.create({...newMessage});
  return createMessage.dataValues;
}
  
  


