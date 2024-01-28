import ById from '../commponent/GetTripById/GetTripById';
import GetAllTrips from '../commponent/GetAllTrips/CreateTripCard';
import '../styles.css';
import { Route, Routes } from 'react-router-dom';
import AddNewTrip from '../commponent/createNewTrip/createNewTrip';
import Header from '../commponent/Header/header';
import Footer from '../commponent/Footer/footer';
import HomePage from '../commponent/HomePage/HomePage';
import EditTripById from '../commponent/EditTripById/editTripById';
import GetByCategory from '../commponent/GetByCategory/GetByCategory';
import LogIn from '../commponent/Login/login';
import Register from '../commponent/Register/register';
import GetAllUsers from '../Graphiql/getAllUsers/getAllusers';
import Map from '../commponent/Maps/map';
import MapByTrip from '../commponent/Maps/mapByTrip';
import Test from '../commponent/Dialog/test';
import Father from '../commponent/stete/localState/father';
import AllTrips from '../commponent/GetAllTrips/GetAllTrips';
export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/getAllTrips" element={<AllTrips />} />
        <Route path="/getById/:id" element={<ById />} />
        <Route path="/createNewTrip" element={<AddNewTrip />} />
        <Route path="/editTripById/:id" element={<EditTripById />} />
        <Route
          path="/getByCategory/:categoryName"
          element={<GetByCategory />}
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allUsers" element={<GetAllUsers />} />
        <Route path="/showMap" element={<Map />} />
        <Route path="/map/:id" element={<MapByTrip />} />
        <Route path="/dialog/:id" element={<Test />} />
        <Route path="/localState" element={<Father />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
