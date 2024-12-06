import React from 'react';
import './card.css';
import EditQuestionModal from './modal';

export interface Question {
  question_id: string;
  question: string;
  response: string;
  answer_choices: string[];
  model_accuracy: number;
}

interface QuestionCardProps {
  question_object: Question;
  on_save: (updatedQuestion: Question) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question_object, on_save }) => {

  return (
    <div className="card">
      <h2 className="question">{question_object.question}</h2>
      <p className="response">
        Response: <strong>{question_object.response}</strong>
      </p>
      <p className="accuracy">
        Model Accuracy: <strong>{question_object.model_accuracy}</strong>
      </p>
      <EditQuestionModal question={question_object} onSave={on_save} />
    </div>
  );
};

export default QuestionCard;

