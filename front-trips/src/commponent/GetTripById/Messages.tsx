import { MessageInterFaceReade } from 'back-trips/src/resource/interfaces/tripInterFace';
import { trpc } from '../../trpcClaient/trpcClaient';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const Messages = () => {
  const params = useParams<{ id: string }>();
  const [opinionData, setOpinionData] = useState<MessageInterFaceReade[]>([]);

  const fetchData = async () => {
    const res = await trpc.getMessageByTripId.query(Number(params.id));
    return res;
  };

  const subscribeToMessages = async () => {
    await trpc.onAdd.subscribe(undefined, {
      onData: (data) => {
        setOpinionData((prevMessages) => [...prevMessages, data]);
      },
      onError: (err) => {
        console.error('Subscription error:', err);
      },
    });
  };

  const { data, error, isLoading } = useQuery('getMessage', fetchData);

  useEffect(() => {
    if (data) {
      subscribeToMessages();
      setOpinionData(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-row space-x-4 ">
        <div className="w-12 h-12 rounded-full animate-spin border border-dashed border-cyan-500 border-t-transparent mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  return (
    <div className="mt-5">
      {opinionData.map((person, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2 mb-5 ml-5">
            <div className="flex flex-shrink-0 self-start cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                <p className="text-xl text-white">{person.name[0]}</p>
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
  );
};
export default Messages;
