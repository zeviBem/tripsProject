// import React, { ChangeEvent, FormEvent, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAtom } from 'jotai';
// import { tripBiIdDataAtom } from '../Jotai/Atoms/Atoms';
// import EditTripForm from './editTripById';
// import EditTripImage from './Image';
// import { trpc } from '../../trpcClaient/trpcClaient';
// import { TripInterFace } from 'front-trips/src/interfaces/interface';

// const EditTripContainer: React.FC = () => {
//   const navigate = useNavigate();
//   const params = useParams<{ id: string }>();
//   const [dataById, setDataById] = useAtom(tripBiIdDataAtom);

//   const tokenStorage = localStorage.getItem('tokenKey');

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setDataById((prevData: TripInterFace | null) => {
//       if (!prevData) {
//         const newTrip: TripInterFace = getDefaultEditTrip();
//         newTrip[name] = value;
//         return newTrip;
//       }
//       return {
//         ...prevData,
//         [name]: value,
//       };
//     });
//   };

//   const getDefaultEditTrip = (): TripInterFace => ({
//     id: 0,
//     title: '',
//     city: '',
//     land: '',
//     street: '',
//     coordinatesx: '',
//     coordinatesy: '',
//     imageurl: '',
//     imagealt: '',
//     description: '',
//     price: '',
//     activitytime: '',
//     category: '',
//   });

//   const handleEditTrips = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       if (params.id) {
//         const res = await trpc.editTripById.mutate({
//           id: params.id,
//           token: tokenStorage!,
//           updateData: dataById || getDefaultEditTrip(),
//         });
//         setTimeout(() => {
//           navigate('/getAllTrips');
//         }, 3000);

//         return res;
//       }
//     } catch (err) {
//       console.error('Error edit trip:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <section className="max-w-4xl p-6 rounded-md shadow-md bg-emerald-800 bg-opacity-80">
//         <h1 className="text-xl font-bold text-black capitalize dark:text-white">
//           Edit Trip
//         </h1>
//         <EditTripImage imageurl={dataById?.imageurl} />
//         <EditTripForm
//           dataById={dataById}
//           handleInputChange={handleInputChange}
//           handleEditTrips={handleEditTrips}
//         />
//       </section>
//     </div>
//   );
// };

// export default EditTripContainer;
