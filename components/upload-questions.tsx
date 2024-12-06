"use client"
import { useState } from "react"
import { FileUpload } from "@/components/file-upload"

export function UploadQuestions() {
  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Failed to process the file.")
      }
      const data = await response.json()
      setJsonData(data)
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-white mb-4">
        Upload your questions
      </h1>
      <p className="text-zinc-400 mb-8">
        Upload a PDF with all your questions and we shall answer them
      </p>
      <FileUpload
        accept=".pdf"
        onChange={(file) => handleFileUpload(file)}
      />
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {jsonData && (
        <a
          href="/results"
          className="text-blue-500 underline mt-4 block"
        >
          View Results
        </a>
      )}
    </div>
  )
}
