import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider
import './index.css';
import Dashbord from './Dashbord';
import AboutUs from './AboutUs';
import AddAssingment from './AddAssingment';
import AddMarks from './AddMarks';
import AddTest from './AddTest';
import Assingment from './Assingment';
import Course from './Course';
import Students from './Students';
import CourseDetails from './CourseDetails';
import Events from './Events';
import Login from './LogIn';
import LogOut from './LogOut';
import Marks from './Marks';
import Registor from './Registor';
import Profile from './Profile';
import TestSchedule from './TestSchedule';
import ChangePsw from './ChangePsw';
import ForgotPsw from './ForgotPsw';
import PageNotFound from './PageNotFound';
function App() {
    return (
      <CookiesProvider> {/* Wrap everything inside CookiesProvider */}
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashbord />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/register" element={<Registor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assignment" element={<Assingment />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/students" element={<Students />} />
            <Route path="/course_details/:id" element={<CourseDetails />} />
            <Route path="/events" element={<Events />} />
            <Route path="/mark/:id" element={<Marks />} />
            <Route path="/test" element={<TestSchedule />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/forgot_password" element={<ForgotPsw />} />
            <Route path="/change_password" element={<ChangePsw />} />
            <Route path="/Add_Assingment" element={<AddAssingment />} />
            <Route path="/Add_Marks" element={<AddMarks />} />
            <Route path="/Add_Test" element={<AddTest />} />
            
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    );
  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



