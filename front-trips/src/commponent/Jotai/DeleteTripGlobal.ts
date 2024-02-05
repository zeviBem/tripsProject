import { trpc } from '../../trpcClaient/trpcClaient';
import { useSetAtom } from 'jotai';
import { tripDataAtom } from './Atoms/Atoms';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';



const useDeleteTrip = () => {
    const setDataAllTrips = useSetAtom(tripDataAtom);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false)
    const deleteTripGlobal = async(id: number, token: string) => {
        const tokenStorage = localStorage.getItem('tokenKey');
        if (tokenStorage) {
            try {
                const deleteTrip = (await trpc.deleteById.mutate({id, token})) 
                console.log("delete trip successful!", deleteTrip);
                setDataAllTrips((newData) => newData.filter((trip) => trip.id !== id));
                setSuccess(true)
            }catch(err) {
                console.error('Error deleting trip:', err);
                setSuccess(false)

            }
        }
        else {
            alert("You need to sign in to create a new trip!")
            navigate('/login')
        }
    }
    return (
        { setDataAllTrips, deleteTripGlobal, success }
    )
}
export default useDeleteTrip