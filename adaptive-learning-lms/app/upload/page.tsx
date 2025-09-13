"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Brain, CheckCircle, Clock, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface ProcessedDocument {
  id: string
  name: string
  size: number
  type: string
  subject: string
  notes: string
  keyTopics: string[]
  difficulty: string
  wordCount: number
  studyMaterials: {
    summary: string
    keyPoints: string[]
    suggestedQuestions: string[]
  }
  processedAt: string
}

interface UploadedFile {
  name: string
  size: string
  status: "uploading" | "processing" | "completed" | "error"
  processedData?: ProcessedDocument
  error?: string
}

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [subject, setSubject] = useState("")
  const [notes, setNotes] = useState("")
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    for (const file of Array.from(files)) {
      const newFile: UploadedFile = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        status: "uploading",
      }

      setUploadedFiles((prev) => [...prev, newFile])

      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("subject", subject)
        formData.append("notes", notes)

        // Simulate upload progress
        let progress = 0
        const progressInterval = setInterval(() => {
          progress += 20
          setUploadProgress(progress)

          if (progress >= 100) {
            clearInterval(progressInterval)
            setIsProcessing(true)
          }
        }, 300)

        // Update file status to processing
        setTimeout(() => {
          setUploadedFiles((prev) => prev.map((f) => (f.name === file.name ? { ...f, status: "processing" } : f)))
        }, 1500)

        // Make API call to process document
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()

        if (result.success) {
          // Update file status to completed with processed data
          setUploadedFiles((prev) =>
            prev.map((f) => (f.name === file.name ? { ...f, status: "completed", processedData: result.document } : f)),
          )

          toast({
            title: "Document processed successfully!",
            description: `${file.name} has been analyzed and study materials generated.`,
          })
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        console.error("Upload error:", error)
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.name === file.name
              ? { ...f, status: "error", error: error instanceof Error ? error.message : "Upload failed" }
              : f,
          ),
        )

        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Failed to process document",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
        setUploadProgress(0)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Learning Materials</CardTitle>
                <CardDescription>
                  Upload PDFs, text files, or documents to generate personalized study content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="file-upload" className="text-lg font-medium cursor-pointer">
                      Drop files here or click to browse
                    </Label>
                    <p className="text-sm text-gray-500">Supports PDF, TXT, DOC, DOCX files up to 10MB</p>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.txt,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                {/* Processing Status */}
                {isProcessing && (
                  <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 animate-spin" />
                    <span className="text-blue-900">Processing document with AI...</span>
                  </div>
                )}

                {/* Additional Options */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject/Topic (Optional)</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Machine Learning, Data Structures"
                      className="mt-1"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific areas you'd like to focus on..."
                      className="mt-1"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Files</CardTitle>
                  <CardDescription>Track the processing status of your documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === "uploading" && (
                              <Badge variant="secondary">
                                <Clock className="h-3 w-3 mr-1" />
                                Uploading
                              </Badge>
                            )}
                            {file.status === "processing" && (
                              <Badge variant="secondary">
                                <Clock className="h-3 w-3 mr-1 animate-spin" />
                                Processing
                              </Badge>
                            )}
                            {file.status === "completed" && (
                              <Badge variant="default">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Ready
                              </Badge>
                            )}
                            {file.status === "error" && (
                              <Badge variant="destructive">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Error
                              </Badge>
                            )}
                          </div>
                        </div>

                        {file.status === "completed" && file.processedData && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg space-y-2">
                            <div className="flex items-center gap-4 text-sm">
                              <span>
                                <strong>Topics:</strong> {file.processedData.keyTopics.slice(0, 3).join(", ")}
                              </span>
                              <span>
                                <strong>Difficulty:</strong> {file.processedData.difficulty}
                              </span>
                              <span>
                                <strong>Words:</strong> {file.processedData.wordCount}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{file.processedData.studyMaterials.summary}</p>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/study/${file.processedData.id}`}>Start Studying</Link>
                            </Button>
                          </div>
                        )}

                        {file.status === "error" && file.error && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700">{file.error}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Document Analysis</p>
                    <p className="text-sm text-gray-600">AI extracts key concepts and topics</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Content Generation</p>
                    <p className="text-sm text-gray-600">Creates study materials and questions</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Personalization</p>
                    <p className="text-sm text-gray-600">Adapts to your learning style</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supported Formats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  <span className="text-sm">PDF Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Text Files (.txt)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Word Documents</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
