import ById from '../commponent/GetTripById/GetTripById';
import GetAllTrips from '../commponent/GetAllTrips/GetAllTrips';
import "../styles.css"
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

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
            path="/getAllTrips"
            element={<GetAllTrips />}
          />
        <Route
            path="/getById/:id"
              element={<ById />} />

          <Route
            path='/createNewTrip'
            element={<AddNewTrip />}
            />
          <Route
            path='/editTripById/:id'
            element={<EditTripById />}
            />
          <Route
            path='/getByCategory/:categoryName'
            element={<GetByCategory />} />
          <Route 
            path='/login'
            element={<LogIn />} />
          <Route 
            path='/register'
            element={<Register />} />
          <Route 
            path='/allUsers'
            element={<GetAllUsers />} />
          <Route 
            path='/map'
            element={<Map />} />
          <Route 
            path='/map/:id'
            element={<MapByTrip />} />
        </Routes>

      <Footer />
    </div>
  );
}

export default App;
