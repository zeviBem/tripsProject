import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../../images/userIcon.png';
import travel from '../../images/travel.png'

export default function Header() {
  const navigate = useNavigate();
  const tokenStorage = localStorage.getItem('tokenKey');
  const handel = () => {
    if (tokenStorage) {
      navigate('/createNewTrip');
    } else {
      alert('You need to sign in to create a new trip!');
      navigate('/login');
    }
  };

  const circle = () => {
    if (tokenStorage) {
      return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
    }

    return null; // אם אין טוקן, החזר null
  };

  const handelSingOut = () => {
    localStorage.removeItem('tokenKey');
    alert('are you shore you want sing out?');
    navigate('/');
  };

  return (
    <div className="bg-sky-50">
      <div className="border py-3 px-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={travel} className='w-8'/>
            <span className="ml-2 font-semibold text-[#252C32]">
              What a Trip
            </span>
          </div>
  
          <div className="ml-2 flex">
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-sky-100 hover:bg-sky-200">
              <span
                className="text-sm font-medium"
                onClick={() => navigate('/')}
              >
                Home
              </span>
            </div>
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-sky-100 hover:bg-sky-200 hidden md:flex">
                <span className="text-sm font-medium" onClick={handel}> 
                  Create new Trip!
                </span>
              </div>
    
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-sky-100 hover:bg-sky-200">
              <span className="text-sm font-medium" onClick={() => navigate('/getAllTrips')}>
                  All Trips!
              </span>
            </div>

            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-sky-100 hover:bg-sky-200">
              <span className="text-sm font-medium" onClick={() => navigate('/dialog')}>
                  All!
              </span>
            </div>
            
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-sky-100 hover:bg-sky-200">
              {circle()}
              <span
                className="text-sm font-medium"
                onClick={() => navigate('/login')}
              >
                <img src={userIcon} className='w-6'/>
              </span>
            </div>
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-sky-100 hover:bg-sky-200">
              <span className="text-sm font-medium" onClick={handelSingOut}>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                  />
                </svg>
              </span>
            </div>

          </div>
        </div>
  
        <div className="mt-4 flex flex-wrap items-center justify-between">
          <div className="flex gap-x-2 py-1 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => navigate('/map')}
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-green-500">Israel</span>
          </div>
  
          <div className="flex gap-x-8 bg-sky-100 ">
            {[
              'NatureTrips',
              'Picnic',
              'Attractions',
              'Parks',
              'Springs',
              'FamilyTrips',
              'CoupleTrips',
              'JeepTrips',
              'NightAttractions',
            ].map((field) => (
              <Link key={field} to={`/getByCategory/${field.toLowerCase()}`}>
                <div>
                  <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-sky-200">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}  
