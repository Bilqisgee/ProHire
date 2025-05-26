// eslint-disable-next-line no-unused-vars 
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Message from '@/pages/common/Message';
import Profile from '@/pages/user/Profile';
import AuthLayout from '@/components/common/AuthLayout';
import LogIn from '@/pages/authen/LogIn';
import SignUp from '@/pages/authen/SignUp';
import CheckAuth from '@/components/common/Check-auth';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, connectSocket} from '@/store/auth-slice/index.js';
import Unauth from '@/pages/unauth-page/index';
import NotFound from '@/pages/not-found/index';
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminLayout from '@/components/admin/layout';
import UserLayout from '@/components/user/layout';
import Service from '@/pages/user/Service';
import Homepage from '@/pages/common/Homepage';
import Navv from '@/components/common/Navv';
import Home from '@/pages/user/Home';
import ServiceLayout from '@/components/user/ServiceLayout';
import AdminProfileView from '@/pages/user/AdminProfileView';
import Loading from './components/common/Loading';


function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()).then(() => {
      if (isAuthenticated) {
        dispatch(connectSocket());
      }
    });
  }, [dispatch, isAuthenticated]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      <Routes>
        {/* Public Home Page (Accessible to Everyone) */}
        <Route
          path="/"
          element={
            <>
              <Navv />
              <Homepage />
            </>
          }
        />

        {/* Auth Routes (Login and Signup) */}
        <Route path="/authen" element={<AuthLayout />}>
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
          {/*Admin and User*/} 
       <Route path="messages" element={  <CheckAuth isAuthenticated={isAuthenticated} user={user}>
       <Message />
            </CheckAuth>
       } />
        {/* ADMIN Routes (Protected) */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="profile-admin" element={<AdminProfile />} />
        </Route>

        {/* USER Routes (Protected except Home) */}
        <Route
          path="/user"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="service" element={<ServiceLayout />} >
          <Route index element={<Service />} />
          <Route path="admin-view/:id" element={<AdminProfileView />} />
                    </Route>
        </Route>

        {/* Fallback Routes */}
        <Route path="/unauth-page" element={<Unauth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
