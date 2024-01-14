import { useEffect, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { typedTextAtom, tripByCategoryAtom } from '../Jotai/Atoms/Atoms';
import useGetTripByCategory from "../Jotai/globalGetByCategory";

const images = [
  'https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_19_i.jpg',
  'https://www.israelhayom.co.il/wp-content/uploads/2023/01/03/03/%D7%92%D7%9F-%D7%94%D7%A9%D7%9C%D7%95%D7%A9%D7%94-%D7%A6%D7%99%D7%9C%D7%95%D7%9D-%D7%9E%D7%A0%D7%95-%D7%92%D7%A8%D7%99%D7%A0%D7%A9%D7%A4%D7%9F-1024x548.jpg',
  'https://img.mako.co.il/2019/09/19/49_Places_To_See_PArt1_21_i.jpg',
  'https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_7_i.jpg',
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tripByCategory, setTripByCategory] = useAtom(tripByCategoryAtom);
  const [typedText, setTypedText] = useAtom(typedTextAtom);
  const { dataByCategory, getTripByCategoryGlobal } = useGetTripByCategory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    const text = 'Register a category!.';
    let index = 0;

    const typingInterval = setInterval(() => {
      setTypedText((prevText) => prevText + text[index]);
      index++;

      if (index === text.length - 1) {
        clearInterval(typingInterval);
      }
    }, 100, [typedText]);

    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
    };
  }, [setCurrentImageIndex, setTypedText]);

  const selectImage = images[currentImageIndex];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTripByCategory(event.target.value);
  };

  const handleSubmit = async () => {
    getTripByCategoryGlobal(tripByCategory)
  };

  return (
    <div>
      <div
        className="flex w-50  h-100 relative transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${selectImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full max-w-screen-xl h-80 opacity-50 filter blur-la z-10"></div>
        <section className="grid place-items-center bg-emerald-900 p-16 min-h-screen">
          <p className="hidden md:block animate-fade-in capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">
            {typedText}
          </p>
          <div className="flex gap-4">
            <input
              className="h-12 min-w-[12rem] rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
              type="text"
              placeholder="search a category"
              value={tripByCategory}
              onChange={handleInputChange}
            />
            <button
              className="h-12 min-w-[8rem] rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </section>
      </div>
      {dataByCategory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {dataByCategory.map((trip) => (
            <Link to={`/getById/${trip.id}`} key={trip.id}>
              <div
                className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden"
                key={trip.id}
              >
                <img
                  className="h-56 lg:h-60 w-full object-cover"
                  src={trip.imageurl}
                  alt={trip.imagealt}
                />
                <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600 dark:text-white">
                  {trip.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
