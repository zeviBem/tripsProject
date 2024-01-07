// import { trpc } from '../../trpcClaient/trpcClaient';
// import { TripInterFace } from '../../interfaces/interface';
// import { useAtom, useSetAtom } from 'jotai';
// import { tripDataAtom, loadingAtom, tripByCategoryAtom} from '../Atoms/Atoms';

// const useGetAllTripsByCategory = () => {
//   const [dataAllTripsByCategory, setAllTripsByCategory] = useAtom(tripDataAtom);
//   const setIsLoading = useSetAtom(loadingAtom);

//   const getAllTripsByCategoryGlobal = async () => {
//     try {
//       setIsLoading(true);
//       const res = (await trpc.getTripByCategoryName.query(tripByCategoryAtom)) as TripInterFace[];
//       setAllTripsByCategory(res);
//     } catch (error) {
//       console.error('Error calling getAllCars query:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { dataAllTripsByCategory, getAllTripsByCategoryGlobal };
// };

// export default useGetAllTripsByCategory;