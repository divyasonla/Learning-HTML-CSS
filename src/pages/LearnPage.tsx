import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Code, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProgress } from '@/contexts/ProgressContext';
import { getTopicById, allTopics } from '@/data/topicStructure';
import { getGeminiTopicDetails } from '@/services/gemini';
import LiveCodeEditor from '@/components/LiveCodeEditor';
import TopicQuiz from '@/components/TopicQuiz';
import AIChatbot from '@/components/AIChatbot';

const LearnPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { progress, completeTopicLesson } = useProgress();
  const [activeTab, setActiveTab] = useState('learn');
  
  const topic = getTopicById(topicId || '');
  const [aiDetails, setAiDetails] = useState<string>('');
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch AI details when topic changes
  useEffect(() => {
    if (!topic) return;
    setLoadingDetails(true);
    getGeminiTopicDetails(topic.name)
      .then((text) => setAiDetails(text))
      .catch(() => setAiDetails('AI se details laane me error aayi.'))
      .finally(() => setLoadingDetails(false));
  }, [topicId]);
  
  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const topicProgress = progress.topicProgress[topic.id];
  const isCompleted = topicProgress?.status === 'completed';
  
  // Find next topic
  const currentIndex = allTopics.findIndex(t => t.id === topic.id);
  const nextTopic = allTopics[currentIndex + 1];
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;

  const handleMarkComplete = () => {
    completeTopicLesson(topic.id);
  };

  // Get example code based on topic
  const getExampleCode = () => {
    if (topic.category === 'html') {
      return {
        html: `<!DOCTYPE html>
<html>
<head>
  <title>${topic.name} Example</title>
</head>
<body>
  <!-- ${topic.name} Example -->
  <h1>Learning ${topic.name}</h1>
  <p>This demonstrates ${topic.subtopics[0]}</p>
  
  <section>
    <h2>Key Concepts</h2>
    <ul>
      ${topic.subtopics.map(s => `<li>${s}</li>`).join('\n      ')}
    </ul>
  </section>
</body>
</html>`,
        css: `body {
  font-family: 'Segoe UI', Arial, sans-serif;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  min-height: 100vh;
  color: #333;
}

h1 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

ul {
  line-height: 1.8;
}`
      };
    } else {
      return {
        html: `<!DOCTYPE html>
<html>
<head>
  <title>${topic.name} CSS Demo</title>
</head>
<body>
  <div class="container">
    <h1>${topic.name}</h1>
    <p class="description">Explore ${topic.subtopics[0]}</p>
    
    <div class="demo-box">
      <p>Style this element!</p>
    </div>
  </div>
</body>
</html>`,
        css: `/* ${topic.name} CSS Example */
body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', sans-serif;
}

.container {
  text-align: center;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.description {
  opacity: 0.9;
  margin-bottom: 2rem;
}

.demo-box {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 2rem 3rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.3);
  transition: transform 0.3s ease;
}

.demo-box:hover {
  transform: scale(1.05);
}`
      };
    }
  };

  const exampleCode = getExampleCode();

  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/topics/${topic.category}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${topic.color}20` }}
              >
                {topic.icon}
              </div>
              <div>
                <h1 className="font-display text-xl font-bold">{topic.name}</h1>
                <p className="text-sm text-muted-foreground capitalize">{topic.category} • {topic.level}</p>
              </div>
            </div>
          </div>
          
          {isCompleted ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Completed</span>
            </div>
          ) : (
            <Button onClick={handleMarkComplete} className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="learn" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <Code className="w-4 h-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              ❓ Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="card-playful p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">What is {topic.name}?</h2>
                {/* AI Details Section */}
                <div className="mb-6">
                  {loadingDetails ? (
                    <div className="text-muted-foreground">
                      <span role="img" aria-label="thinking">🤔</span> AI soch raha hai...<br/>
                      <b>5 mins for thinking</b> <br/>
                      Please wait while we fetch the best details for you!
                    </div>
                  ) : (
                    <div className="text-muted-foreground whitespace-pre-line">
                      {(() => {
                        // Split lines and only show the first half (rounded up)
                        const lines = aiDetails.split('\n');
                        const maxLines = Math.ceil(lines.length / 2);
                        let exampleCount = 0;
                        let insideExample = false;
                        return lines.slice(0, maxLines).map((line, idx) => {
                          // Replace **bold** with <b>...</b> for better UI rendering
                          let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

                          // Heading: Markdown style (##, ###, etc.) or all caps
                          if (/^#+\s/.test(processedLine)) {
                            return <div key={idx} className="text-xl font-bold mt-4 mb-2">{processedLine.replace(/^#+\s/, '')}</div>;
                          }
                          if (/^Example:/i.test(processedLine)) {
                            if (exampleCount >= 2) return null;
                            exampleCount++;
                            insideExample = true;
                            // Use <b> for bold example
                            return <div key={idx} className="font-bold mt-2"><b>{processedLine}</b></div>;
                          }
                          // HTML code block (```html ... ```)
                          if (processedLine.trim().startsWith('```html')) {
                            if (exampleCount > 2) return null;
                            // Start of HTML code block
                            const codeLines = [];
                            let i = idx + 1;
                            while (i < lines.length && !lines[i].startsWith('```')) {
                              codeLines.push(lines[i]);
                              i++;
                            }
                            return (
                              <pre key={idx} className="bg-green-100 text-green-700 rounded p-2 my-2 overflow-x-auto">
                                <code>{codeLines.join('\n')}</code>
                              </pre>
                            );
                          }
                          // CSS code block (```css ... ```)
                          if (processedLine.trim().startsWith('```css')) {
                            if (exampleCount > 2) return null;
                            // Start of CSS code block
                            const codeLines = [];
                            let i = idx + 1;
                            while (i < lines.length && !lines[i].startsWith('```')) {
                              codeLines.push(lines[i]);
                              i++;
                            }
                            return (
                              <pre key={idx} className="bg-blue-100 text-blue-700 rounded p-2 my-2 overflow-x-auto">
                                <code>{codeLines.join('\n')}</code>
                              </pre>
                            );
                          }
                          // Inline <html> or <body> code (for single-line code)
                          if ((processedLine.trim().startsWith('<') && processedLine.trim().endsWith('>')) || /<\/?[a-zA-Z]+.*>/.test(processedLine)) {
                            if (insideExample && exampleCount > 2) return null;
                            return <code key={idx} className="text-green-700 bg-green-100 rounded px-1">{processedLine}</code>;
                          }
                          // Inline CSS code (e.g., body { ... })
                          if (/^[a-zA-Z0-9\.#\[\]:_-]+\s*\{[^}]*\}$/.test(processedLine.trim())) {
                            return <code key={idx} className="text-blue-700 bg-blue-100 rounded px-1">{processedLine}</code>;
                          }
                          // Old style: treat lines in ALL CAPS as headings
                          if (processedLine.trim() && processedLine === processedLine.toUpperCase() && /[A-Z]/.test(processedLine)) {
                            return <div key={idx} className="text-xl font-bold mt-4 mb-2">{processedLine}</div>;
                          }
                          insideExample = false;
                          // Render with dangerouslySetInnerHTML to support <b>
                          return <div key={idx} dangerouslySetInnerHTML={{ __html: processedLine }} />;
                        });
                      })()}
                    </div>
                  )}
                </div>
                {/* Old manual data (commented for reference) */}
                {/*
                <h3 className="text-xl font-semibold mb-3">Key Concepts</h3>
                {topic.content?.keyConcepts && topic.content.keyConcepts.length > 0 ? (
                  <div className="space-y-6 mb-6">
                    {topic.content.keyConcepts.map((concept, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            <span className="font-semibold">{concept.title}:</span> {concept.explanation}
                          </span>
                        </div>
                        {topic.content.examples && topic.content.examples[i] && (
                          <div className="bg-muted/30 rounded-lg p-4 mt-2">
                            <div className="font-semibold mb-1">Example: {topic.content.examples[i].title}</div>
                            <pre className="bg-background p-2 rounded mb-2 overflow-x-auto"><code>{topic.content.examples[i].html}</code></pre>
                            {topic.content.examples[i].css && (
                              <pre className="bg-background p-2 rounded mb-2 overflow-x-auto"><code>{topic.content.examples[i].css}</code></pre>
                            )}
                            <div className="text-sm text-muted-foreground">{topic.content.examples[i].explanation}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2 mb-6">
                    {topic.subtopics.map((subtopic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{subtopic}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {topic.content?.proTip && (
                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      {topic.content.proTip}
                    </p>
                  </div>
                )}
                */}
              </div>

              {/* Live Code Editor in Learn Tab */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
                <LiveCodeEditor 
                  initialHtml={exampleCode.html}
                  initialCss={exampleCode.css}
                  height="350px"
                />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="practice">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Practice: {topic.name}</h2>
                <p className="text-muted-foreground">
                  Experiment with the code below. Try modifying the HTML and CSS to see changes in real-time!
                </p>
              </div>
              <LiveCodeEditor 
                initialHtml={exampleCode.html}
                initialCss={exampleCode.css}
                height="450px"
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="quiz">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Quiz: {topic.name}</h2>
                <p className="text-muted-foreground">
                  Test your knowledge with AI-generated questions about {topic.name.toLowerCase()}.
                </p>
              </div>
              <TopicQuiz
                topicName={topic.name}
                topicCategory={topic.category}
                subtopics={topic.subtopics}
                onComplete={(score, total) => {
                  if (score >= total * 0.8) {
                    completeTopicLesson(topic.id);
                  }
                }}
              />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-8 border-t">
          {prevTopic ? (
            <Link to={`/learn/${prevTopic.id}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {prevTopic.name}
              </Button>
            </Link>
          ) : <div />}
          
          {nextTopic ? (
            <Link to={`/learn/${nextTopic.id}`}>
              <Button className="gap-2">
                {nextTopic.name}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <Button className="gap-2">
                Back to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </main>
      
      <aside>
        <div className="flex-1 overflow-y-auto p-4">
              <AIChatbot />
        </div>
      </aside>
    </div>
  );
};

export default LearnPage;
