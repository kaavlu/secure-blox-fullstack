"use client"
import { useState, useEffect } from "react"

interface Question {
  question_id: string
  question: string
  answer_choices: string[]
  answer: string
  deduction: string
  confidence_level: number
}

interface ResultsData {
  filename: string
  questions: Question[]
}

export default function ResultsPage() {
  const [data, setData] = useState<ResultsData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:5000/results")
        if (!response.ok) {
          throw new Error("Failed to fetch results.")
        }
        const json = await response.json()
        setData(json)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    fetchResults()
  }, [])

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  if (!data) {
    return <p className="text-white">Loading results...</p>
  }

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-white mb-4">Results</h1>
      <p className="text-zinc-400 mb-4">Filename: {data.filename}</p>
      <div className="bg-zinc-800 p-4 rounded text-white overflow-auto">
        {data.questions.map((question) => (
          <div key={question.question_id} className="mb-6 border-b border-gray-600 pb-4">
            <h2 className="font-bold mb-2">{question.question_id}: {question.question}</h2>
            <ul className="ml-4 list-disc mb-2">
              {question.answer_choices.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
            <p><strong>Answer:</strong> {question.answer}</p>
            <p><strong>Deduction:</strong> {question.deduction}</p>
            <p><strong>Confidence Level:</strong> {question.confidence_level}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
