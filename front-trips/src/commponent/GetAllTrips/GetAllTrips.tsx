import { trpc } from '../../trpcClaient/trpcClaient';
import { useEffect, useState } from 'react';
import { TripInterFace } from 'front-trips/src/interfaces/interface';
import CreateTripCard from './CreateTripCard';
import { useQuery } from 'react-query';

const AllTrips = () => {
  const [allTrips, setAllTrips] = useState<TripInterFace[]>([]);

  const getAll = async () => {
    const res = await trpc.getAllTrips.query();
    return res;
  };

  const { data, error, isLoading } = useQuery('getAllTrips', getAll);

  useEffect(() => {
    if (data) {
      setAllTrips(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  return (
    <div className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10 min-h-screen">
      {allTrips.map((trip) => (
        <CreateTripCard
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

export default AllTrips;
