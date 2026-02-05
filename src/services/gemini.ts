// Utility to fetch topic details from Gemini API
// Usage: getGeminiTopicDetails('HTML')


// Cache key helper
function getCacheKey(topic: string) {
  return `gemini_topic_details_${topic}`;
}

export async function getGeminiTopicDetails(topic: string): Promise<string> {
  // 1. Try cache (localStorage)
  const cacheKey = getCacheKey(topic);
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not found');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const body = {
    contents: [{
      parts: [{
        text: `Explain the topic "${topic}" for a complete beginner student.\n\nInclude:\n1. What is it? (simple definition)\n2. Why it is used?\n3. Where it is used in real projects?\n4. Basic syntax or structure (if coding topic)\n5. 2–3 simple examples\n6. Important points a student must remember\n\nUse very simple language.\nKeep it short and clear.\nFocus on practical learning.\nExplain as if teaching HTML/CSS to a first-time learner.\nAvoid long theory.`
      }]
    }]
  };

  // 2. Retry logic with exponential backoff for 429 errors
  let attempt = 0;
  const maxAttempts = 4;
  let delay = 1000; // start with 1s
  while (attempt < maxAttempts) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (response.status === 429) {
      // Too many requests, wait and retry
      await new Promise(res => setTimeout(res, delay));
      attempt++;
      delay *= 2; // exponential backoff
      continue;
    }
    if (!response.ok) throw new Error('Failed to fetch from Gemini API');
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No details found.';
    // Save to cache
    localStorage.setItem(cacheKey, text);
    return text;
  }
  throw new Error('Too many requests to Gemini API. Please try again later.');
}
