import { trpc } from '../../trpcClaient/trpcClaient';
import { useAtom, useSetAtom } from 'jotai';
import { loadingAtom, tripDataAtom } from './Atoms/Atoms';

const useGetTripByCity = () => {
    const setIsLoading = useSetAtom(loadingAtom);
    const [dataByCity, setDataByCity] = useAtom(tripDataAtom)

    const getTripByCityGlobal = async (city: string) => { 
        try {
            setIsLoading(true);
            const res = await trpc.getTripByCity.query(city)
            setDataByCity(res)
        } catch(error) { 
            console.error('Error calling get Trip By city query:', error)
        }finally {
            setIsLoading(false);
        }
    }
    return { dataByCity, getTripByCityGlobal, loadingAtom };
}

export default useGetTripByCity