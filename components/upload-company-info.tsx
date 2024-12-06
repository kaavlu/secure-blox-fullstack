"use client"
import { FileUpload } from "@/components/file-upload"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export function UploadCompanyInfo() {

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFileUpload = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    router.push('/upload-questions');

  }
  return (
    <div className="mt-12">
      {!loading ?
      (<><h1 className="text-3xl font-bold text-white mb-4">
          Upload company information
        </h1><p className="text-zinc-400 mb-8">
            Upload a PDF to import company data to our AI
          </p><FileUpload
            accept=".pdf"
            onChange={() => handleFileUpload()} /></>)
      :
      (<div className="flex flex-col items-center p-4">
        <PulseLoader color="white" />
      </div>)}
    </div>
  )
}

