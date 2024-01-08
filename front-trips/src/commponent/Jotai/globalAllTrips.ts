import { trpc } from '../../trpcClaient/trpcClaient';
import { useAtom, useSetAtom } from 'jotai';
import { tripDataAtom, loadingAtom } from './Atoms/Atoms';

const useGetAllTrips = () => {
  const [dataAllTrips, setDataAllTrips] = useAtom(tripDataAtom);
  const setIsLoading = useSetAtom(loadingAtom);

  const getAllTripsGlobal = async () => {
    try {
      setIsLoading(true);
      const res = (await trpc.getAllTrips.query());
      setDataAllTrips(res);
    } catch (error) {
      console.error('Error calling getAllTrips query:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { dataAllTrips, getAllTripsGlobal };
};

export default useGetAllTrips;