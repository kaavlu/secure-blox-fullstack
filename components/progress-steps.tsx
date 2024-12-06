"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  currentStep: number
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { number: 1, title: "Upload company Information", href: "/" },
    { number: 2, title: "Upload questions", href: "/upload-questions" },
    { number: 3, title: "Get answers", href: "/answers" },
  ]

  return (
    <div className="flex items-center justify-center space-x-4 py-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <Link href={step.href} className="flex items-center group">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                currentStep === step.number
                  ? "bg-white text-black"
                  : currentStep > step.number
                  ? "bg-zinc-800 text-zinc-400"
                  : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white"
              )}
            >
              {step.number}
            </div>
            <span
              className={cn(
                "ml-2 text-sm transition-colors",
                currentStep === step.number
                  ? "text-white"
                  : currentStep > step.number
                  ? "text-zinc-400"
                  : "text-zinc-400 group-hover:text-zinc-300"
              )}
            >
              {step.title}
            </span>
          </Link>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-24 h-[1px] mx-2 transition-colors",
                currentStep > step.number ? "bg-zinc-800 text-zinc-400" : "bg-zinc-800"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
