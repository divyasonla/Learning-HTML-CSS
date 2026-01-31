import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Palette, ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { htmlTopics, cssTopics } from '@/data/topicStructure';

const TopicsPage = () => {
  const { category } = useParams<{ category: 'html' | 'css' }>();
  const { progress } = useProgress();
  
  const topics = category === 'html' ? htmlTopics : cssTopics;
  const isHtml = category === 'html';
  
  const categoryConfig = {
    html: {
      title: 'HTML Topics',
      icon: Code,
      gradient: 'gradient-html',
      color: 'text-html',
      bgColor: 'bg-html/10',
    },
    css: {
      title: 'CSS Topics',
      icon: Palette,
      gradient: 'gradient-css',
      color: 'text-css',
      bgColor: 'bg-css/10',
    },
  };
  
  const config = categoryConfig[category || 'html'];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${config.gradient} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold">{config.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Progress Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-muted-foreground">
            {topics.length} topics • {isHtml ? progress.htmlProgress : progress.cssProgress}% complete
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid gap-4">
          {topics.map((topic, index) => {
            const topicProgress = progress.topicProgress[topic.id];
            const isLocked = topicProgress?.status === 'locked';
            const isCompleted = topicProgress?.status === 'completed';
            const isUnlocked = topicProgress?.status === 'unlocked' || index === 0;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={isLocked ? '#' : `/learn/${topic.id}`}
                  className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
                >
                  <div 
                    className={`card-playful p-5 flex items-center gap-4 transition-all ${
                      isLocked ? 'opacity-50' : 'hover:scale-[1.02]'
                    }`}
                  >
                    {/* Topic Icon */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: `${topic.color}20` }}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7 text-green-500" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        topic.icon
                      )}
                    </div>

                    {/* Topic Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">{topic.name}</h3>
                        <span 
                          className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                          style={{ 
                            backgroundColor: `${topic.color}20`,
                            color: topic.color 
                          }}
                        >
                          {topic.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {topic.subtopics.join(' • ')}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {isCompleted && (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      )}
                      {isUnlocked && !isCompleted && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          Start
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TopicsPage;
