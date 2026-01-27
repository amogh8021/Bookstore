import { useState } from 'react'

import './App.css'
import NavBar from './Components/NavBar'
import HeroSection from './Components/HeroSection'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Components/MainPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Pages/PrivateRoute';
import CartPage from './Pages/Cartpage';
import Wishlist from './Pages/Wishlist';
import WishlistCard from './Components/WishlistCard';
import ShopPage from './Pages/ShopPage';
import Admin from './Pages/Admin';
import AdminNavBar from './Pages/AdminNavbar';
import TotalOrders from './Pages/TotalOrders';
import NewOrders from './Pages/NewOrders';
import PendingOrders from './Pages/PendingOrders';
import { CanceledError } from 'axios';
import CompletedOrders from './Pages/CompletedOrders';
import CancelledOrders from './Pages/CancelledOrders';
import ListedBooks from './Pages/ListedBooks';
import Categories from './Pages/Categories';
import UsersList from './Pages/UsersList';
import ForgotPassword from './Components/ForgotPassword';
import ListedAuthor from './Pages/ListedAuthor';
import ProfilePage from './Pages/ProfilePage';
import AboutPage from './Pages/AboutPage';
import OrderPlacedPage from './Pages/OrderPlacedPage';
import Offers from './Components/Offers';
import AdminOffers from './Pages/AdminOffers';
import MyOrders from './Pages/MyOrders';
import FAQ from './Pages/FAQ';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsConditions from './Pages/TermsConditions';
import ShippingReturns from './Pages/ShippingReturns';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-background min-h-screen'>
        <Router>

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='home' element={<PrivateRoute>
              <MainPage />
            </PrivateRoute>} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/wishlistcard' element={<WishlistCard />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/nav' element={<AdminNavBar />} />
            <Route path="/admin/orders/total" element={<TotalOrders />} />
            <Route path="/admin/orders/new" element={<NewOrders />} />
            <Route path="/admin/orders/pending" element={<PendingOrders />} />
            <Route path="/admin/orders/cancelled" element={<CancelledOrders />} />
            <Route path="/admin/orders/completed" element={<CompletedOrders />} />
            <Route path="/admin/books" element={<ListedBooks />} />
            <Route path="/admin/genres" element={<Categories />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/authors" element={<ListedAuthor />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin/offers" element={<AdminOffers />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order/:orderId" element={<OrderPlacedPage />} />


            <Route path="/admin/offers" element={<AdminOffers />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order/:orderId" element={<OrderPlacedPage />} />

            {/* Support Pages */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/shipping" element={<ShippingReturns />} />
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App
