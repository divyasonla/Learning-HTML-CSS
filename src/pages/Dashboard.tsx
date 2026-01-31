import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Palette, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/LogoutButton';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';
import { htmlTopics, cssTopics } from '@/data/topicStructure';
import AIChatbot from '@/components/AIChatbot';

const Dashboard = () => {
  const { progress } = useProgress();

  const getNextTopic = (category: 'html' | 'css') => {
    const topics = category === 'html' ? htmlTopics : cssTopics;
    return topics.find(t => progress.topicProgress[t.id]?.status === 'unlocked');
  };

  const nextHtml = getNextTopic('html');
  const nextCss = getNextTopic('css');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold gradient-text">CodeQuest</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                  L
                </div>
                <span className="hidden sm:inline">Learner</span>
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold mb-2">
            Welcome, Learner! 👋
          </h1>
          <p className="text-muted-foreground">Ready to continue your coding adventure?</p>
        </motion.div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card-playful p-6 border-l-4 border-html"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl gradient-html flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold">HTML Progress</h3>
                <p className="text-muted-foreground text-sm">{progress.htmlProgress}% Complete</p>
              </div>
            </div>
            <Progress value={progress.htmlProgress} className="h-3 mb-4" />
            <Link to={nextHtml ? `/learn/${nextHtml.id}` : '/topics/html'}>
              <Button className="w-full gradient-html text-white">
                {progress.htmlProgress === 0 ? 'Start HTML' : 'Continue HTML'}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-playful p-6 border-l-4 border-css"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl gradient-css flex items-center justify-center">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold">CSS Progress</h3>
                <p className="text-muted-foreground text-sm">{progress.cssProgress}% Complete</p>
              </div>
            </div>
            <Progress value={progress.cssProgress} className="h-3 mb-4" />
            <Link to={nextCss ? `/learn/${nextCss.id}` : '/topics/css'}>
              <Button className="w-full gradient-css text-white">
                {progress.cssProgress === 0 ? 'Start CSS' : 'Continue CSS'}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Link to="/topics/html" className="card-playful p-4 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-html/10 text-html flex items-center justify-center group-hover:scale-110 transition-transform">
              📄
            </div>
            <div>
              <p className="font-semibold">HTML Topics</p>
              <p className="text-sm text-muted-foreground">{htmlTopics.length} topics</p>
            </div>
          </Link>

          <Link to="/topics/css" className="card-playful p-4 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-css/10 text-css flex items-center justify-center group-hover:scale-110 transition-transform">
              🎨
            </div>
            <div>
              <p className="font-semibold">CSS Topics</p>
              <p className="text-sm text-muted-foreground">{cssTopics.length} topics</p>
            </div>
          </Link>

          <Link to="/projects" className="card-playful p-4 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Projects</p>
              <p className="text-sm text-muted-foreground">Real-world builds</p>
            </div>
          </Link>

        </motion.div>

        {/* Topic Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold mb-4">Continue Learning</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...htmlTopics.slice(0, 3), ...cssTopics.slice(0, 3)].map((topic, i) => {
              const topicProgress = progress.topicProgress[topic.id];
              const isLocked = topicProgress?.status === 'locked';
              const isCompleted = topicProgress?.status === 'completed';

              return (
                <Link 
                  key={topic.id} 
                  to={isLocked ? '#' : `/learn/${topic.id}`}
                  className={`card-playful p-4 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${topic.color}20` }}
                    >
                      {isCompleted ? '✅' : isLocked ? '🔒' : topic.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{topic.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{topic.level}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </main>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Dashboard;
