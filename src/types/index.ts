// Core Types for the Learning Platform

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  loginType: 'email' | 'google';
  createdAt: Date;
  lastLogin: Date;
  streak: number;
}

export interface Topic {
  id: string;
  name: string;
  category: 'html' | 'css';
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  icon: string;
  color: string;
  subtopics: string[];
  prerequisites: string[];
  content?: TopicContent; // Detailed AI-generated content for the topic
}

export interface TopicProgress {
  topicId: string;
  status: 'locked' | 'unlocked' | 'completed';
  practiceCompleted: boolean;
  projectCompleted: boolean;
  quizScore: number | null;
  quizAttempts: number;
  lastUpdated: Date;
}

export interface TopicContent {
  definition: string;
  importance: string;
  keyConcepts?: Array<{
    title: string;
    explanation: string;
  }>;
  proTip?: string;
  syntax: string;
  examples: CodeExample[];
  commonMistakes: string[];
  bestPractices: string[];
}

export interface CodeExample {
  title: string;
  html: string;
  css: string;
  explanation: string;
}

export interface PracticeChallenge {
  title: string;
  description: string;
  starterHtml: string;
  starterCss: string;
  requirements: string[];
  hints: string[];
  solution: {
    html: string;
    css: string;
  };
}

export interface MiniProject {
  title: string;
  objective: string;
  requirements: string[];
  layoutDescription: string;
  conceptsTested: string[];
  starterCode: {
    html: string;
    css: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizAttempt {
  topicId: string;
  score: number;
  totalQuestions: number;
  timestamp: Date;
  answers: {
    questionId: string;
    selectedAnswer: number;
    correct: boolean;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  concepts: string[];
  steps: ProjectStep[];
}

export interface ProjectStep {
  title: string;
  description: string;
  codeHint: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ProgressState {
  htmlProgress: number;
  cssProgress: number;
  topicProgress: Record<string, TopicProgress>;
  completedProjects: string[];
}
