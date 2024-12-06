"use client"
import { FileUpload } from "@/components/file-upload"

export function UploadQuestions() {
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
        onChange={(file) => console.log("File selected:", file)}
      />
    </div>
  )
}

