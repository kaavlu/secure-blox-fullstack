import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './UploadPage';
import ResultPage from './ResultPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
