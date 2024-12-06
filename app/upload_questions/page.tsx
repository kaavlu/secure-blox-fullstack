import { UploadQuestions } from "@/components/upload-questions"
import { AppSidebar } from "@/components/app-sidebar"
import { ProgressSteps } from "@/components/progress-steps"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function QuestionsPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <div className="flex">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <main className="container mx-auto px-8 py-6">
              <SidebarTrigger />
              <ProgressSteps currentStep={2} />
              <UploadQuestions />
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

