import { type NextRequest, NextResponse } from "next/server"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer" | "fill-blank"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  topic: string
}

export async function POST(request: NextRequest) {
  try {
    const { documentId, questionCount = 10, difficulty = "mixed", topics = [] } = await request.json()

    if (!documentId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
    }

    // In a real implementation, you would fetch the document content from database
    // For now, we'll simulate document-based question generation
    const documentTopics =
      topics.length > 0
        ? topics
        : ["Neural Networks", "Supervised Learning", "Deep Learning", "Classification", "Regression"]

    const questions = generateQuestions(documentTopics, questionCount, difficulty)

    const assessment = {
      id: `assessment_${Date.now()}`,
      documentId,
      title: `Assessment: ${documentTopics.slice(0, 2).join(" & ")}`,
      description: `Adaptive assessment covering key concepts in ${documentTopics.join(", ")}`,
      questions,
      timeLimit: Math.max(questionCount * 2, 10), // 2 minutes per question, minimum 10 minutes
      createdAt: new Date().toISOString(),
      difficulty,
      totalQuestions: questions.length,
    }

    return NextResponse.json({
      success: true,
      assessment,
    })
  } catch (error) {
    console.error("Assessment generation error:", error)
    return NextResponse.json({ error: "Failed to generate assessment" }, { status: 500 })
  }
}

function generateQuestions(topics: string[], count: number, difficulty: string): Question[] {
  const questions: Question[] = []
  const questionTypes: Question["type"][] = ["multiple-choice", "true-false", "short-answer", "fill-blank"]

  // Question templates for different topics
  const questionTemplates = {
    "Neural Networks": {
      "multiple-choice": [
        {
          question: "What is the primary function of an activation function in a neural network?",
          options: [
            "To introduce non-linearity into the model",
            "To reduce the learning rate",
            "To increase the number of parameters",
            "To normalize the input data",
          ],
          correctAnswer: 0,
          explanation:
            "Activation functions introduce non-linearity, allowing neural networks to learn complex patterns.",
          difficulty: "medium" as const,
        },
        {
          question: "Which of the following is NOT a common activation function?",
          options: ["ReLU", "Sigmoid", "Tanh", "Linear Regression"],
          correctAnswer: 3,
          explanation: "Linear Regression is a machine learning algorithm, not an activation function.",
          difficulty: "easy" as const,
        },
      ],
      "true-false": [
        {
          question: "Backpropagation is used to update weights in neural networks.",
          correctAnswer: "true",
          explanation: "Backpropagation calculates gradients and updates weights to minimize loss.",
          difficulty: "easy" as const,
        },
      ],
      "short-answer": [
        {
          question: "Explain the vanishing gradient problem in deep neural networks.",
          correctAnswer:
            "The vanishing gradient problem occurs when gradients become exponentially small as they propagate back through many layers, making it difficult to train deep networks effectively.",
          explanation:
            "This problem is addressed through techniques like skip connections, better initialization, and normalization.",
          difficulty: "hard" as const,
        },
      ],
    },
    "Supervised Learning": {
      "multiple-choice": [
        {
          question: "What is the main characteristic of supervised learning?",
          options: [
            "Learning without labeled data",
            "Learning with input-output pairs",
            "Learning through trial and error",
            "Learning without any data",
          ],
          correctAnswer: 1,
          explanation: "Supervised learning uses labeled training data with known input-output pairs.",
          difficulty: "easy" as const,
        },
      ],
      "fill-blank": [
        {
          question:
            "In supervised learning, the algorithm learns from _____ data to make predictions on new, unseen data.",
          correctAnswer: "labeled",
          explanation: "Labeled data provides the correct answers that the algorithm learns from.",
          difficulty: "easy" as const,
        },
      ],
    },
  }

  // Generate questions based on available topics and templates
  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length]
    const questionType = questionTypes[i % questionTypes.length]

    const topicTemplates = questionTemplates[topic as keyof typeof questionTemplates]
    if (topicTemplates && topicTemplates[questionType]) {
      const templates = topicTemplates[questionType]
      const template = templates[Math.floor(Math.random() * templates.length)]

      questions.push({
        id: `q_${i + 1}`,
        type: questionType,
        topic,
        ...template,
      })
    } else {
      // Fallback generic question
      questions.push(generateGenericQuestion(i + 1, topic, questionType, difficulty))
    }
  }

  return questions
}

function generateGenericQuestion(id: number, topic: string, type: Question["type"], difficulty: string): Question {
  const difficultyLevel =
    difficulty === "mixed"
      ? (["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as Question["difficulty"])
      : (difficulty as Question["difficulty"])

  switch (type) {
    case "multiple-choice":
      return {
        id: `q_${id}`,
        type,
        question: `Which of the following best describes ${topic}?`,
        options: [
          `${topic} is a fundamental concept in machine learning`,
          `${topic} is only used in deep learning`,
          `${topic} is not relevant to AI`,
          `${topic} is a programming language`,
        ],
        correctAnswer: 0,
        explanation: `${topic} is indeed a fundamental concept with wide applications in machine learning.`,
        difficulty: difficultyLevel,
        topic,
      }

    case "true-false":
      return {
        id: `q_${id}`,
        type,
        question: `${topic} is an important concept in machine learning.`,
        correctAnswer: "true",
        explanation: `${topic} plays a significant role in various machine learning applications.`,
        difficulty: difficultyLevel,
        topic,
      }

    case "short-answer":
      return {
        id: `q_${id}`,
        type,
        question: `Briefly explain what ${topic} means in the context of machine learning.`,
        correctAnswer: `${topic} is a key concept that involves specific techniques and applications in machine learning systems.`,
        explanation: `This answer demonstrates understanding of ${topic} and its relevance to machine learning.`,
        difficulty: difficultyLevel,
        topic,
      }

    case "fill-blank":
      return {
        id: `q_${id}`,
        type,
        question: `_____ is a crucial component in modern machine learning systems.`,
        correctAnswer: topic,
        explanation: `${topic} is indeed crucial for effective machine learning implementations.`,
        difficulty: difficultyLevel,
        topic,
      }

    default:
      return generateGenericQuestion(id, topic, "multiple-choice", difficulty)
  }
}
