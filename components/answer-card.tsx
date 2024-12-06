import { FileWarningIcon, List, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from './ui/button'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { useState } from 'react'
import { EditQuestionModal } from './edit-modal'
import { Question } from '@/app/results/page'

interface AnswerCardProps {
  question: Question
  onSave: (updatedQuestion: Question) => void;
}

export function AnswerCard({
  question,
  onSave
}: AnswerCardProps) {


  return (
    <Card className="bg-zinc-800 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex">
        {!question.answer ? (<FileWarningIcon className="mr-2" color="orange" />) : (<></>)} {question.question_id}. {question.question}
        <EditQuestionModal question={question} onSave={onSave} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc pl-5">
        {question.answer_choices.map((ans, index) => (
          ans == question.answer ? (
            <li key={index}>
                {ans}
            </li>
          ) :
          (<li key={index}>{ans}</li>)
        ))}
        </ul>
        <div className="flex items-center space-x-2">
          Confidence Level (<Target className="w-4 h-4" />):
          <span className="text-sm">{question.confidence_level}</span>
        </div>
        <div className="space-y-1">
          {question.answer ? (
              <><p className="text-sm text-zinc-400">Answer.</p><p>{question.answer}</p></>
            )
             : (<></>)
          }
        </div>
        <div className="space-y-1">
          {question.deduction ? (
              <><p className="text-sm text-zinc-400">Reasoning.</p><p>{question.deduction}</p></>
            )
             : (<></>)
          }
        </div>
      </CardContent>
    </Card>
  )
}

