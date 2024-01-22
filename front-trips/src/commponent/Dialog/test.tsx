import { ChangeEvent, FormEvent, useState } from "react";
import Dialog from "./Dialog";
import { useParams } from "react-router-dom";
import { trpc } from "../../trpcClaient/trpcClaient";

// TW Elements is free under AGPL, with commercial license required htmlFor specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 
// Initialization for ES Users

export default function Test() {
  const params = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMessage, setNewMessage] = useState({
    id: Number(params.id),
    name: '',
    massege: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


    const handleSubMit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setIsSubmitting(true)
        const res = await trpc.createNewMessage.mutate({
          trip_id: newMessage.id,
          name: newMessage.name,
          massage: newMessage.massege
        })
        console.log("sucsses:" , res);
        
        return res
      } catch (error) {
        console.error('error create new message', error);
        
      } finally {
        setIsSubmitting(false)
      }
    }

      return (

<div>
<form className="w-full max-w-lg" onSubmit={handleSubMit}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="name" type="text" value={newMessage.name} onChange={handleInputChange}/>
      <p className="text-gray-600 text-xs italic">Some tips - as long as needed</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Message
      </label>
      <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message" name="massege" value={newMessage.massege} onChange={handleInputChange}></textarea>
      <p className="text-gray-600 text-xs italic">Re-size can be disabled by set by resize-none / resize-y / resize-x / resize</p>
    </div>
  </div>
  <div className="md:flex md:items-center">
    <div className="md:w-1/3">
      <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
        Send
      </button>
    </div>
    <div className="md:w-2/3"></div>
  </div>
</form>
</div>
    )
}