import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, BarChart3, Target, Upload, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AdaptiveLearn</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 text-balance">
            Intelligent Learning That Adapts to <span className="text-blue-600">You</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-pretty">
            Transform your study experience with AI-powered content processing, personalized assessments, and adaptive
            learning paths that evolve with your progress.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h3>
          <p className="text-lg text-gray-600">Comprehensive tools designed to enhance your learning journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Upload className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Smart Document Processing</CardTitle>
              <CardDescription>
                Upload PDFs and text files to automatically generate study materials and assessments
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Adaptive Assessments</CardTitle>
              <CardDescription>
                AI-generated quizzes that adjust difficulty based on your performance and learning style
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Detailed insights into your learning patterns, strengths, and areas for improvement
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>
                Smart study suggestions based on your progress, goals, and learning preferences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Interactive Learning</CardTitle>
              <CardDescription>
                Engaging study sessions with multiple question formats and instant feedback
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-teal-600 mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your learning journey with detailed progress reports and milestone tracking
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who are already learning smarter, not harder.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6" />
            <span className="text-lg font-semibold">AdaptiveLearn</span>
          </div>
          <p className="text-gray-400">Intelligent learning platform powered by AI</p>
        </div>
      </footer>
    </div>
  )
}
