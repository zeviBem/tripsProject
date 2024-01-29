import { trpc } from '../../trpcClaient/trpcClaient';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

interface DialogProps {
  model: boolean;
  setModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dialog = (props: DialogProps) => {
  const params = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMessage, setNewMessage] = useState({
    trip_id: Number(params.id),
    name: '',
    massage: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMessage((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubMit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('log', newMessage);

      setIsSubmitting(true);
      const res = await trpc.createNewMessage.mutate({
        trip_id: newMessage.trip_id,
        name: newMessage.name,
        massage: newMessage.massage,
      });
      console.log('sucsses:', res, newMessage);

      return res;
    } catch (error) {
      console.error('error create new message', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {props.model && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md text-black">
          <form className="w-full max-w-lg" onSubmit={handleSubMit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="name"
                  type="text"
                  value={newMessage.name}
                  onChange={handleInputChange}
                />
                <p className="text-gray-600 text-xs italic">
                  Some tips - as long as needed
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Message
                </label>
                <textarea
                  className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                  id="message"
                  name="massage"
                  value={newMessage.massage}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={() => setTimeout(() => props.setModel(false), 3000)}
              >
                Send
              </button>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => props.setModel(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dialog;
