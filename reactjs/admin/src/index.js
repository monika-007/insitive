import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider
import './index.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Signout from './Signout';
import Student from "./Student";
import Welcome from './Welcome';
import Assignment from './Assignment';
import Course from './Course';
import Feedback from "./Feedback";
import Faculties from './Faculties';
import Mark from './Mark';
import Test from './Test';
import ForgotPassword from './ForgotPassword';
import PageNotFound from './PageNotFound';
import Events from './events';
import About from './About';
import ChangePassword from './ChangePassword';
import AddAssignment from './AddAssignment';
import AddCourse from './AddCourse';
import AddMarks from './AddMarks';
import AddTest from './AddTest';
import EditAssignment from './EditAssignment';
import EditMarks from './EditMarks';
import EditTest from './EditTest';
import EditCourse from './EditCourse';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';

function App() {
  return (
    <CookiesProvider> {/* Wrap everything inside CookiesProvider */}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/student" element={<Student />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/course" element={<Course />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/events" element={<Events />} />
          <Route path="/mark" element={<Mark />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/addassignment" element={<AddAssignment />} />
          <Route path="/addmarks" element={<AddMarks />} />
          <Route path="/addtest" element={<AddTest />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/event/add" element={<AddEvent />} />
          <Route path="/editassignment/:id" element={<EditAssignment />} />
          <Route path="/editmark/:id" element={<EditMarks />} />
          <Route path="/edittest/:id" element={<EditTest />} />
          <Route path="/editcourse/:id" element={<EditCourse />} />
          <Route path="/event/edit/:id" element={<EditEvent />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
