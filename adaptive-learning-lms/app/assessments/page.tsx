import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Clock, TrendingUp, ArrowLeft, Plus, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from a database
const recentAssessments = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    documentName: "Introduction to ML.pdf",
    score: 85,
    totalQuestions: 10,
    completedAt: "2 hours ago",
    difficulty: "Intermediate",
    topics: ["Neural Networks", "Supervised Learning"],
  },
  {
    id: "2",
    title: "Data Structures Quiz",
    documentName: "Data Structures Chapter 5.pdf",
    score: 92,
    totalQuestions: 15,
    completedAt: "1 day ago",
    difficulty: "Advanced",
    topics: ["Binary Trees", "Hash Tables"],
  },
  {
    id: "3",
    title: "Statistics Review",
    documentName: "Statistics Fundamentals.txt",
    score: 78,
    totalQuestions: 12,
    completedAt: "3 days ago",
    difficulty: "Beginner",
    topics: ["Probability", "Distributions"],
  },
]

const availableDocuments = [
  {
    id: "doc_1",
    name: "Advanced Algorithms.pdf",
    subject: "Computer Science",
    topics: ["Dynamic Programming", "Graph Algorithms", "Complexity Analysis"],
  },
  {
    id: "doc_2",
    name: "Linear Algebra Concepts.pdf",
    subject: "Mathematics",
    topics: ["Matrices", "Eigenvalues", "Vector Spaces"],
  },
  {
    id: "doc_3",
    name: "Database Systems.pdf",
    subject: "Computer Science",
    topics: ["SQL", "Normalization", "Transactions"],
  },
]

export default function AssessmentsPage() {
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
                <Target className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+3 this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">+2% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12h</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>Your latest assessment results and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssessments.map((assessment) => (
                    <div key={assessment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{assessment.title}</h3>
                          <p className="text-sm text-gray-600">{assessment.documentName}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{assessment.score}%</div>
                          <p className="text-xs text-gray-500">{assessment.completedAt}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <Badge variant="outline">{assessment.difficulty}</Badge>
                        <span className="text-sm text-gray-600">
                          {assessment.score}/{assessment.totalQuestions} correct
                        </span>
                      </div>

                      <div className="mb-3">
                        <Progress value={assessment.score} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {assessment.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline">
                          Review
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
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Generate new assessments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/upload">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload & Generate
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/assessments/practice">
                    <Target className="h-4 w-4 mr-2" />
                    Practice Mode
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Available Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Available Documents</CardTitle>
                <CardDescription>Generate assessments from your uploaded materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableDocuments.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-600">{doc.subject}</p>
                        </div>
                        <BookOpen className="h-4 w-4 text-gray-400" />
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {doc.topics.slice(0, 2).map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {doc.topics.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.topics.length - 2}
                          </Badge>
                        )}
                      </div>

                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/assessments/generate/${doc.id}`}>Generate Quiz</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Strong Areas</p>
                  <p className="text-xs text-green-700">Statistics, Linear Algebra</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">Focus Areas</p>
                  <p className="text-xs text-orange-700">Neural Networks, Algorithms</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Recommendation</p>
                  <p className="text-xs text-blue-700">Practice more advanced topics</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
