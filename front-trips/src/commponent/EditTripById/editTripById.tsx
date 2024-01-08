import { TripInterFace } from "front-trips/src/interfaces/interface";
import { trpc } from "../../trpcClaient/trpcClaient";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useToasts } from 'react-toast-notifications';
import useGetTripById from "../Jotai/getTripByIdGlobal";

const EditTripById = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const params = useParams<{ id: string }>();
  const { dataById, setDataById, getTripByIdGlobal } = useGetTripById();

  useEffect(() => {
    if (params.id) {
    getTripByIdGlobal(params.id)
    }
  }, [params.id])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataById((prevData: TripInterFace | null) => {
      if (!prevData) {
        const newTrip: TripInterFace = getDefaultEditTrip();
        newTrip[name] = value;
        return newTrip;
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const getDefaultEditTrip = (): TripInterFace => ({
    id: 0,
    title: "",
    city: "",
    land: "",
    street: "",
    coordinatesx: "",
    coordinatesy: "",
    imageurl: "",
    imagealt: "",
    description: "",
    price: "",
    activitytime: "",
    category: "",
  });

  const handleEditTrips = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (params.id) {
        const res = await trpc.editTripById.mutate({
          id: params.id,
          updateData: dataById || getDefaultEditTrip(),
        });
        addToast('Trip edited Successful ', { appearance: 'success' });
        setTimeout(() => {
          navigate("/getAllTrips");
        }, 3000);

        return res;
      } 
    } catch (err) {
      console.error("Error edit trip:", err);
      addToast('failed to edited trip!', { appearance: 'error' });
    }
  };

  
  
  return (
        <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${dataById?.imageurl || "https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_7_i.jpg"})`, backgroundSize: 'cover' }}
      >
        <ToastContainer />
        <section className="max-w-4xl p-6 rounded-md shadow-md bg-emerald-800 bg-opacity-80">
          <h1 className="text-xl font-bold text-black capitalize dark:text-white">Edit Trip</h1>
          <form onSubmit={handleEditTrips}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {["title", "city", "land", "street", "coordinatesx", "coordinatesy", "imageurl", "imagealt", "description", "price", "activitytime", "category"].map((field) => (
                <div key={field}>
                  <label className="text-white dark:text-gray-200" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    name={field}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={dataById?.[field] || ''}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
                        <div className="flex justify-end mt-6">
                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" type="submit">edit Trip</button>
            </div>
          </form>
        </section>
      </div>
    );
}

export default EditTripById


