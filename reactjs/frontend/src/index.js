import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider
import './index.css';
import Dashboard from './Dashboard';
import Courses from './Courses';
import Assignment from './Assignment';
import CourseDetails from './CourseDetails';
import Events from './Events';
import Feedback from './Feedback';
import Login from './Login';
import LogOut from './LogOut';
import Marks from './Marks';
import Register from './Register';
import Profile from './Profile';
import TestSchedule from './TestSchedule';
import ChangePassword from './ChangePassword';
import ForgotPassword from './ForgotPassword';
import AboutUs from './AboutUs';
import PageNotFound from './PageNotFound';
function App() {
    return (
      <CookiesProvider> {/* Wrap everything inside CookiesProvider */}
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course_details/:id" element={<CourseDetails />} />
            <Route path='/feedback/:id' element={<Feedback />} />
            <Route path="/events" element={<Events />} />
            <Route path="/mark" element={<Marks />} />
            <Route path="/test" element={<TestSchedule />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    );
  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);


