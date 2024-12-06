import { Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnswerCardProps {
  questionNumber: number
  question: string
  score: string
  answer: string
}

export function AnswerCard({
  questionNumber,
  question,
  score,
  answer,
}: AnswerCardProps) {
  return (
    <Card className="bg-zinc-800 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {questionNumber}. {question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <span className="text-sm">{score}</span>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-zinc-400">Answer.</p>
          <p>{answer}</p>
        </div>
      </CardContent>
    </Card>
  )
}

