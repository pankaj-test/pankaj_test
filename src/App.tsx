import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UniversityListingPage from "./components/UniversityListingPage/UniversitiListing";
import UniversityDetailsPage from "./components/UniversityDetailsPage/UniversityDetailsPage";
import  { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UniversityListingPage />} />
          <Route path="/university/:name" element={<UniversityDetailsPage />} />
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
};

export default App;
