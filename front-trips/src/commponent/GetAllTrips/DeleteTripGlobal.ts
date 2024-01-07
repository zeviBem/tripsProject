import { trpc } from '../../trpcClaient/trpcClaient';
import { useSetAtom } from 'jotai';
import { tripDataAtom } from '../Atoms/Atoms';

const useDeleteTrip = () => {
    const setDataAllTrips = useSetAtom(tripDataAtom);

    const deleteTripGlobal = async(id: number) => {
        try {
            const deleteTrip = (await trpc.deleteById.mutate(id)) 
            console.log("delete trip successful!", deleteTrip);
            setDataAllTrips((newData) => newData.filter((trip) => trip.id !== id));

        }catch(err) {
            console.error('Error deleting trip:', err);
        }
    }
    return (
        { setDataAllTrips, deleteTripGlobal }
    )
}
export default useDeleteTrip