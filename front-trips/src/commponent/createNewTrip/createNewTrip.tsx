import { trpc } from '../../trpcClaient/trpcClaient';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from './image';
import { TripInterFace } from 'front-trips/src/interfaces/interface';
import Select from './Selsct';

const AddNewTrip: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newData, setNewData] = useState<TripInterFace>({
    title: '',
    city: '',
    land: '',
    street: '',
    coordinatesx: '',
    coordinatesy: '',
    imageurl: '',
    imagealt: '',
    description: '',
    price: '',
    activitytime: '',
    category: '',
  });

  const tokenStorage = localStorage.getItem('tokenKey');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Handle image upload called');
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setNewData((prevData) => ({
        ...prevData,
        imageurl: imageUrl,
      }));
    }
  };

  const handleAddTrips = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await trpc.createNewTrip.mutate({
        token: tokenStorage!,
        newData: newData,
      });
      setTimeout(() => {
        navigate('/getAllTrips');
      }, 3000);
      return res;
    } catch (err) {
      console.error('Error adding car:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_7_i.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <section className="max-w-4xl p-6 rounded-md shadow-md bg-emerald-800 bg-opacity-60">
        <h1 className="text-xl font-bold text-black capitalize dark:text-white">
          Add New Trip
        </h1>
        <form onSubmit={handleAddTrips}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {[
                'title',
                'city',
                'land',
                'street',
                'coordinatesx',
                'coordinatesy',
                'imagealt',
                'description',
                'price',
                'activitytime',
              ].map((field) => (
                <div key={field}>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor={field}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    name={field}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={newData?.[field] || ''}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            <div>
              <Select category={newData.category} handleInputChange={handleInputChange}/>
            </div>
            <div>
              <Img
                url={newData.imageurl}
                alt={newData.imagealt}
                handleImageUpload={handleImageUpload}
                />
            </div>
            </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              type="submit"
              disabled={isSubmitting} // Disable the button when submitting
              >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-red-400 border-double rounded-full animate-spin"></div>
                ) : (
                  'Add Trip'
                  )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddNewTrip;
