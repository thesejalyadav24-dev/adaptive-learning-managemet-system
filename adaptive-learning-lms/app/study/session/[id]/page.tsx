import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Brain, ArrowLeft, Target, Clock, Play, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data for study session
async function getStudySession(id: string) {
  const sessions = {
    "ml-basics": {
      id: "ml-basics",
      title: "Machine Learning Fundamentals",
      description: "Core concepts of supervised and unsupervised learning",
      difficulty: "Intermediate",
      estimatedTime: 45,
      progress: 75,
      topics: ["Neural Networks", "Supervised Learning", "Classification"],
      modules: [
        { id: 1, title: "Introduction to ML", completed: true, duration: 10 },
        { id: 2, title: "Supervised Learning", completed: true, duration: 15 },
        { id: 3, title: "Neural Networks", completed: true, duration: 12 },
        { id: 4, title: "Classification Algorithms", completed: false, duration: 8 },
      ],
      currentModule: 4,
    },
  }

  return sessions[id as keyof typeof sessions] || sessions["ml-basics"]
}

export default async function StudySessionPage({ params }: { params: { id: string } }) {
  const session = await getStudySession(params.id)

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
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{session.title}</h1>
                  <p className="text-sm text-gray-600">{session.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{session.difficulty}</Badge>
              <Badge variant="secondary">{session.estimatedTime}min</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Session Progress</CardTitle>
                <CardDescription>Track your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{session.progress}%</span>
                  </div>
                  <Progress value={session.progress} className="h-3" />

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {session.modules.filter((m) => m.completed).length}
                      </div>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">1</div>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {session.modules.filter((m) => !m.completed).length - 1}
                      </div>
                      <p className="text-sm text-gray-600">Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Module */}
            <Card>
              <CardHeader>
                <CardTitle>Current Module</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-blue-900">
                        Module {session.currentModule}: {session.modules[session.currentModule - 1]?.title}
                      </h3>
                      <p className="text-sm text-blue-700">
                        {session.modules[session.currentModule - 1]?.duration} minutes
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">Continue Learning</Button>
                </div>
              </CardContent>
            </Card>

            {/* Module List */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Modules</CardTitle>
                <CardDescription>Complete each module to master the topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {session.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        module.completed
                          ? "bg-green-50 border-green-200"
                          : module.id === session.currentModule
                            ? "bg-blue-50 border-blue-200"
                            : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            module.completed
                              ? "bg-green-100"
                              : module.id === session.currentModule
                                ? "bg-blue-100"
                                : "bg-gray-200"
                          }`}
                        >
                          {module.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : module.id === session.currentModule ? (
                            <Play className="h-4 w-4 text-blue-600" />
                          ) : (
                            <span className="text-xs font-medium text-gray-600">{module.id}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-gray-600">{module.duration} minutes</p>
                        </div>
                      </div>
                      <div>
                        {module.completed ? (
                          <Badge variant="default">Complete</Badge>
                        ) : module.id === session.currentModule ? (
                          <Button size="sm">Continue</Button>
                        ) : (
                          <Badge variant="secondary">Locked</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Info */}
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Estimated: {session.estimatedTime} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Difficulty: {session.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{session.modules.length} modules</span>
                </div>
              </CardContent>
            </Card>

            {/* Topics Covered */}
            <Card>
              <CardHeader>
                <CardTitle>Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {session.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href={`/assessments/generate/${session.id}`}>
                    <Target className="h-4 w-4 mr-2" />
                    Take Quiz
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href="/study/flashcards">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Review Flashcards
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href="/study/focus">
                    <Brain className="h-4 w-4 mr-2" />
                    Focus Mode
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Take Notes</p>
                  <p className="text-xs text-blue-700">Write down key concepts as you learn</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Practice Regularly</p>
                  <p className="text-xs text-green-700">Apply what you learn immediately</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">Ask Questions</p>
                  <p className="text-xs text-purple-700">Don't hesitate to seek clarification</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
