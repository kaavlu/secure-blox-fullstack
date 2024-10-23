import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { documentText } = location.state;

  return (
    <div>
      <h1>Extracted Text Boxes</h1>
      <pre>{documentText}</pre>
    </div>
  );
};

export default ResultPage;
