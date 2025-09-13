"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Brain, ArrowLeft, Clock, CheckCircle, Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer" | "fill-blank"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  topic: string
}

interface Assessment {
  id: string
  documentId: string
  title: string
  description: string
  questions: Question[]
  timeLimit: number
  totalQuestions: number
}

export default function AssessmentPage({ params }: { params: { documentId: string } }) {
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    generateAssessment()
  }, [])

  useEffect(() => {
    if (timeRemaining > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && assessment && !isCompleted) {
      handleSubmitAssessment()
    }
  }, [timeRemaining, isCompleted, assessment])

  const generateAssessment = async () => {
    try {
      const response = await fetch("/api/assessments/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: params.documentId,
          questionCount: 10,
          difficulty: "mixed",
        }),
      })

      const result = await response.json()
      if (result.success) {
        setAssessment(result.assessment)
        setTimeRemaining(result.assessment.timeLimit * 60) // Convert to seconds
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Failed to generate assessment:", error)
      toast({
        title: "Error",
        description: "Failed to generate assessment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNextQuestion = () => {
    if (assessment && currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitAssessment = () => {
    setIsCompleted(true)
    setShowResults(true)

    toast({
      title: "Assessment Completed!",
      description: "Your responses have been recorded and analyzed.",
    })
  }

  const calculateScore = () => {
    if (!assessment) return { score: 0, total: 0, percentage: 0 }

    let correct = 0
    assessment.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (question.type === "multiple-choice" && userAnswer === question.correctAnswer.toString()) {
        correct++
      } else if (question.type === "true-false" && userAnswer === question.correctAnswer) {
        correct++
      } else if ((question.type === "short-answer" || question.type === "fill-blank") && userAnswer) {
        // Simple keyword matching for demo - in real app, use more sophisticated NLP
        const correctKeywords = question.correctAnswer.toString().toLowerCase().split(" ")
        const userKeywords = userAnswer.toLowerCase().split(" ")
        const matchCount = correctKeywords.filter((keyword) =>
          userKeywords.some((userWord) => userWord.includes(keyword) || keyword.includes(userWord)),
        ).length

        if (matchCount >= correctKeywords.length * 0.6) {
          // 60% keyword match threshold
          correct++
        }
      }
    })

    return {
      score: correct,
      total: assessment.questions.length,
      percentage: Math.round((correct / assessment.questions.length) * 100),
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg font-medium">Generating your personalized assessment...</p>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">Failed to load assessment</p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (showResults) {
    const results = calculateScore()
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">Assessment Complete</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Your Results</CardTitle>
              <CardDescription>{assessment.title}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">{results.percentage}%</div>
              <p className="text-xl text-gray-600 mb-6">
                {results.score} out of {results.total} questions correct
              </p>

              <div className="flex justify-center gap-4 mb-6">
                <Badge
                  variant={
                    results.percentage >= 80 ? "default" : results.percentage >= 60 ? "secondary" : "destructive"
                  }
                >
                  {results.percentage >= 80 ? "Excellent" : results.percentage >= 60 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>

              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href={`/study/${params.documentId}`}>Continue Studying</Link>
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card>
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
              <CardDescription>Review your answers and explanations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessment.questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect =
                  question.type === "multiple-choice"
                    ? userAnswer === question.correctAnswer.toString()
                    : question.type === "true-false"
                      ? userAnswer === question.correctAnswer
                      : userAnswer && userAnswer.toLowerCase().includes(question.correctAnswer.toString().toLowerCase())

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <Badge variant={isCorrect ? "default" : "destructive"}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    <p className="mb-3">{question.question}</p>
                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <p className="text-sm">
                        <strong>Your answer:</strong> {userAnswer || "No answer provided"}
                      </p>
                      <p className="text-sm">
                        <strong>Correct answer:</strong>{" "}
                        {question.type === "multiple-choice" && question.options
                          ? question.options[question.correctAnswer as number]
                          : question.correctAnswer}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{question.explanation}</p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = assessment.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/study/${params.documentId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Study
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Target className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{assessment.title}</h1>
                  <p className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {assessment.questions.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{formatTime(timeRemaining)}</span>
              </div>
              <Badge variant="outline">{currentQuestion.difficulty}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
              <Badge variant="secondary">{currentQuestion.topic}</Badge>
            </div>
            <CardDescription className="text-lg">{currentQuestion.question}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "true-false" && (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true" className="flex-1 cursor-pointer">
                    True
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false" className="flex-1 cursor-pointer">
                    False
                  </Label>
                </div>
              </RadioGroup>
            )}

            {currentQuestion.type === "short-answer" && (
              <Textarea
                placeholder="Enter your answer here..."
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="min-h-[100px]"
              />
            )}

            {currentQuestion.type === "fill-blank" && (
              <Input
                placeholder="Fill in the blank..."
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestionIndex === assessment.questions.length - 1 ? (
              <Button onClick={handleSubmitAssessment}>Submit Assessment</Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
