import { trpc } from '../../trpcClaient/trpcClaient';
import { useAtom, useSetAtom } from 'jotai';
import { loadingAtom, tripBiIdDataAtom } from './Atoms/Atoms';

const useGetTripById = () => {
    const setIsLoading = useSetAtom(loadingAtom);
    const [dataById, setDataById] = useAtom(tripBiIdDataAtom)

    const getTripByIdGlobal = async (id: string) => { 
        try {
            setIsLoading(true);
            const res = await trpc.getTripById.query(id)
            setDataById(res)
        } catch(error) {
            console.error('Error calling getTripById query:', error)
        }finally {
            setIsLoading(false);
        }
    }
    return { dataById, setDataById, getTripByIdGlobal };
}

export default useGetTripById

// import { trpc } from '../../trpcClaient/trpcClaient';
// import {  useSetAtom } from 'jotai';
// import { loadingAtom, tripBiIdDataAtom } from './Atoms/Atoms';

//     const setIsLoading = useSetAtom(loadingAtom);
//     const  setDataById = useSetAtom(tripBiIdDataAtom)

//     const getTripByIdGlobal = async (id: string) => { 
//         try {
//             setIsLoading(true);
//             const res = await trpc.getTripById.query(id)
//             setDataById(res)
//         } catch(error) {
//             console.error('Error calling getTripById query:', error)
//         }finally {
//             setIsLoading(false);
//         }
//         return { setDataById, getTripByIdGlobal };
//     }
  

// export default useGetTripById