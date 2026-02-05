import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Palette, BookOpen, ChevronRight, BarChart2, User, Layers, FileText, LogOut, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/LogoutButton';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';
import { htmlTopics, cssTopics } from '@/data/topicStructure';
import AIChatbot from '@/components/AIChatbot';

import { useState } from 'react';

const Dashboard = () => {
  const { progress } = useProgress();
  const [chatOpen, setChatOpen] = useState(false);

  const getNextTopic = (category: 'html' | 'css') => {
    const topics = category === 'html' ? htmlTopics : cssTopics;
    return topics.find(t => progress.topicProgress[t.id]?.status === 'unlocked');
  };

  const nextHtml = getNextTopic('html');
  const nextCss = getNextTopic('css');

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border/60 min-h-screen p-6 gap-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold gradient-text">LearnCode</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted/60 font-medium text-primary"><BarChart2 className="w-5 h-5" /> Dashboard</Link>
          <Link to="/topics/html" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted/60"><FileText className="w-5 h-5 text-html" /> HTML</Link>
          <Link to="/topics/css" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted/60"><Palette className="w-5 h-5 text-css" /> CSS</Link>
          <Link to="/topics/all" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted/60"><Layers className="w-5 h-5" /> All Topics</Link>
          <Link to="/projects" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted/60"><BookOpen className="w-5 h-5" /> Projects</Link>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted/60"><User className="w-5 h-5" /> My Progress</Link>
        </nav>
        <div className="mt-8">
          <div className="font-semibold mb-2 text-muted-foreground">Quick Stats</div>
          <div className="bg-muted rounded-xl p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm"><span>HTML Progress</span><span className="text-html font-bold">{progress.htmlProgress}/14</span></div>
            <div className="flex justify-between items-center text-sm"><span>CSS Progress</span><span className="text-css font-bold">{progress.cssProgress}/16</span></div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <LogoutButton />
        </div>
        <div className="text-xs text-muted-foreground mt-8">© 2025 LearnCode Platform</div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full flex justify-end items-center px-8 py-4 border-b bg-card/80">
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">L</div>
                <span className="hidden sm:inline">Learner</span>
              </Button>
            </Link>
            <Button variant="outline">Sign In</Button>
            <Button className="btn-playful">Get Started</Button>
          </div>
        </header>

        <main className="flex-1 px-8 py-8 bg-background">
          {/* Welcome Card */}
          <div className="w-full bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-8 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary font-semibold"><span>👋 Welcome back!</span></div>
              <h1 className="font-display text-3xl font-bold mb-2">Ready to learn something new?</h1>
              <p className="text-muted-foreground mb-4 max-w-xl">Continue your journey through HTML & CSS. Pick up where you left off or explore a new topic.</p>
              <div className="flex gap-3">
                <Link to="/topics/all">
                <Button className="btn-playful">Continue Learning</Button> </Link>
                <Link to="/topics/all">
                  <Button variant="outline">View All Topics</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 flex flex-col items-center shadow border">
              <FileText className="w-7 h-7 text-primary mb-2" />
              <div className="text-2xl font-bold">50</div>
              <div className="text-xs text-muted-foreground">Total Topics<br /><span className="font-normal">32 HTML + 32 CSS</span></div>
            </div>
            <div className="bg-card rounded-xl p-6 flex flex-col items-center shadow border">
              <BarChart2 className="w-7 h-7 text-success mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-muted-foreground">Completed<br /><span className="font-normal">Start learning today!</span></div>
            </div>
            <div className="bg-card rounded-xl p-6 flex flex-col items-center shadow border">
              <Layers className="w-7 h-7 text-accent mb-2" />
              <div className="text-2xl font-bold">200+</div>
              <div className="text-xs text-muted-foreground">Practice Questions<br /><span className="font-normal">Test your knowledge</span></div>
            </div>
            <div className="bg-card rounded-xl p-6 flex flex-col items-center shadow border">
              <BarChart2 className="w-7 h-7 text-destructive mb-2" />
              <div className="text-2xl font-bold">0%</div>
              <div className="text-xs text-muted-foreground">Quiz Score<br /><span className="font-normal">Complete quizzes to earn</span></div>
            </div>
          </div>

          {/* Progress Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-card rounded-2xl p-8 border-l-4 border-html shadow flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-html flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold">HTML Fundamentals</h3>
                  <p className="text-muted-foreground text-sm">Learn the building blocks of the web with HTML structure and semantics.</p>
                </div>
                <span className="text-xs bg-muted px-3 py-1 rounded-full">0/14 topics</span>
              </div>
              <Progress value={progress.htmlProgress} className="h-3" />
              <Link to="/topics/html">
                <Button className="w-fit gradient-html text-white btn-playful mt-2">Start Learning</Button>
              </Link>
            </div>
            <div className="bg-card rounded-2xl p-8 border-l-4 border-css shadow flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-css flex items-center justify-center">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold">CSS Styling</h3>
                  <p className="text-muted-foreground text-sm">Master styling, layouts, animations, and responsive design with CSS.</p>
                </div>
                <span className="text-xs bg-muted px-3 py-1 rounded-full">0/16 topics</span>
              </div>
              <Progress value={progress.cssProgress} className="h-3" />
              <Link to="/topics/css">
                <Button className="w-fit gradient-css text-white btn-playful mt-2">Start Learning</Button>
              </Link>
            </div>
          </div>

          {/* Suggested Topics & AI Assistant */}
          <div className="w-full">
            <div className="bg-card rounded-2xl p-6 shadow flex flex-col gap-4 w-full">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-success" />
                <span className="font-semibold">AI</span>
                <span className="ml-2 text-xs bg-success/10 text-success px-2 py-0.5 rounded">Powered by AI</span>
              </div>
              <div className="text-muted-foreground text-sm">Get instant explanations, code help, and personalized learning recommendations.</div>
              <div className="flex gap-2 mt-2">
                <Button className="btn-playful" onClick={() => setChatOpen(true)}>Start Chat</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <AIChatbot isOpen={chatOpen} setIsOpen={setChatOpen} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
