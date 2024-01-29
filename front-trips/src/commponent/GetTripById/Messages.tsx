// import { MessageInterFaceReade } from "back-trips/src/resource/interfaces/tripInterFace";
// import { trpc } from "../../trpcClaient/trpcClaient";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";




// const Messages = () => {
//     const params = useParams<{ id: string }>();

//     const [opinionData, setOpinionData] = useState<MessageInterFaceReade[]>([]);
//     const [loading, setLoading] = useState(false);

//     const subscribeToMessages = async () => {
//         try {
//           await trpc.onAdd.subscribe(undefined, {
//             onData: (data) => {
//               setOpinionData((prevMessages) => [...prevMessages, data]);
//             },
//             onError: (err) => {
//               console.error('Subscription error:', err);
//             },
//           });
//         } catch (err) {
//           console.error('Error subscribing to messages:', err);
//         }
//       };
//       console.log('sub',opinionData);
    
//       const getOpinion = async () => {
//         try {
//             setLoading(true);
//           const res = await trpc.getMessageByTripId.query(Number(params.id));
//           setOpinionData(res || []);
//         } catch (error) {
//           console.error('Error calling get Message By id query:', error);
//         }
//       };
    
//       useEffect(() => {
//         subscribeToMessages();
//         getOpinion();
//       }, []);

//     return (
//         <div className="mt-5">
//         {opinionData.map((person, index) => (
//           <div key={index}>
//             <div className="flex items-center space-x-2 mb-5 ml-5">
//               <div className="flex flex-shrink-0 self-start cursor-pointer">
//                 <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
//                   <p className="text-xl text-white">
//                     {person.name[0]}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="block">
//                   <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
//                     <div className="font-medium">
//                       <small>{person.name}</small>
//                     </div>
//                     <div className="text-xs">{person.massage}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}  
//         </div>     
//     )
// }
// export default Messages
import { MessageInterFaceReade } from "back-trips/src/resource/interfaces/tripInterFace";
import { trpc } from "../../trpcClaient/trpcClaient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";




const Messages = () => {
    const params = useParams<{ id: string }>();

    const [opinionData, setOpinionData] = useState<MessageInterFaceReade[]>([]);
    const [loading, setLoading] = useState(false);

    // const fetchData = async () => {
    //   const res = await trpc.getMessageByTripId.query(Number(params.id));
    //   return res
    // }

    const subscribeToMessages = async () => {
        try {
          await trpc.onAdd.subscribe(undefined, {
            onData: (data) => {
              setOpinionData((prevMessages) => [...prevMessages, data]);
            },
            onError: (err) => {
              console.error('Subscription error:', err);
            },
          });
        } catch (err) {
          console.error('Error subscribing to messages:', err);
        }
      };
      console.log('sub',opinionData);
    
      const getOpinion = async () => {
        try {
            setLoading(true);
          const res = await trpc.getMessageByTripId.query(Number(params.id));
          setOpinionData(res || []);
        } catch (error) {
          console.error('Error calling get Message By id query:', error);
        }
      };

      // const getOpinion = () => {
      //   const { data, error, isLoading } = useQuery("getMessage", fetchData);
        
      //   if (isLoading) return <div>Fetching posts...</div>;
      //   if (error) return <div>An error occurred: {error.message}</div>;

      // }
    
      useEffect(() => {
        subscribeToMessages();
        getOpinion();
      }, []);

    return (
        <div className="mt-5">
        {opinionData.map((person, index) => (
          <div key={index}>
            <div className="flex items-center space-x-2 mb-5 ml-5">
              <div className="flex flex-shrink-0 self-start cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                  <p className="text-xl text-white">
                    {person.name[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="block">
                  <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                    <div className="font-medium">
                      <small>{person.name}</small>
                    </div>
                    <div className="text-xs">{person.massage}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}  
        </div>     
    )
}
export default Messages