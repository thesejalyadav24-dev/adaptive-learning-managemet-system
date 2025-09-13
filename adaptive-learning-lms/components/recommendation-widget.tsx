"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ArrowRight, X } from "lucide-react"
import Link from "next/link"

interface Recommendation {
  id: string
  type: "review" | "practice" | "advance" | "focus" | "break"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  subject: string
  estimatedTime: number
  actionUrl: string
}

export function RecommendationWidget({ limit = 3 }: { limit?: number }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`/api/recommendations?limit=${limit + 2}`) // Get extra in case some are dismissed
      const result = await response.json()

      if (result.success) {
        setRecommendations(result.recommendations.slice(0, limit))
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDismiss = async (recommendationId: string) => {
    setDismissedIds((prev) => new Set([...prev, recommendationId]))

    try {
      await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recommendationId,
          action: "dismissed",
          userId: "default",
        }),
      })
    } catch (error) {
      console.error("Failed to record dismissal:", error)
    }
  }

  const visibleRecommendations = recommendations.filter((rec) => !dismissedIds.has(rec.id)).slice(0, limit)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Study Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (visibleRecommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Study Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">No new recommendations at this time. Keep up the great work!</p>
          <Button className="mt-3 bg-transparent" variant="outline" asChild>
            <Link href="/recommendations">View All Recommendations</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Study Recommendations
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/recommendations">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <CardDescription>Personalized suggestions to improve your learning</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleRecommendations.map((rec) => (
            <div key={rec.id} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{rec.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDismiss(rec.id)} className="text-gray-400">
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {rec.priority}
                  </Badge>
                  <span className="text-xs text-gray-500">{rec.estimatedTime}min</span>
                </div>
                <Button size="sm" asChild>
                  <Link href={rec.actionUrl}>Start</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
