// import { Button } from "@/components/ui/button"
// import { ProgressSteps } from "@/components/progress-steps"
// import { AnswerCard } from "@/components/answer-card"

// export default function Page() {
//   return (
//     <div className="min-h-screen bg-zinc-900">
//       <div className="flex">
//         <main className="flex-1 pl-64">
//           <div className="container mx-auto px-8 py-6">
//             <div className="flex justify-between items-center">
//               <ProgressSteps currentStep={3} />
//               <Button variant="outline" className="text-white">
//                 Download
//               </Button>
//             </div>
//             <div className="mt-12">
//               <h1 className="text-3xl font-bold text-white mb-4">Answers</h1>
//               <p className="text-zinc-400 mb-8">
//                 Based on the data of the company provided, here are the answers.
//               </p>
//               <div className="space-y-6">
//                 <AnswerCard
//                   questionNumber={1}
//                   question="What is the deadline for employees to report conflicts of interest?"
//                   score="10/10"
//                   answer="Within 30 days."
//                 />
//                 <AnswerCard
//                   questionNumber={1}
//                   question="What is the deadline for employees to report conflicts of interest?"
//                   score="6/10"
//                   answer="Within 30 days."
//                 />
//                 <AnswerCard
//                   questionNumber={1}
//                   question="What is the deadline for employees to report conflicts of interest?"
//                   score="6/10"
//                   answer="Within 30 days."
//                 />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

import { UploadCompanyInfo } from "@/components/upload-company-info"
import { AppSidebar } from "@/components/app-sidebar"
import { ProgressSteps } from "@/components/progress-steps"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-zinc-900">
        <div className="flex">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <main className="container mx-auto px-8 py-6">
              <SidebarTrigger />
              <ProgressSteps currentStep={1} />
              <UploadCompanyInfo />
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}