import React, { useState } from 'react';
import { Question } from './card';

import * as Dialog from '@radix-ui/react-dialog'

import './modal.css'

interface EditQuestionModalProps {
  question: Question;
  onSave: (updatedQuestion: Question) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ question, onSave }) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>({ ...question });

  const handleSave = () => {
    onSave(editedQuestion);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="edit-button">Edit Response</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.Title>Edit Question</Dialog.Title>
          <Dialog.Description>
            <strong>Question:</strong> {editedQuestion.question}
          </Dialog.Description>
          <form className="edit-form">
            <label>
              <strong>Response:</strong>
              <select
                value={editedQuestion.response}
                onChange={(e) =>
                  setEditedQuestion((prev) => ({
                    ...prev,
                    response: e.target.value,
                  }))
                }
              >
                {editedQuestion.answer_choices.map((choice, index) => (
                  <option key={index} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </label>
          </form>
          <div className="modal-actions">
            <Dialog.Close asChild>
            <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditQuestionModal;
