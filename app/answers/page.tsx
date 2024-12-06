import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { ProgressSteps } from "@/components/progress-steps"
import { AnswerCard } from "@/components/answer-card"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function AnswersPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-zinc-900">
        <div className="flex">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <main className="container mx-auto px-8 py-6">
              <SidebarTrigger />
              <div className="flex justify-between items-center">
                <ProgressSteps currentStep={3} />
                <Button variant="outline" className="text-white">
                  Download
                </Button>
              </div>
              <div className="mt-12">
                <h1 className="text-3xl font-bold text-white mb-4">Answers</h1>
                <p className="text-zinc-400 mb-8">
                  Based on the data of the company provided, here are the answers.
                </p>
                <div className="space-y-6">
                  <AnswerCard
                    questionNumber={1}
                    question="What is the deadline for employees to report conflicts of interest?"
                    score="10/10"
                    answer="Within 30 days."
                  />
                  <AnswerCard
                    questionNumber={2}
                    question="What is the process for reporting misconduct?"
                    score="8/10"
                    answer="Contact your immediate supervisor or the compliance hotline."
                  />
                  <AnswerCard
                    questionNumber={3}
                    question="How often is security training required?"
                    score="9/10"
                    answer="Annually, with quarterly refresher courses."
                  />
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

