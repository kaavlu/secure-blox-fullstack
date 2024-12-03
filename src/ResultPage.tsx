import React from 'react';
import data from './json-test-inputs/example1.json';
import './ResultPage.css'
import Carousel from './components/carousel';

const ResultPage: React.FC = () => {

  return (
      <div style={{width: "100vw", height: "100vh", position: "absolute", justifyContent: "center", top: 0, textAlign: "center"}}>
        <h1>
          Extracted Text on File: {data.filename}
        </h1>
        <div className='card-grid'>
          <Carousel questions={data.questions} />
        </div>
        
      </div>
  );
};

export default ResultPage;
