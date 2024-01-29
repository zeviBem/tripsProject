// import { trpc } from '../../trpcClaient/trpcClaient';
// import { useAtom, useSetAtom } from 'jotai';
// import { tripDataAtom, loadingAtom } from './Atoms/Atoms';
// import { useEffect } from 'react';

// const useGetAllTrips = () => {
//   const [dataAllTrips, setDataAllTrips] = useAtom(tripDataAtom);
//   const setIsLoading = useSetAtom(loadingAtom);

//   const getAllTripsGlobal = async () => {
//     try {
//       setIsLoading(true);
//       const res = (await trpc.getAllTrips.query());
//       setDataAllTrips(res);

//     } catch (error) {
//       console.error('Error calling getAllTrips query:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     console.log({dataAllTrips});
//   })

//   return { dataAllTrips, getAllTripsGlobal };
// };

// export default useGetAllTrips;


import { trpc } from '../../trpcClaient/trpcClaient';
import { useAtom, useSetAtom } from 'jotai';
import { tripDataAtom, loadingAtom } from '../Jotai/Atoms/Atoms';
import { useEffect, useState } from 'react';
import { TripInterFace } from 'front-trips/src/interfaces/interface';
import GetAllTrips from './CreateTripCard';

const GetAllTripsProps = () => {
  const [allTrips, setAllTrips] = useState<TripInterFace[]>([]);
  const setIsLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    const getAll = async () => {
      try {
        setIsLoading(true);
        const res = await trpc.getAllTrips.query();
        setAllTrips(res);
      } catch (error) {
        console.error('Error calling getAllTrips query:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function
    getAll();
  }, []); // Added an empty dependency array to run the effect only once

  return (
<div
 className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10 min-h-screen"
 >
{allTrips.map((trip) => (
        <GetAllTrips
          key={trip.id} 
          id={trip.id}
          title={trip.title}
          city={trip.city}
          land={trip.land}
          street={trip.street}
          coordinatesx={trip.coordinatesx}
          coordinatesy={trip.coordinatesy}
          imageurl={trip.imageurl}
          imagealt={trip.imagealt}
          description={trip.description}
          price={trip.price}
          activitytime={trip.activitytime}
          category={trip.category}
        />
      ))}
    </div>
  );
};

export default GetAllTripsProps;
