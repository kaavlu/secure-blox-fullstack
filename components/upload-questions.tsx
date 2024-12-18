"use client"
import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { PulseLoader } from "react-spinners"
import { useRouter } from "next/navigation"

export function UploadQuestions() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    setLoading(true)
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Failed to process the file.")
      }
  
      setSuccess(true)
      setError(null)

      router.push("/answers");

    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
      setSuccess(false)
      setLoading(false)
    }
    setLoading(false);
  }  

  return (
    <div className="mt-12">
      {!loading ? (<>
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
      {success && (
        <p className="text-green-500 mt-4">
          File processed successfully.{" "}
          <a
            href="/results"
            className="text-blue-500 underline"
          >
            View Results
          </a>
        </p>
      )}
      </>) : 
      (<div className="flex flex-col items-center p-4">
        <PulseLoader color="white" />
      </div>)}
    </div>
  )
}
