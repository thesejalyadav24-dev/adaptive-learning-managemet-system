"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  ArrowLeft,
  Target,
  BookOpen,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  X,
  Lightbulb,
  Zap,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Recommendation {
  id: string
  type: "review" | "practice" | "advance" | "focus" | "break"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  subject: string
  estimatedTime: number
  difficulty: "easy" | "medium" | "hard"
  actionUrl: string
  reasoning: string
  topics: string[]
}

const typeIcons = {
  review: RefreshCw,
  practice: Target,
  advance: TrendingUp,
  focus: Zap,
  break: Clock,
}

const typeColors = {
  review: "bg-blue-50 text-blue-700 border-blue-200",
  practice: "bg-green-50 text-green-700 border-green-200",
  advance: "bg-purple-50 text-purple-700 border-purple-200",
  focus: "bg-orange-50 text-orange-700 border-orange-200",
  break: "bg-gray-50 text-gray-700 border-gray-200",
}

const priorityColors = {
  high: "border-red-200 bg-red-50",
  medium: "border-yellow-200 bg-yellow-50",
  low: "border-green-200 bg-green-50",
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/api/recommendations?limit=12")
      const result = await response.json()

      if (result.success) {
        setRecommendations(result.recommendations)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
      toast({
        title: "Error",
        description: "Failed to load recommendations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRecommendationAction = async (recommendationId: string, action: string) => {
    try {
      await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recommendationId,
          action,
          userId: "default",
        }),
      })

      if (action === "dismissed") {
        setDismissedIds((prev) => new Set([...prev, recommendationId]))
      }

      toast({
        title: action === "accepted" ? "Great choice!" : "Recommendation dismissed",
        description:
          action === "accepted"
            ? "This will help improve your learning outcomes."
            : "We'll adjust future recommendations based on your feedback.",
      })
    } catch (error) {
      console.error("Failed to record interaction:", error)
    }
  }

  const filteredRecommendations = recommendations.filter((rec) => !dismissedIds.has(rec.id))

  const groupedRecommendations = {
    high: filteredRecommendations.filter((r) => r.priority === "high"),
    medium: filteredRecommendations.filter((r) => r.priority === "medium"),
    low: filteredRecommendations.filter((r) => r.priority === "low"),
  }

  const recommendationsByType = {
    focus: filteredRecommendations.filter((r) => r.type === "focus"),
    review: filteredRecommendations.filter((r) => r.type === "review"),
    practice: filteredRecommendations.filter((r) => r.type === "practice"),
    advance: filteredRecommendations.filter((r) => r.type === "advance"),
    break: filteredRecommendations.filter((r) => r.type === "break"),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg font-medium">Generating personalized recommendations...</p>
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
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Study Recommendations</h1>
              </div>
            </div>
            <Button onClick={fetchRecommendations} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recommendations</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredRecommendations.length}</div>
              <p className="text-xs text-muted-foreground">Personalized for you</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{groupedRecommendations.high.length}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(filteredRecommendations.reduce((sum, r) => sum + r.estimatedTime, 0) / 60)}h
              </div>
              <p className="text-xs text-muted-foreground">Total study time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {new Set(filteredRecommendations.map((r) => r.subject)).size}
              </div>
              <p className="text-xs text-muted-foreground">Areas to improve</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="priority" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="priority">By Priority</TabsTrigger>
            <TabsTrigger value="type">By Type</TabsTrigger>
            <TabsTrigger value="subject">By Subject</TabsTrigger>
          </TabsList>

          <TabsContent value="priority" className="space-y-6">
            {/* High Priority */}
            {groupedRecommendations.high.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-red-500" />
                  High Priority
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {groupedRecommendations.high.map((rec) => (
                    <RecommendationCard key={rec.id} recommendation={rec} onAction={handleRecommendationAction} />
                  ))}
                </div>
              </div>
            )}

            {/* Medium Priority */}
            {groupedRecommendations.medium.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  Medium Priority
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {groupedRecommendations.medium.map((rec) => (
                    <RecommendationCard key={rec.id} recommendation={rec} onAction={handleRecommendationAction} />
                  ))}
                </div>
              </div>
            )}

            {/* Low Priority */}
            {groupedRecommendations.low.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Low Priority
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {groupedRecommendations.low.map((rec) => (
                    <RecommendationCard key={rec.id} recommendation={rec} onAction={handleRecommendationAction} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="type" className="space-y-6">
            {Object.entries(recommendationsByType).map(([type, recs]) => {
              if (recs.length === 0) return null
              const Icon = typeIcons[type as keyof typeof typeIcons]
              return (
                <div key={type}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 capitalize">
                    <Icon className="h-5 w-5" />
                    {type} Recommendations
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recs.map((rec) => (
                      <RecommendationCard key={rec.id} recommendation={rec} onAction={handleRecommendationAction} />
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="subject" className="space-y-6">
            {Array.from(new Set(filteredRecommendations.map((r) => r.subject))).map((subject) => {
              const subjectRecs = filteredRecommendations.filter((r) => r.subject === subject)
              return (
                <div key={subject}>
                  <h2 className="text-xl font-semibold mb-4">{subject}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {subjectRecs.map((rec) => (
                      <RecommendationCard key={rec.id} recommendation={rec} onAction={handleRecommendationAction} />
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function RecommendationCard({
  recommendation,
  onAction,
}: {
  recommendation: Recommendation
  onAction: (id: string, action: string) => void
}) {
  const Icon = typeIcons[recommendation.type]
  const typeColorClass = typeColors[recommendation.type]
  const priorityColorClass = priorityColors[recommendation.priority]

  return (
    <Card className={`${priorityColorClass} border-l-4`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${typeColorClass}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {recommendation.priority} priority
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {recommendation.estimatedTime}min
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction(recommendation.id, "dismissed")}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="mt-2">{recommendation.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {recommendation.topics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>

          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <strong>Why this recommendation:</strong> {recommendation.reasoning}
          </div>

          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href={recommendation.actionUrl} onClick={() => onAction(recommendation.id, "accepted")}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Now
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => onAction(recommendation.id, "dismissed")}
              className="bg-transparent"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
