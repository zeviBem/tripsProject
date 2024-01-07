import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { loadingAtom } from "../Jotai/Atoms/Atoms";
import useGetAllTrips from "../Jotai/globalAllTrips";
import useDeleteTrip from "../Jotai/DeleteTripGlobal";

const GetAllTrips: React.FC = () => {
  const [loading] = useAtom(loadingAtom)
  const {dataAllTrips, getAllTripsGlobal} = useGetAllTrips()
  const { deleteTripGlobal } = useDeleteTrip() 

  useEffect(() => {
    getAllTripsGlobal()
  }, []); 

    const handelPreventDeflate = (event: React.MouseEvent) => {
      event.preventDefault();
    }

return (
  <div className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10 min-h-screen bg-red">
    {loading ? (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    ) : (
        dataAllTrips.map((item) => (
    <Link to={`/getById/${item.id}`} key={item.id}>
      <div className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden" key={item.id}>
        <img className="h-56 lg:h-60 w-full object-cover" src={item.imageurl} alt={item.imagealt} />
        <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600 dark:text-white">{item.title}</p>
       
      <div className="flex aline-items-center justify-contact-center">
          <svg xmlns="http://www.w3.org/2000/svg"   className="h-10 w-8 mr-2 text-red-600 hover:text-red-700"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(event) => { handelPreventDeflate(event);  deleteTripGlobal(item.id) }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	        </svg>
        <Link  to={`/editTripById/${item.id}`} >
          <svg className="h-10 w-8 text-blue-500 hover:text-blue-700"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </Link>
      </div>
      </div>
    </Link>
  )))}
</div>
);
};

export default GetAllTrips;

