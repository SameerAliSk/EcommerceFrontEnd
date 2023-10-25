/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cookies from 'js-cookie';
import AuthenticatedRoutes from './Components/AuthenticatedRoutes';
import NoResultsFound from './Components/NoResultsFound';
import NewFeature, { OrderPlaced } from './Pages/NewFeature';
import SellersForm from './Components/SellersForm';
// import Cart from './Pages/Cart';
// import Profile from './Pages/Profile';

const Home = lazy(() => import('./Pages/Home'));
const Mobiles = lazy(() => import('./Pages/Mobiles'));
const EmptyPage = lazy(() => import('./Pages/EmptyPage'));
const Cart = lazy(() => import('./Pages/Cart'));
const ProductPage = lazy(() => import('./Pages/ProductPage'));
const Profile = lazy(() => import('./Pages/Profile'));
const Account = lazy(() => import('./Pages/Account'));
const Compare = lazy(() => import('./Pages/Compare'));
const CheckOut = lazy(() => import('./Pages/CheckOut'));
const FilteredMobiles = lazy(() => import('./Pages/Mobiles/FilteredMobiles'));

function App() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mobiles">
                    <Route path="" element={<Mobiles />} />
                    <Route path="filter" element={<FilteredMobiles />} />
                </Route>
                <Route path="/search" element={<FilteredMobiles />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/account/login" element={<Account />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/sellers/home" element={<SellersForm />} />
                <Route
                    path="/checkout"
                    element={
                        <AuthenticatedRoutes>
                            <CheckOut />
                        </AuthenticatedRoutes>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <AuthenticatedRoutes>
                            <Profile />
                        </AuthenticatedRoutes>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <AuthenticatedRoutes>
                            <Cart />
                        </AuthenticatedRoutes>
                    }
                />
                <Route path="/orderplaced" element={<OrderPlaced />} />
                <Route path="*" element={<NewFeature />} />
            </Routes>
        </Suspense>
    );
}

export default App;
