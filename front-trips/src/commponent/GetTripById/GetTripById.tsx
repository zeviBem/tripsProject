import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetTripById from '../Jotai/getTripByIdGlobal';
import { trpc } from '../../trpcClaient/trpcClaient';
import { MessageInterFaceReade } from 'back-trips/src/resource/interfaces/tripInterFace';
import angleDown from '../../images/angleDown.png';
import angleUp from '../../images/angleUp.png';

const ById: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [opinion, setOpinion] = useState(false);
  const [opinionData, setOpinionData] = useState<MessageInterFaceReade[]>([]);
  const { dataById, getTripByIdGlobal } = useGetTripById();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      getTripByIdGlobal(params.id);
    }
  }, [params.id]);

  const handleClick = () => {
    navigate(`/map/${params.id}`);
  };

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
  console.log("sub", opinionData);

  const getOpinion = async () => {
    try {
      const res = await trpc.getMessageByTripId.query(Number(params.id));
      setOpinionData(res || []);
      
    } catch (error) {
      console.error('Error calling get Message By id query:', error);
    }
  };

  useEffect(() => {
    subscribeToMessages();
    getOpinion();
  }, [])
  

  return (
    <div>
      {dataById && (
        <div className="mx-auto h-screen flex items-center justify-center px-8 relative">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-50 filter blur-md z-10"
            style={{
              backgroundImage: `url(${dataById?.imageurl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5 relative z-20">
            <img
              src={dataById.imageurl}
              alt={dataById.imagealt}
              className="w-full h-64 bg-top bg-cover rounded-t"
            />
            <div className="flex flex-col w-full md:flex-row">
              <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                <div className="md:text-3xl">activity Time</div>
                <div className="md:text-xl">{dataById.activitytime}</div>
              </div>
              <div className="p-4 font-normal text-gray-800 md:w-3/4">
                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">
                  {dataById.title}
                </h1>
                <p className="leading-normal">{dataById.description}</p>
                <div className="md:text-3xl">Price: {dataById.price}</div>
                <div className="w-1/2">Category: {dataById.category}</div>
                <div className="flex flex-row items-center mt-4 text-gray-700">
                  <div className="w-1/2">
                    Location: {dataById.land}, {dataById.city},{' '}
                    {dataById.street}.
                  </div>
                  <div className="w-1/2 flex justify-end" onClick={handleClick}>
                    <img
                      src="https://3.bp.blogspot.com/-UJ6C88eMABM/V6q9qzqoReI/AAAAAAAAUgE/JlHU2F-QevsTCWFhBzbhYRG_wsJbuDXYwCLcB/s1600/%25D7%259C%25D7%2595%25D7%25A0%25D7%2593%25D7%2595%25D7%259F.gif"
                      alt={dataById.imagealt}
                      className="w-12 hover:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-2 flex justify-between">
              <div>
                <Link to={`/editTripById/${dataById.id}`}>
                  <svg
                    className="h-12 w-10 text-blue-500 hover:text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </Link>
              </div>

              <div
                onClick={() => {
                  setOpinion((prevOpinion) => !prevOpinion);
                  if (opinion) getOpinion();
                }}
                className='bg-gray-200 w-[400px]'
              >
                {opinion && (
                  <div className="mt-32">
                    {opinionData.map((person, index) => (
                      <div key={index}>
                        <div className="flex items-center space-x-2 mb-5">
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
                )}
                {opinion ? (
                  <>
                    <img src={angleUp} className="w-8 mx-auto" 
                    />
                  </>
                ) : (
                  <>
                    <img src={angleDown} className="w-8 mx-auto" />
                  </>
                )}{' '}
              </div>

              <div>
                <span onClick={() => navigate(`/dialog/${params.id}`)}>
                  add opinion
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ById;



