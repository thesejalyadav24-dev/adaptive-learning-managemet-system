import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Brain, ArrowLeft, Target, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

// This would typically fetch data based on the document ID
async function getDocumentData(id: string) {
  // Simulated document data - in a real app, this would come from a database
  return {
    id,
    name: "Introduction to Machine Learning.pdf",
    subject: "Machine Learning",
    difficulty: "Intermediate",
    keyTopics: ["Neural Networks", "Supervised Learning", "Deep Learning", "Classification", "Regression"],
    studyMaterials: {
      summary:
        "This document covers fundamental concepts of machine learning including supervised and unsupervised learning techniques, neural networks, and practical applications in data science.",
      keyPoints: [
        "Understanding supervised vs unsupervised learning",
        "Neural network architecture and training",
        "Classification and regression techniques",
        "Model evaluation and validation methods",
        "Practical applications in real-world scenarios",
      ],
      suggestedQuestions: [
        "What are the main differences between supervised and unsupervised learning?",
        "How do neural networks learn from data?",
        "What are the key metrics for evaluating machine learning models?",
      ],
    },
    progress: 35,
    timeSpent: "2h 15m",
    lastStudied: "2 hours ago",
  }
}

export default async function StudyPage({ params }: { params: { id: string } }) {
  const document = await getDocumentData(params.id)

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
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{document.name}</h1>
                  <p className="text-sm text-gray-600">{document.subject}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{document.difficulty}</Badge>
              <Button asChild>
                <Link href={`/assessments/generate/${document.id}`}>
                  <Target className="h-4 w-4 mr-2" />
                  Take Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Study Progress</CardTitle>
                <CardDescription>Your learning journey with this document</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{document.progress}%</span>
                  </div>
                  <Progress value={document.progress} className="h-2" />

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Time Spent: {document.timeSpent}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Last Studied: {document.lastStudied}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Document Summary</CardTitle>
                <CardDescription>AI-generated overview of the key concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{document.studyMaterials.summary}</p>
              </CardContent>
            </Card>

            {/* Key Learning Points */}
            <Card>
              <CardHeader>
                <CardTitle>Key Learning Points</CardTitle>
                <CardDescription>Essential concepts to master</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {document.studyMaterials.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <p className="text-sm text-blue-900">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Study Actions</CardTitle>
                <CardDescription>Continue your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-16 flex-col gap-2" asChild>
                    <Link href={`/assessments/generate/${document.id}`}>
                      <Target className="h-5 w-5" />
                      Generate Quiz
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent" asChild>
                    <Link href={`/flashcards/${document.id}`}>
                      <BookOpen className="h-5 w-5" />
                      Study Flashcards
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Topics</CardTitle>
                <CardDescription>Main concepts in this document</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.keyTopics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Study Questions</CardTitle>
                <CardDescription>Test your understanding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {document.studyMaterials.suggestedQuestions.map((question, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{question}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href={`/assessments/generate/${document.id}`}>Answer These Questions</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Active Recall</p>
                  <p className="text-xs text-green-700">Test yourself without looking at notes</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Spaced Repetition</p>
                  <p className="text-xs text-blue-700">Review material at increasing intervals</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">Elaborative Learning</p>
                  <p className="text-xs text-purple-700">Connect new concepts to existing knowledge</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
