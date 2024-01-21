import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetTripById from "../Jotai/getTripByIdGlobal";
import MapByTrip from '../Maps/mapByTrip';


const ById: React.FC = () => {

  const params = useParams<{ id: string }>();
  const { dataById, getTripByIdGlobal } = useGetTripById();
  const navigate = useNavigate();


  useEffect(() => {
    if (params.id) {
    getTripByIdGlobal(params.id)
    }
  }, [params.id])

  // const handleClick = () => {
  //   return (
  //     <div>
  //       {dataById && (
  //     <MapByTrip id={dataById.id} x={+dataById.coordinatesx} y={+dataById.coordinatesy}/>
  //     )}
  //     </div>
  //   )

  // }
  const handleClick = () => {
    navigate(`/map/${params.id}`);
  };
  return (
    <div>
      
       {dataById && (
        <div className="mx-auto h-screen flex items-center justify-center px-8 relative">
           <div className="absolute top-0 left-0 w-full h-full opacity-50 filter blur-md z-10" style={{ backgroundImage: `url(${dataById?.imageurl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5 relative z-20">
            <img src={dataById.imageurl} alt={dataById.imagealt} className="w-full h-64 bg-top bg-cover rounded-t" />
              <div className="flex flex-col w-full md:flex-row">
                  <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                      <div className="md:text-3xl">activity Time</div>
                      <div className="md:text-xl">{dataById.activitytime}</div>
                  </div>
                  <div className="p-4 font-normal text-gray-800 md:w-3/4">
                      <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{dataById.title}</h1>
                      <p className="leading-normal">{dataById.description}</p>
                      <div className="md:text-3xl">Price: {dataById.price}</div>
                      <div className="w-1/2">Category: {dataById.category}</div>
                      <div className="flex flex-row items-center mt-4 text-gray-700">
                          <div className="w-1/2">
                              Location: {dataById.land}, {dataById.city}, {dataById.street}.
                          </div>
                          <div className="w-1/2 flex justify-end" onClick={handleClick}>
                              <img src="https://3.bp.blogspot.com/-UJ6C88eMABM/V6q9qzqoReI/AAAAAAAAUgE/JlHU2F-QevsTCWFhBzbhYRG_wsJbuDXYwCLcB/s1600/%25D7%259C%25D7%2595%25D7%25A0%25D7%2593%25D7%2595%25D7%259F.gif" alt={dataById.imagealt} className="w-12" />
                          </div>
                      </div>
                  </div>
              </div>
              <Link  to={`/editTripById/${dataById.id}`} >
                <svg className="h-12 w-10 text-blue-500 hover:text-blue-700"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
            </Link>
          </div>
          {/* <MapByTrip id={dataById.id} x={+dataById.coordinatesx} y={+dataById.coordinatesy} /> */}
          </div>
        )}
    </div>
  );
};

export default ById;


