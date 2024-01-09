import { trpc } from '../../trpcClaient/trpcClaient';
import { TripInterFace } from '../../interfaces/interface';
import { useAtom, useSetAtom } from 'jotai';
import { loadingAtom, tripDataAtom } from './Atoms/Atoms';
import { useEffect } from 'react';

const useGetTripByCategory = () => {
    const setIsLoading = useSetAtom(loadingAtom);
    const [dataByCategory, setDataByCategory] = useAtom(tripDataAtom)

    const getTripByCategoryGlobal = async (category: string) => { 
        try {
            setIsLoading(true);
            const res = await trpc.getTripByCategoryName.query(category)
            setDataByCategory(res)
        } catch(error) {
            console.error('Error calling getTripById query:', error)
        }finally {
            setIsLoading(false);
        }
    }
    return { dataByCategory, getTripByCategoryGlobal, loadingAtom };
}

export default useGetTripByCategory