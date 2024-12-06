import { UploadQuestions } from "@/components/upload-questions"
// import { AppSidebar } from "@/components/app-sidebar"
import { ProgressSteps } from "@/components/progress-steps"
// import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function QuestionsPage() {
  return (
    <div className="min-h-screen w-full ">
      <div className="flex">
        <div className="container mx-auto px-8 py-6">
          <ProgressSteps currentStep={2} />
          <UploadQuestions />
        </div>
      </div>
    </div>
  )
}

