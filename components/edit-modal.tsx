import { Question } from "@/app/results/page"
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";


interface EditQuestionModalProps {
    question: Question,
    onSave: (updatedQuestion: Question) => void;
}


export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ question, onSave }) => {
    const [editedQuestion, setEditedQuestion] = useState<Question>({...question});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, header_name: string) => setEditedQuestion((prev) => {
        const { value } = e.target;
        return {
            ...prev,
            answer : value
        }});

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-blue-500 text-white px-4 py-2 rounded ml-auto'>Edit Response</Button>
            </DialogTrigger>
            
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Question
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {question.question}
                </DialogDescription>
                <form className="edit-form">
                    <label>
                        Change Answer:
                        {question.answer_choices.length > 0 ? (
                        <select
                            className="border-2 border border-black ml-2"
                            value={editedQuestion.answer}
                            onChange={(e) => handleChange(e, "answer")}
                        >
                            {editedQuestion.answer_choices.map( (choice, index) => (
                                <option key={index} value={choice}>
                                    {choice}
                                </option>
                            ))} 
                        </select>) :
                        (<textarea
                            value={editedQuestion.answer}
                            onChange={(e) => handleChange(e, "answer")}
                            />
                        )}
                    </label>
                    {/* <p className="my-3" />
                    <label>
                        For our model, what's your reasoning?:
                        <textarea
                            className="border-1 border w-full"
                            value={editedQuestion.deduction}
                            onChange={(e) => handleChange(e, "deduction")}
                        />
                    </label> */}
                </form>
                <DialogFooter>
                    <DialogClose><Button type="submit" onClick={() => onSave(editedQuestion)}>Save</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}