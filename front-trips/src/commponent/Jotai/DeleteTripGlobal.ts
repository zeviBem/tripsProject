import { trpc } from '../../trpcClaient/trpcClaient';
import { useSetAtom } from 'jotai';
import { tripDataAtom } from './Atoms/Atoms';
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";

>>>>>>> ef131c762f079e8a3124bcd6f79e297caa2f842d


const useDeleteTrip = () => {
    const setDataAllTrips = useSetAtom(tripDataAtom);
<<<<<<< HEAD

    const deleteTripGlobal = async(id: number) => {
        try {
            const deleteTrip = (await trpc.deleteById.mutate(id)) 
            console.log("delete trip successful!", deleteTrip);
            setDataAllTrips((newData) => newData.filter((trip) => trip.id !== id));

        }catch(err) {
            console.error('Error deleting trip:', err);
=======
    const navigate = useNavigate();


    const deleteTripGlobal = async(id: number, token: string) => {
        const tokenStorage = localStorage.getItem('tokenKey');
        if (tokenStorage) {
            try {
                const deleteTrip = (await trpc.deleteById.mutate({id, token})) 
                console.log("delete trip successful!", deleteTrip);
                setDataAllTrips((newData) => newData.filter((trip) => trip.id !== id));
>>>>>>> ef131c762f079e8a3124bcd6f79e297caa2f842d

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