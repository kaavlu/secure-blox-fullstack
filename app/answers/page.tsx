"use client"
import { Button } from "@/components/ui/button"
import { ProgressSteps } from "@/components/progress-steps"
import { AnswerCard } from "@/components/answer-card"
import { useEffect, useState } from "react"
import { Question } from "../results/page"

interface ResultsData {
  filename: string
  questions: Question[]
}

export default function AnswersPage() {

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
        json.questions.sort((a: Question, b: Question) => a.confidence_level - b.confidence_level);
        setData(json);
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

  const handleUpdate = (updatedQuestion: Question) => {
    setData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        questions: prevData.questions.map((q) =>
          q.question_id === updatedQuestion.question_id ? updatedQuestion : q
        ),
      };
    });
  };


    return (
        <div className="min-h-screen w-full ">
            <div className="flex">
                <div className="container mx-auto px-8 py-6">
                    <ProgressSteps currentStep={3} />
                    <div className="mt-12">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-white mb-4">Answers</h1>
                            <Button variant="outline" className="text-white">
                                Download
                            </Button>
                        </div>
                        <p className="text-zinc-400 mb-8">
                            Based on the data of the company provided, here are the answers.
                        </p>
                        <div className="space-y-6">

                            {data.questions.map((question, index) => (
                              <AnswerCard
                                key={index}
                                question={question}
                                onSave={handleUpdate} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

