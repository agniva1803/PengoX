import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import StoreContextProvider from './Context/StoreContext'; // Updated path with correct casing
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders'; // Updated path with correct casing
const App = () => {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <StoreContextProvider>
      <div>
        {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : null}
        <div className='app'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path ='/myorders' element={<MyOrders />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </StoreContextProvider>
  );
};

export default App;

