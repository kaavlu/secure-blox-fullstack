import { UploadCompanyInfo } from "@/components/upload-company-info"
import { ProgressSteps } from "@/components/progress-steps"

export default function Page() {
  return (

    <div className="min-h-screen w-full ">
      <div className="flex">
        <div className="container mx-auto px-8 py-6">
          <ProgressSteps currentStep={1} />
          <UploadCompanyInfo />
        </div>
      </div>
    </div>
  )
}