import { trpc } from '../../trpcClaient/trpcClaient';
import { TripInterFace } from '../../interfaces/interface';
import { useAtom, useSetAtom } from 'jotai';
import { loadingAtom, tripBiIdDataAtom } from './Atoms/Atoms';

const useGetTripById = () => {
    const setIsLoading = useSetAtom(loadingAtom);
    const [dataById, setDataById] = useAtom(tripBiIdDataAtom)

    const getTripByIdGlobal = async (id: string) => { 
        try {
            setIsLoading(true);
            const res = await trpc.getTripById.query(id) as TripInterFace
            setDataById(res)
        } catch(error) {
            console.error('Error calling getTripById query:', error)
        }finally {
            setIsLoading(false);
        }
    }
    return { dataById, getTripByIdGlobal };
}

export default useGetTripById