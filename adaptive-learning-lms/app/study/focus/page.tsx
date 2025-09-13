"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Brain, Clock, Target } from "lucide-react"
import Link from "next/link"

export default function FocusModePage() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus")
  const [completedSessions, setCompletedSessions] = useState(0)
  const [currentTopic, setCurrentTopic] = useState("Neural Networks")

  const focusTime = 25 * 60 // 25 minutes
  const breakTime = 5 * 60 // 5 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Session completed
      if (sessionType === "focus") {
        setCompletedSessions((prev) => prev + 1)
        setSessionType("break")
        setTimeLeft(breakTime)
      } else {
        setSessionType("focus")
        setTimeLeft(focusTime)
      }
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, sessionType, breakTime, focusTime])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setTimeLeft(sessionType === "focus" ? focusTime : breakTime)
  }

  const handleNewSession = () => {
    setIsActive(false)
    setSessionType("focus")
    setTimeLeft(focusTime)
    setCompletedSessions(0)
  }

  const progress =
    sessionType === "focus" ? ((focusTime - timeLeft) / focusTime) * 100 : ((breakTime - timeLeft) / breakTime) * 100

  const studyTopics = ["Neural Networks", "Binary Trees", "Hypothesis Testing", "Linear Algebra", "Graph Algorithms"]

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
                <Brain className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Focus Mode</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl">{sessionType === "focus" ? "Focus Session" : "Break Time"}</CardTitle>
                <CardDescription>
                  {sessionType === "focus" ? `Deep focus on ${currentTopic}` : "Take a well-deserved break"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Timer Display */}
                <div className="relative">
                  <div className="text-8xl font-bold text-blue-600 mb-4">{formatTime(timeLeft)}</div>
                  <Progress value={progress} className="h-3 mb-6" />
                  <Badge variant={sessionType === "focus" ? "default" : "secondary"} className="text-lg px-4 py-2">
                    {sessionType === "focus" ? "Focus" : "Break"}
                  </Badge>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  {!isActive ? (
                    <Button size="lg" onClick={handleStart} className="px-8">
                      <Play className="h-5 w-5 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button size="lg" onClick={handlePause} variant="outline" className="px-8 bg-transparent">
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button size="lg" onClick={handleReset} variant="outline">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Session Info */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{completedSessions}</div>
                    <p className="text-sm text-blue-700">Sessions Completed</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{Math.round(completedSessions * 25)}m</div>
                    <p className="text-sm text-green-700">Total Focus Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Focus Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Focus Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">🎯 Single Task Focus</p>
                    <p className="text-xs text-gray-600">Work on one topic at a time</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">📱 Eliminate Distractions</p>
                    <p className="text-xs text-gray-600">Put away your phone and close other tabs</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">💧 Stay Hydrated</p>
                    <p className="text-xs text-gray-600">Keep water nearby</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">🧘 Take Deep Breaths</p>
                    <p className="text-xs text-gray-600">Stay calm and focused</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Topic */}
            <Card>
              <CardHeader>
                <CardTitle>Current Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-blue-900">{currentTopic}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => {
                      const randomTopic = studyTopics[Math.floor(Math.random() * studyTopics.length)]
                      setCurrentTopic(randomTopic)
                    }}
                  >
                    Change Topic
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Study Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Available Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {studyTopics.map((topic, index) => (
                    <Button
                      key={index}
                      variant={topic === currentTopic ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setCurrentTopic(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Focus Sessions</span>
                  <span className="font-medium">{completedSessions}/4</span>
                </div>
                <Progress value={(completedSessions / 4) * 100} />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Study Time</span>
                  <span className="font-medium">{completedSessions * 25}min</span>
                </div>
                <Progress value={((completedSessions * 25) / 120) * 100} />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleNewSession}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Session
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href="/study/flashcards">
                    <Clock className="h-4 w-4 mr-2" />
                    Quick Review
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
