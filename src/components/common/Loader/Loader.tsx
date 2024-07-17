import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
      </div>
    </div>
  );
};

export default Loader;
