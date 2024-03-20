import "./App.scss";
import Home from "./Pages/Home/Home";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./Pages/Userlist/UserList";
import DriverList from "./Pages/Driverlist/DriverList";
import Driver from "./Pages/DriverPage/Driver";
import User from "./Pages/UserPage/User";
import NewUser from "./Pages/CreateUser/NewUser";
import NewDriver from "./Pages/CreateDriver/NewDriver";
import CarList from "./Pages/Carlist/CarList";
import Car from "./Pages/CarPage/Car";
import NewCar from "./Pages/CreateCar/NewCar";
import Login from "./Pages/Login";
import ChangePassword from "./Pages/ChangePassword"
import Protected from "./Pages/Protected";
import Layout from "./Pages/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/" element={<Protected> {" "} <Layout />{" "} </Protected>}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<UserList />} />
          <Route exact path="/user/:id" element={<User />} />
          <Route exact path="/newUser" element={<NewUser />} />
          <Route exact path="/cars" element={<CarList />} />
          <Route exact path="/car/:id" element={<Car />} />
          <Route exact path="/newCar" element={<NewCar />} />
          <Route exact path="/drivers" element={<DriverList />} />
          <Route exact path="/driver/:id" element={<Driver />} />
          <Route exact path="/newDriver" element={<NewDriver />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
