import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from './auth/auth_contaxt';
import ProtectedRoutes from './auth/protected_routes';
import { paths } from './utils/routes';
import App from './pages/App';
import Page404 from './page_404';
import SignUp from './auth/sign_up';
import SignIn from './auth/sign_in';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path={paths.SIGNUP} element={<SignUp />} />
          <Route path={paths.SIGNIN} element={<SignIn />} />
          <Route path={paths.HOME} element={<ProtectedRoutes><App /></ProtectedRoutes>} />


          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>

  </React.StrictMode>
);

