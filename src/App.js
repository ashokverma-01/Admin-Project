import "./App.scss";
// import Navbar from './Components/Header/Navbar';
// import Sidebar from './Components/Sidebar/Sidebar';
import Home from "./Pages/Home/Home";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./Pages/Userlist/UserList";
import User from "./Pages/UserPage/User";
import NewUser from "./Pages/CreateUser/NewUser";
import ProductList from "./Pages/Productlist/ProductList";
import Product from "./Pages/ProductPage/Product";
import NewProduct from "./Pages/CreatProduct/NewProduct";
import Login from "./Pages/Login";
import Protected from "./Pages/Protected";
import Layout from "./Pages/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/" element={ <Protected> {" "} <Layout />{" "} </Protected>}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<UserList />} />
          <Route exact path="/user/:userId" element={<User />} />
          <Route exact path="/newUser" element={<NewUser />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/newProduct" element={<NewProduct />} />
        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
