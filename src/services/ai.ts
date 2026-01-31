import { Topic, TopicContent, PracticeChallenge, MiniProject, QuizQuestion, ChatMessage } from '@/types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

const callGemini = async (prompt: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data: GeminiResponse = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text || '';
};

const parseJSON = <T>(text: string): T => {
  // Extract JSON from markdown code blocks if present
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim();
  return JSON.parse(jsonStr);
};

export const generateTopicContent = async (topic: Topic): Promise<TopicContent> => {
  const prompt = `You are an expert web development teacher. Generate comprehensive learning content for the ${topic.category.toUpperCase()} topic: "${topic.name}".

The content should be beginner-friendly with clear explanations and practical examples.

Return ONLY a valid JSON object with this exact structure:
{
  "definition": "A simple, clear definition of the topic in 2-3 sentences",
  "importance": "Why this topic matters and real-world usage examples in 2-3 sentences",
  "syntax": "Explanation of the syntax with a simple code example",
  "examples": [
    {
      "title": "Example title",
      "html": "HTML code here",
      "css": "CSS code here (if applicable)",
      "explanation": "What this example demonstrates"
    }
  ],
  "commonMistakes": ["Mistake 1", "Mistake 2", "Mistake 3"],
  "bestPractices": ["Practice 1", "Practice 2", "Practice 3"]
}

Include 2-3 code examples. For HTML topics, CSS can be minimal or empty. For CSS topics, include relevant HTML.`;

  const response = await callGemini(prompt);
  return parseJSON<TopicContent>(response);
};

export const generatePracticeChallenge = async (topic: Topic): Promise<PracticeChallenge> => {
  const prompt = `Create a hands-on coding practice challenge for the ${topic.category.toUpperCase()} topic: "${topic.name}".

The challenge should be appropriate for ${topic.level} level learners and focus on the subtopics: ${topic.subtopics.join(', ')}.

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Challenge title",
  "description": "Clear description of what the student needs to build",
  "starterHtml": "<!DOCTYPE html>\\n<html>\\n<head>\\n  <title>Practice</title>\\n</head>\\n<body>\\n  <!-- Add your code here -->\\n</body>\\n</html>",
  "starterCss": "/* Add your styles here */",
  "requirements": ["Requirement 1", "Requirement 2", "Requirement 3"],
  "hints": ["Hint 1", "Hint 2"],
  "solution": {
    "html": "Complete HTML solution",
    "css": "Complete CSS solution"
  }
}`;

  const response = await callGemini(prompt);
  return parseJSON<PracticeChallenge>(response);
};

export const generateMiniProject = async (topic: Topic): Promise<MiniProject> => {
  const prompt = `Create a mini project for the ${topic.category.toUpperCase()} topic: "${topic.name}".

This project should help students apply what they learned. It should be completable in 15-20 minutes.

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Project title",
  "objective": "What the student will build and learn",
  "requirements": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "layoutDescription": "Description of the expected UI layout",
  "conceptsTested": ["Concept 1", "Concept 2", "Concept 3"],
  "starterCode": {
    "html": "<!DOCTYPE html>\\n<html>\\n<head>\\n  <title>Mini Project</title>\\n  <link rel=\\"stylesheet\\" href=\\"style.css\\">\\n</head>\\n<body>\\n  <!-- Build your project here -->\\n</body>\\n</html>",
    "css": "/* Style your project here */"
  }
}`;

  const response = await callGemini(prompt);
  return parseJSON<MiniProject>(response);
};

export const generateQuizQuestions = async (topic: Topic): Promise<QuizQuestion[]> => {
  const prompt = `Create a quiz for the ${topic.category.toUpperCase()} topic: "${topic.name}".

Generate 8 multiple-choice questions testing understanding of: ${topic.subtopics.join(', ')}.
Questions should range from basic recall to application-level.

Return ONLY a valid JSON array with this exact structure:
[
  {
    "id": "q1",
    "question": "The question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Why this answer is correct"
  }
]

Make sure correctAnswer is the index (0-3) of the correct option.`;

  const response = await callGemini(prompt);
  return parseJSON<QuizQuestion[]>(response);
};

export const chatWithAI = async (
  messages: ChatMessage[],
  context: { currentTopic?: Topic; userProgress?: string }
): Promise<string> => {
  const systemContext = `You are a friendly and encouraging AI tutor helping students learn HTML and CSS. 
Your name is CodeBuddy. Be supportive, use simple language, and provide helpful examples.
${context.currentTopic ? `The student is currently learning: ${context.currentTopic.name} (${context.currentTopic.category.toUpperCase()})` : ''}
${context.userProgress ? `Student's progress: ${context.userProgress}` : ''}

When explaining code, use markdown code blocks. Keep responses concise but helpful.
If asked to debug code, explain the issue clearly and suggest fixes.`;

  const conversationHistory = messages.map(m => 
    `${m.role === 'user' ? 'Student' : 'CodeBuddy'}: ${m.content}`
  ).join('\n\n');

  const prompt = `${systemContext}\n\nConversation:\n${conversationHistory}\n\nCodeBuddy:`;
  
  return await callGemini(prompt);
};

export const validateCode = async (
  html: string,
  css: string,
  requirements: string[]
): Promise<{ passed: boolean; feedback: string }> => {
  const prompt = `Evaluate this code against the requirements:

HTML:
${html}

CSS:
${css}

Requirements:
${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Return ONLY a valid JSON object:
{
  "passed": true or false,
  "feedback": "Detailed feedback about what was done well and what needs improvement"
}`;

  const response = await callGemini(prompt);
  return parseJSON<{ passed: boolean; feedback: string }>(response);
};

export const generateRealWorldProject = async (projectType: string): Promise<{
  title: string;
  description: string;
  steps: { title: string; description: string; codeHint: string }[];
  starterCode: { html: string; css: string };
}> => {
  const prompt = `Create a detailed real-world project guide for: "${projectType}"

This should be a complete project that students can build to practice HTML and CSS.

Return ONLY a valid JSON object:
{
  "title": "Project title",
  "description": "What students will build and learn",
  "steps": [
    {
      "title": "Step title",
      "description": "What to do in this step",
      "codeHint": "Code snippet or hint"
    }
  ],
  "starterCode": {
    "html": "Starter HTML template",
    "css": "Starter CSS template"
  }
}

Include 5-7 steps that progressively build the project.`;

  const response = await callGemini(prompt);
  return parseJSON(response);
};
