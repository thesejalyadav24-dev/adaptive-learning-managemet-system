"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { BarChart3, ArrowLeft, TrendingUp, Clock, Target, Brain, Calendar, Award } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from a database
const performanceData = [
  { month: "Jan", score: 65, studyTime: 20, assessments: 5 },
  { month: "Feb", score: 72, studyTime: 25, assessments: 7 },
  { month: "Mar", score: 78, studyTime: 30, assessments: 8 },
  { month: "Apr", score: 85, studyTime: 35, assessments: 10 },
  { month: "May", score: 88, studyTime: 40, assessments: 12 },
  { month: "Jun", score: 92, studyTime: 45, assessments: 15 },
]

const subjectPerformance = [
  { subject: "Machine Learning", score: 92, assessments: 15, timeSpent: 45 },
  { subject: "Data Structures", score: 88, assessments: 12, timeSpent: 38 },
  { subject: "Statistics", score: 85, assessments: 10, timeSpent: 32 },
  { subject: "Linear Algebra", score: 78, assessments: 8, timeSpent: 28 },
  { subject: "Algorithms", score: 75, assessments: 6, timeSpent: 25 },
]

const difficultyDistribution = [
  { name: "Easy", value: 35, color: "#10B981" },
  { name: "Medium", value: 45, color: "#F59E0B" },
  { name: "Hard", value: 20, color: "#EF4444" },
]

const learningPatterns = [
  { time: "6 AM", sessions: 2 },
  { time: "9 AM", sessions: 8 },
  { time: "12 PM", sessions: 5 },
  { time: "3 PM", sessions: 12 },
  { time: "6 PM", sessions: 15 },
  { time: "9 PM", sessions: 10 },
  { time: "12 AM", sessions: 3 },
]

const skillRadarData = [
  { skill: "Problem Solving", current: 85, target: 90 },
  { skill: "Critical Thinking", current: 78, target: 85 },
  { skill: "Data Analysis", current: 92, target: 95 },
  { skill: "Mathematical Reasoning", current: 75, target: 80 },
  { skill: "Pattern Recognition", current: 88, target: 90 },
  { skill: "Logical Reasoning", current: 82, target: 85 },
]

const weeklyGoals = [
  { goal: "Complete 5 assessments", progress: 80, current: 4, target: 5 },
  { goal: "Study 10 hours", progress: 70, current: 7, target: 10 },
  { goal: "Upload 2 documents", progress: 100, current: 2, target: 2 },
  { goal: "Achieve 85% average", progress: 95, current: 87, target: 85 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

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
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">45h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">15</div>
              <p className="text-xs text-muted-foreground">Completed this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Your learning progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#3B82F6" name="Average Score %" />
                      <Line type="monotone" dataKey="studyTime" stroke="#10B981" name="Study Hours" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Study Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Patterns</CardTitle>
                  <CardDescription>When you're most active</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={learningPatterns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Difficulty Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Question Difficulty</CardTitle>
                  <CardDescription>Distribution of question types you've tackled</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={difficultyDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {difficultyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skills Radar */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Assessment</CardTitle>
                  <CardDescription>Current vs target skill levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Current" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      <Radar name="Target" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Performance Metrics</CardTitle>
                    <CardDescription>Comprehensive view of your learning analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#3B82F6" name="Average Score" />
                        <Bar dataKey="assessments" fill="#10B981" name="Assessments Completed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Excellent Progress</p>
                      <p className="text-xs text-green-700">Your scores have improved by 27% over 6 months</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Consistent Learning</p>
                      <p className="text-xs text-blue-700">You maintain a regular study schedule</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-900">Peak Performance</p>
                      <p className="text-xs text-purple-700">Best performance between 3-6 PM</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">Perfect Score</p>
                        <p className="text-xs text-gray-600">Achieved 100% on 3 assessments</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Goal Crusher</p>
                        <p className="text-xs text-gray-600">Exceeded monthly targets</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Quick Learner</p>
                        <p className="text-xs text-gray-600">Mastered 5 new topics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Detailed breakdown by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{subject.subject}</h3>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={
                              subject.score >= 90 ? "default" : subject.score >= 80 ? "secondary" : "destructive"
                            }
                          >
                            {subject.score}%
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{subject.assessments}</p>
                          <p className="text-xs text-gray-600">Assessments</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{subject.timeSpent}h</p>
                          <p className="text-xs text-gray-600">Study Time</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">
                            {Math.round((subject.timeSpent / subject.assessments) * 10) / 10}h
                          </p>
                          <p className="text-xs text-gray-600">Avg per Test</p>
                        </div>
                      </div>

                      <Progress value={subject.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                  <CardDescription>Track your progress towards weekly targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyGoals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">{goal.goal}</p>
                          <span className="text-sm text-gray-600">
                            {goal.current}/{goal.target}
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        <p className="text-xs text-gray-600">{goal.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Goal History</CardTitle>
                  <CardDescription>Your goal achievement over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-900">Last Week</p>
                        <p className="text-xs text-green-700">4/4 goals achieved</p>
                      </div>
                      <Badge variant="default">100%</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-blue-900">2 Weeks Ago</p>
                        <p className="text-xs text-blue-700">3/4 goals achieved</p>
                      </div>
                      <Badge variant="secondary">75%</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-yellow-900">3 Weeks Ago</p>
                        <p className="text-xs text-yellow-700">2/4 goals achieved</p>
                      </div>
                      <Badge variant="secondary">50%</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-900">4 Weeks Ago</p>
                        <p className="text-xs text-green-700">4/4 goals achieved</p>
                      </div>
                      <Badge variant="default">100%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Set New Goals</CardTitle>
                <CardDescription>Define your learning objectives for next week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-16 flex-col gap-2">
                    <Target className="h-5 w-5" />
                    Assessment Goals
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
                    <Clock className="h-5 w-5" />
                    Study Time Goals
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
                    <Brain className="h-5 w-5" />
                    Skill Goals
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
                    <Calendar className="h-5 w-5" />
                    Custom Goals
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
