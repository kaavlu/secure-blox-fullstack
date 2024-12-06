"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileUp } from 'lucide-react'

interface FileUploadProps {
  accept?: string
  onChange: (file: File) => void
}

export function FileUpload({ accept, onChange }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      onChange(file)
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-12 text-center ${
        isDragging ? "border-white bg-zinc-800/50" : "border-zinc-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-zinc-800 rounded-full">
          <FileUp className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-lg font-medium text-white">
            Drag and drop PDF here or click to browse
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            your files will be private
          </p>
        </div>
        <Button
          variant="outline"
          className="text-gray-700"
          onClick={() => {
            const input = document.createElement("input")
            input.type = "file"
            input.accept = accept || ""
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) {
                onChange(file)
              }
            }
            input.click()
          }}
        >
          Select File
        </Button>
      </div>
    </div>
  )
}

