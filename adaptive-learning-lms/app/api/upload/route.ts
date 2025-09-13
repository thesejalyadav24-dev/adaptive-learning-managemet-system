import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const subject = formData.get("subject") as string
    const notes = formData.get("notes") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB" }, { status: 400 })
    }

    // Extract text content based on file type
    let extractedText = ""

    if (file.type === "text/plain") {
      extractedText = await file.text()
    } else if (file.type === "application/pdf") {
      // For PDF processing, we'll simulate extraction
      // In a real implementation, you'd use a library like pdf-parse
      extractedText = `[PDF Content Extracted from ${file.name}]\n\nThis is simulated PDF text extraction. In a real implementation, this would contain the actual PDF content extracted using libraries like pdf-parse or similar tools.`
    } else {
      // For Word documents, simulate extraction
      extractedText = `[Document Content Extracted from ${file.name}]\n\nThis is simulated document text extraction. In a real implementation, this would contain the actual document content extracted using appropriate libraries.`
    }

    // Process the extracted text to identify key concepts
    const keyTopics = extractKeyTopics(extractedText)
    const difficulty = assessDifficulty(extractedText)
    const wordCount = extractedText.split(" ").length

    // Generate study materials
    const studyMaterials = generateStudyMaterials(extractedText, keyTopics)

    // Return processed document data
    return NextResponse.json({
      success: true,
      document: {
        id: `doc_${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        subject: subject || "General",
        notes: notes || "",
        extractedText: extractedText.substring(0, 500) + "...", // Truncate for response
        keyTopics,
        difficulty,
        wordCount,
        studyMaterials,
        processedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Upload processing error:", error)
    return NextResponse.json({ error: "Failed to process document" }, { status: 500 })
  }
}

function extractKeyTopics(text: string): string[] {
  // Simple keyword extraction - in a real implementation, use NLP libraries
  const commonWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
  ])

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !commonWords.has(word))

  const wordFreq = words.reduce(
    (acc, word) => {
      acc[word] = (acc[word] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1))
}

function assessDifficulty(text: string): "Beginner" | "Intermediate" | "Advanced" {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const avgWordsPerSentence = text.split(" ").length / sentences.length

  if (avgWordsPerSentence < 15) return "Beginner"
  if (avgWordsPerSentence < 25) return "Intermediate"
  return "Advanced"
}

function generateStudyMaterials(text: string, topics: string[]) {
  return {
    summary: `This document covers key concepts including: ${topics.slice(0, 3).join(", ")}. The material provides comprehensive coverage of the subject matter with practical examples and theoretical foundations.`,
    keyPoints: topics.slice(0, 5).map((topic) => `Understanding ${topic} and its applications`),
    suggestedQuestions: [
      `What are the main principles of ${topics[0] || "the subject"}?`,
      `How does ${topics[1] || "this concept"} relate to practical applications?`,
      `What are the key differences between ${topics[0] || "concept A"} and ${topics[1] || "concept B"}?`,
    ],
  }
}
