"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Target, Brain } from "lucide-react"

interface AnalyticsWidgetProps {
  title: string
  value: string | number
  change?: string
  icon: "trending" | "clock" | "target" | "brain"
  color?: "blue" | "green" | "purple" | "orange"
}

const iconMap = {
  trending: TrendingUp,
  clock: Clock,
  target: Target,
  brain: Brain,
}

const colorMap = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
}

export function AnalyticsWidget({ title, value, change, icon, color = "blue" }: AnalyticsWidgetProps) {
  const Icon = iconMap[icon]
  const colorClass = colorMap[color]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-muted-foreground`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
        {change && <p className="text-xs text-muted-foreground">{change}</p>}
      </CardContent>
    </Card>
  )
}

interface ProgressWidgetProps {
  title: string
  description: string
  progress: number
  current: number
  target: number
}

export function ProgressWidget({ title, description, progress, current, target }: ProgressWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {current}/{target}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-600">{progress}% complete</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface InsightWidgetProps {
  type: "strength" | "improvement" | "recommendation"
  title: string
  description: string
}

export function InsightWidget({ type, title, description }: InsightWidgetProps) {
  const bgColor = type === "strength" ? "bg-green-50" : type === "improvement" ? "bg-orange-50" : "bg-blue-50"
  const textColor =
    type === "strength" ? "text-green-900" : type === "improvement" ? "text-orange-900" : "text-blue-900"
  const descColor =
    type === "strength" ? "text-green-700" : type === "improvement" ? "text-orange-700" : "text-blue-700"

  return (
    <div className={`p-3 ${bgColor} rounded-lg`}>
      <p className={`text-sm font-medium ${textColor}`}>{title}</p>
      <p className={`text-xs ${descColor}`}>{description}</p>
    </div>
  )
}
