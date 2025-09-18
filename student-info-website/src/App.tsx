import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentDetails from './pages/StudentDetails';
import StudentForm from './components/StudentForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Student Information System</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/student-form" element={<StudentForm onSubmit={() => {}} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;