import { type NextRequest, NextResponse } from "next/server"

interface UserPerformance {
  subject: string
  averageScore: number
  timeSpent: number
  assessmentCount: number
  lastStudied: string
  difficulty: "easy" | "medium" | "hard"
  topics: string[]
}

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

// Mock user performance data - in a real app, this would come from database
const mockUserPerformance: UserPerformance[] = [
  {
    subject: "Machine Learning",
    averageScore: 92,
    timeSpent: 45,
    assessmentCount: 15,
    lastStudied: "2024-01-15",
    difficulty: "hard",
    topics: ["Neural Networks", "Deep Learning", "Supervised Learning"],
  },
  {
    subject: "Data Structures",
    averageScore: 75,
    timeSpent: 25,
    assessmentCount: 6,
    lastStudied: "2024-01-10",
    difficulty: "medium",
    topics: ["Binary Trees", "Hash Tables", "Graphs"],
  },
  {
    subject: "Statistics",
    averageScore: 88,
    timeSpent: 32,
    assessmentCount: 10,
    lastStudied: "2024-01-14",
    difficulty: "medium",
    topics: ["Probability", "Distributions", "Hypothesis Testing"],
  },
  {
    subject: "Linear Algebra",
    averageScore: 65,
    timeSpent: 15,
    assessmentCount: 4,
    lastStudied: "2024-01-08",
    difficulty: "easy",
    topics: ["Matrices", "Eigenvalues", "Vector Spaces"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "default"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // In a real implementation, fetch user's actual performance data
    const userPerformance = mockUserPerformance

    // Generate personalized recommendations
    const recommendations = generateRecommendations(userPerformance, limit)

    return NextResponse.json({
      success: true,
      recommendations,
      generatedAt: new Date().toISOString(),
      userId,
    })
  } catch (error) {
    console.error("Recommendations API error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

function generateRecommendations(performance: UserPerformance[], limit: number): Recommendation[] {
  const recommendations: Recommendation[] = []
  const now = new Date()

  // Sort subjects by different criteria for different recommendation types
  const lowPerformingSubjects = performance
    .filter((p) => p.averageScore < 80)
    .sort((a, b) => a.averageScore - b.averageScore)
  const staleLearning = performance.filter((p) => {
    const lastStudied = new Date(p.lastStudied)
    const daysSince = (now.getTime() - lastStudied.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince > 3
  })
  const highPerformingSubjects = performance
    .filter((p) => p.averageScore >= 85)
    .sort((a, b) => b.averageScore - a.averageScore)

  // 1. Focus recommendations for low-performing subjects
  lowPerformingSubjects.forEach((subject, index) => {
    if (recommendations.length >= limit) return

    recommendations.push({
      id: `focus_${index}`,
      type: "focus",
      priority: "high",
      title: `Focus on ${subject.subject}`,
      description: `Your ${subject.subject} score is ${subject.averageScore}%. Let's work on improving this area.`,
      subject: subject.subject,
      estimatedTime: 30,
      difficulty: subject.difficulty,
      actionUrl: `/study/focus/${subject.subject.toLowerCase().replace(" ", "-")}`,
      reasoning: `Low performance (${subject.averageScore}%) indicates need for focused practice`,
      topics: subject.topics.slice(0, 2),
    })
  })

  // 2. Review recommendations for stale subjects
  staleLearning.forEach((subject, index) => {
    if (recommendations.length >= limit) return

    const daysSince = Math.floor((now.getTime() - new Date(subject.lastStudied).getTime()) / (1000 * 60 * 60 * 24))

    recommendations.push({
      id: `review_${index}`,
      type: "review",
      priority: daysSince > 7 ? "high" : "medium",
      title: `Review ${subject.subject}`,
      description: `It's been ${daysSince} days since you studied ${subject.subject}. Time for a refresher!`,
      subject: subject.subject,
      estimatedTime: 20,
      difficulty: "easy",
      actionUrl: `/study/review/${subject.subject.toLowerCase().replace(" ", "-")}`,
      reasoning: `${daysSince} days since last study session - knowledge retention may be declining`,
      topics: subject.topics,
    })
  })

  // 3. Practice recommendations for medium-performing subjects
  const mediumPerformingSubjects = performance.filter((p) => p.averageScore >= 70 && p.averageScore < 85)
  mediumPerformingSubjects.forEach((subject, index) => {
    if (recommendations.length >= limit) return

    recommendations.push({
      id: `practice_${index}`,
      type: "practice",
      priority: "medium",
      title: `Practice ${subject.subject}`,
      description: `You're doing well in ${subject.subject} (${subject.averageScore}%). More practice will help you excel.`,
      subject: subject.subject,
      estimatedTime: 25,
      difficulty: subject.difficulty,
      actionUrl: `/assessments/generate/${subject.subject.toLowerCase().replace(" ", "-")}`,
      reasoning: `Good performance (${subject.averageScore}%) with room for improvement`,
      topics: subject.topics,
    })
  })

  // 4. Advance recommendations for high-performing subjects
  highPerformingSubjects.slice(0, 2).forEach((subject, index) => {
    if (recommendations.length >= limit) return

    recommendations.push({
      id: `advance_${index}`,
      type: "advance",
      priority: "low",
      title: `Advanced ${subject.subject}`,
      description: `Excellent work in ${subject.subject} (${subject.averageScore}%)! Ready for advanced topics?`,
      subject: subject.subject,
      estimatedTime: 40,
      difficulty: "hard",
      actionUrl: `/study/advanced/${subject.subject.toLowerCase().replace(" ", "-")}`,
      reasoning: `High performance (${subject.averageScore}%) indicates readiness for advanced concepts`,
      topics: [`Advanced ${subject.topics[0]}`, `${subject.topics[1]} Applications`],
    })
  })

  // 5. Break recommendation if user has been studying intensively
  const totalRecentStudyTime = performance.reduce((sum, p) => {
    const lastStudied = new Date(p.lastStudied)
    const daysSince = (now.getTime() - lastStudied.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince <= 1 ? sum + p.timeSpent : sum
  }, 0)

  if (totalRecentStudyTime > 3 && recommendations.length < limit) {
    recommendations.push({
      id: "break_1",
      type: "break",
      priority: "medium",
      title: "Take a Study Break",
      description: "You've been studying hard! Consider taking a short break to help consolidate your learning.",
      subject: "General",
      estimatedTime: 15,
      difficulty: "easy",
      actionUrl: "/dashboard",
      reasoning: `High recent study volume (${totalRecentStudyTime}h) - rest helps memory consolidation`,
      topics: ["Rest", "Recovery"],
    })
  }

  // Sort by priority and return limited results
  const priorityOrder = { high: 3, medium: 2, low: 1 }
  return recommendations.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]).slice(0, limit)
}

export async function POST(request: NextRequest) {
  try {
    const { action, recommendationId, userId } = await request.json()

    // Track user interaction with recommendations
    const interaction = {
      recommendationId,
      action, // 'accepted', 'dismissed', 'completed'
      userId: userId || "default",
      timestamp: new Date().toISOString(),
    }

    console.log("Recommendation interaction:", interaction)

    // In a real implementation, you would:
    // 1. Store the interaction in the database
    // 2. Update the recommendation algorithm based on user feedback
    // 3. Adjust future recommendations accordingly

    return NextResponse.json({
      success: true,
      message: "Interaction recorded successfully",
      interactionId: `interaction_${Date.now()}`,
    })
  } catch (error) {
    console.error("Recommendation interaction error:", error)
    return NextResponse.json({ error: "Failed to record interaction" }, { status: 500 })
  }
}
