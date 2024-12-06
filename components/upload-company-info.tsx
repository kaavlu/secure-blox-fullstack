"use client"
import { FileUpload } from "@/components/file-upload"

export function UploadCompanyInfo() {
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-white mb-4">
        Upload company Information
      </h1>
      <p className="text-zinc-400 mb-8">
        Upload a PDF to import company data to our AI
      </p>
      <FileUpload
        accept=".pdf"
        onChange={(file) => console.log("File selected:", file)}
      />
    </div>
  )
}

