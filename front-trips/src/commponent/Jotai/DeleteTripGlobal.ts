import { trpc } from '../../trpcClaient/trpcClaient';
import { useSetAtom } from 'jotai';
import { tripDataAtom } from './Atoms/Atoms';
import { useNavigate } from "react-router-dom";



const useDeleteTrip = () => {
    const setDataAllTrips = useSetAtom(tripDataAtom);
    const navigate = useNavigate();


    const deleteTripGlobal = async(id: number) => {
        const tokenStorage = localStorage.getItem('tokenKey');
        if (tokenStorage) {
            try {
                const deleteTrip = (await trpc.deleteById.mutate(id)) 
                console.log("delete trip successful!", deleteTrip);
                setDataAllTrips((newData) => newData.filter((trip) => trip.id !== id));

            }catch(err) {
                console.error('Error deleting trip:', err);

            }
        }
        else {
            alert("You need to sign in to create a new trip!")
            navigate('/login')
        }
    }
    return (
        { setDataAllTrips, deleteTripGlobal }
    )
}
export default useDeleteTrip