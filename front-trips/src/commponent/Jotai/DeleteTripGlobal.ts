import { trpc } from '../../trpcClaient/trpcClaient';
import { useSetAtom } from 'jotai';
import { tripDataAtom } from './Atoms/Atoms';
import { useToasts } from 'react-toast-notifications';


const useDeleteTrip = () => {
    const setDataAllTrips = useSetAtom(tripDataAtom);
    const { addToast } = useToasts()

    const deleteTripGlobal = async(id: number) => {
        try {
            const deleteTrip = (await trpc.deleteById.mutate(id)) 
            console.log("delete trip successful!", deleteTrip);
            setDataAllTrips((newData) => newData.filter((trip) => trip.id !== id));
            addToast("trip Deleted successful!", {appearance: 'success'})

        }catch(err) {
            console.error('Error deleting trip:', err);
            addToast("error by deleted", {appearance: 'error'})

        }
    }
    return (
        { setDataAllTrips, deleteTripGlobal }
    )
}
export default useDeleteTrip