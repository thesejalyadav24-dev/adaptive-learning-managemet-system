import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Brain, ArrowLeft, Target, Clock, TrendingUp, Play, Zap } from "lucide-react"
import Link from "next/link"

// Mock data for available study sessions
const studySessions = [
  {
    id: "ml-basics",
    title: "Machine Learning Fundamentals",
    description: "Core concepts of supervised and unsupervised learning",
    difficulty: "Intermediate",
    estimatedTime: 45,
    progress: 75,
    topics: ["Neural Networks", "Supervised Learning", "Classification"],
    lastStudied: "2 hours ago",
    type: "Interactive",
  },
  {
    id: "data-structures",
    title: "Data Structures Deep Dive",
    description: "Advanced concepts in trees, graphs, and hash tables",
    difficulty: "Advanced",
    estimatedTime: 60,
    progress: 40,
    topics: ["Binary Trees", "Graph Algorithms", "Hash Tables"],
    lastStudied: "1 day ago",
    type: "Practice",
  },
  {
    id: "statistics-review",
    title: "Statistics Review Session",
    description: "Probability distributions and hypothesis testing",
    difficulty: "Beginner",
    estimatedTime: 30,
    progress: 90,
    topics: ["Probability", "Distributions", "Hypothesis Testing"],
    lastStudied: "3 hours ago",
    type: "Review",
  },
]

const quickStudyOptions = [
  {
    title: "Quick Quiz",
    description: "5-minute knowledge check",
    icon: Target,
    color: "bg-blue-50 text-blue-700",
    href: "/study/quick-quiz",
  },
  {
    title: "Flashcards",
    description: "Review key concepts",
    icon: Zap,
    color: "bg-green-50 text-green-700",
    href: "/study/flashcards",
  },
  {
    title: "Focus Mode",
    description: "Deep learning session",
    icon: Brain,
    color: "bg-purple-50 text-purple-700",
    href: "/study/focus",
  },
  {
    title: "Practice Problems",
    description: "Solve challenging questions",
    icon: Play,
    color: "bg-orange-50 text-orange-700",
    href: "/study/practice",
  },
]

export default function StudyPage() {
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
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Study Center</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Study Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Goal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">2h</div>
              <Progress value={65} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">1h 18m completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">3</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">45m</div>
              <p className="text-xs text-muted-foreground">Average session</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Study Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Study Options */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Study</CardTitle>
                <CardDescription>Jump into a focused learning session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickStudyOptions.map((option, index) => {
                    const Icon = option.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col gap-2 bg-transparent hover:bg-gray-50"
                        asChild
                      >
                        <Link href={option.href}>
                          <div className={`p-2 rounded-lg ${option.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-sm">{option.title}</p>
                            <p className="text-xs text-gray-600">{option.description}</p>
                          </div>
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Study Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Your Study Sessions</CardTitle>
                <CardDescription>Continue where you left off or start something new</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studySessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{session.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{session.difficulty}</Badge>
                          <Badge variant="secondary">{session.type}</Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.estimatedTime}min
                        </span>
                        <span>Last studied: {session.lastStudied}</span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{session.progress}%</span>
                        </div>
                        <Progress value={session.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {session.topics.slice(0, 3).map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild>
                          <Link href={`/study/session/${session.id}`}>
                            {session.progress > 0 ? "Continue" : "Start"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Focus */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Focus</CardTitle>
                <CardDescription>Recommended study areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Neural Networks</p>
                  <p className="text-xs text-blue-700">Review backpropagation concepts</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Binary Trees</p>
                  <p className="text-xs text-green-700">Practice traversal algorithms</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">Hypothesis Testing</p>
                  <p className="text-xs text-purple-700">Complete practice problems</p>
                </div>
              </CardContent>
            </Card>

            {/* Study Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Perfect Score</p>
                    <p className="text-xs text-gray-600">Aced ML assessment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Study Streak</p>
                    <p className="text-xs text-gray-600">12 days in a row</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quick Learner</p>
                    <p className="text-xs text-gray-600">Mastered 3 topics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">💡 Active Recall</p>
                  <p className="text-xs text-gray-600">Test yourself without looking at notes</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">⏰ Pomodoro Technique</p>
                  <p className="text-xs text-gray-600">25 minutes focused, 5 minute break</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">🔄 Spaced Repetition</p>
                  <p className="text-xs text-gray-600">Review material at increasing intervals</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
