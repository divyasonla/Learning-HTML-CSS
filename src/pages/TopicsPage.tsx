import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Palette, ArrowLeft, Lock, CheckCircle, Layers3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { htmlTopics, cssTopics, allTopics } from '@/data/topicStructure';

const TopicsPage = () => {
  const { category } = useParams<{ category: 'html' | 'css' | 'all' }>();
  const { progress } = useProgress();

  let topics = htmlTopics;
  let isHtml = true;
  let config = {
    title: 'HTML Topics',
    icon: Code,
    gradient: 'gradient-html',
    color: 'text-html',
    bgColor: 'bg-html/10',
  };

  if (category === 'css') {
    topics = cssTopics;
    isHtml = false;
    config = {
      title: 'CSS Topics',
      icon: Palette,
      gradient: 'gradient-css',
      color: 'text-css',
      bgColor: 'bg-css/10',
    };
  } else if (category === 'all') {
    topics = allTopics;
    isHtml = false;
    config = {
      title: 'All Topics',
      icon: Layers3,
      gradient: 'from-pink-500 via-orange-400 to-blue-500 bg-gradient-to-tr',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    };
  }
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
          className="mb-6"
        >
          <p className="text-muted-foreground">
            {topics.length} topics
            {category === 'all'
              ? ''
              : ` • ${isHtml ? progress.htmlProgress : progress.cssProgress}% complete`}
          </p>
        </motion.div>

        {/* Responsive Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
          {topics.map((topic, index) => {
            const topicProgress = progress.topicProgress[topic.id];
            const isLocked = topicProgress?.status === 'locked';
            const isCompleted = topicProgress?.status === 'completed';
            const isUnlocked = topicProgress?.status === 'unlocked' || index === 0;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link 
                  to={isLocked ? '#' : `/learn/${topic.id}`}
                  className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
                >
                  <div 
                    className={`card-playful p-4 flex flex-col items-center gap-2 transition-all ${
                      isLocked ? 'opacity-50' : 'hover:scale-[1.03]'
                    }`}
                  >
                    {/* Topic Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 mb-1"
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
                    <div className="w-full min-w-0 text-center">
                      <h3 className="font-semibold text-base truncate mb-1">{topic.name}</h3>
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium capitalize mb-1"
                        style={{ 
                          backgroundColor: `${topic.color}20`,
                          color: topic.color 
                        }}
                      >
                        {topic.level}
                      </span>
                      <p className="text-xs text-muted-foreground truncate">
                        {topic.subtopics.slice(0, 3).join(' • ')}
                        {topic.subtopics.length > 3 && ' ...'}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-1">
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      )}
                      {isUnlocked && !isCompleted && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
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
