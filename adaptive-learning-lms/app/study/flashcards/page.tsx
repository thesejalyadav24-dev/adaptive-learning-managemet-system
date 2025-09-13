"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RotateCcw, CheckCircle, X, Brain, Zap } from "lucide-react"
import Link from "next/link"

interface Flashcard {
  id: string
  front: string
  back: string
  subject: string
  difficulty: "easy" | "medium" | "hard"
  topic: string
}

// Mock flashcard data
const flashcards: Flashcard[] = [
  {
    id: "1",
    front: "What is the primary function of an activation function in neural networks?",
    back: "To introduce non-linearity into the model, allowing the network to learn complex patterns and relationships in the data.",
    subject: "Machine Learning",
    difficulty: "medium",
    topic: "Neural Networks",
  },
  {
    id: "2",
    front: "Define Big O notation",
    back: "Big O notation describes the upper bound of the time complexity of an algorithm, representing the worst-case scenario for how the runtime grows with input size.",
    subject: "Data Structures",
    difficulty: "easy",
    topic: "Algorithm Analysis",
  },
  {
    id: "3",
    front: "What is the difference between Type I and Type II errors in hypothesis testing?",
    back: "Type I error (α) is rejecting a true null hypothesis (false positive). Type II error (β) is failing to reject a false null hypothesis (false negative).",
    subject: "Statistics",
    difficulty: "hard",
    topic: "Hypothesis Testing",
  },
  {
    id: "4",
    front: "What is the time complexity of binary search?",
    back: "O(log n) - Binary search eliminates half of the remaining elements in each step, resulting in logarithmic time complexity.",
    subject: "Data Structures",
    difficulty: "easy",
    topic: "Search Algorithms",
  },
  {
    id: "5",
    front: "Explain gradient descent",
    back: "An optimization algorithm that iteratively moves toward the minimum of a function by taking steps proportional to the negative of the gradient at the current point.",
    subject: "Machine Learning",
    difficulty: "medium",
    topic: "Optimization",
  },
]

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set())

  const currentCard = flashcards[currentIndex]
  const progress = (reviewedCards.size / flashcards.length) * 100

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectCount(correctCount + 1)
    } else {
      setIncorrectCount(incorrectCount + 1)
    }

    setReviewedCards(new Set([...reviewedCards, currentCard.id]))

    // Move to next card
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setCorrectCount(0)
    setIncorrectCount(0)
    setReviewedCards(new Set())
  }

  const isComplete = reviewedCards.size === flashcards.length

  if (isComplete) {
    const accuracy = Math.round((correctCount / (correctCount + incorrectCount)) * 100)

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/study">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Study
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Flashcards Complete!</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Session Complete!</CardTitle>
              <CardDescription>Great job reviewing your flashcards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-blue-600">{accuracy}%</div>
              <p className="text-xl text-gray-600">Accuracy</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                  <p className="text-sm text-green-700">Correct</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
                  <p className="text-sm text-red-700">Incorrect</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Study Again
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/study">Back to Study Center</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/study">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Study
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Flashcards</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {currentIndex + 1} of {flashcards.length}
              </span>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{correctCount}</div>
              <p className="text-sm text-gray-600">Correct</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
              <p className="text-sm text-gray-600">Incorrect</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{flashcards.length - reviewedCards.size}</div>
              <p className="text-sm text-gray-600">Remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Flashcard */}
        <div className="max-w-2xl mx-auto">
          <Card className="min-h-[400px] cursor-pointer" onClick={handleFlip}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentCard.subject}</Badge>
                  <Badge variant="secondary">{currentCard.topic}</Badge>
                </div>
                <Badge
                  variant={
                    currentCard.difficulty === "easy"
                      ? "default"
                      : currentCard.difficulty === "medium"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {currentCard.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[250px]">
              <div className="text-center">
                {!isFlipped ? (
                  <div>
                    <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-4">{currentCard.front}</p>
                    <p className="text-sm text-gray-500">Click to reveal answer</p>
                  </div>
                ) : (
                  <div>
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-lg leading-relaxed">{currentCard.back}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Answer Buttons */}
          {isFlipped && (
            <div className="flex gap-4 mt-6 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(false)}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                <X className="h-5 w-5 mr-2" />
                Incorrect
              </Button>
              <Button size="lg" onClick={() => handleAnswer(true)} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-5 w-5 mr-2" />
                Correct
              </Button>
            </div>
          )}

          {/* Instructions */}
          {!isFlipped && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Read the question carefully, think about your answer, then click the card to reveal the solution.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
