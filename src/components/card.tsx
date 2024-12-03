import React from 'react';
import './card.css';

export interface Question {
  question: string;
  response: string;
  model_accuracy: number;
};

const QuestionCard: React.FC<Question> = ({ response, question, model_accuracy }) => {
  return (
    <div className="card">
      <h2 className="question">{question}</h2>
      <p className="response">
        Response: <strong>{response}</strong>
      </p>
      <p className="accuracy">
        Model Accuracy: <strong>{model_accuracy}</strong>
      </p>
    </div>
  );
};

export default QuestionCard;

