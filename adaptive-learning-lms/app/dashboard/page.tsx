import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Upload, BarChart3, Target, Clock, TrendingUp, FileText, Brain } from "lucide-react"
import Link from "next/link"
import { RecommendationWidget } from "@/components/recommendation-widget"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AdaptiveLearn</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome back, Student!</span>
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents Processed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments Completed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+12 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Start your learning journey with these essential tools</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button className="h-24 flex-col gap-2" asChild>
                  <Link href="/upload">
                    <Upload className="h-6 w-6" />
                    Upload Document
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/assessments">
                    <Target className="h-6 w-6" />
                    Take Assessment
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/analytics">
                    <BarChart3 className="h-6 w-6" />
                    View Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/study">
                    <BookOpen className="h-6 w-6" />
                    Study Session
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Your recently uploaded and processed materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Introduction to Machine Learning.pdf", status: "Processed", date: "2 hours ago" },
                    { name: "Data Structures Chapter 5.pdf", status: "Processing", date: "1 day ago" },
                    { name: "Statistics Fundamentals.txt", status: "Processed", date: "3 days ago" },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.date}</p>
                        </div>
                      </div>
                      <Badge variant={doc.status === "Processed" ? "default" : "secondary"}>{doc.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your current learning goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Machine Learning</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Data Structures</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Statistics</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} />
                </div>
              </CardContent>
            </Card>

            <RecommendationWidget limit={3} />
          </div>
        </div>
      </div>
    </div>
  )
}
