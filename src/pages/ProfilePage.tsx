import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Code, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';
import { htmlTopics, cssTopics } from '@/data/topicStructure';

const ProfilePage = () => {
  const { progress } = useProgress();
  const role = localStorage.getItem('user_role') || 'student';

  const completedHtml = htmlTopics.filter(t => progress.topicProgress[t.id]?.status === 'completed').length;
  const completedCss = cssTopics.filter(t => progress.topicProgress[t.id]?.status === 'completed').length;

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
          <h1 className="font-display text-2xl font-bold">Profile</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-playful p-8 mb-8"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-bold">
              {role === 'teacher' ? 'T' : 'S'}
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">{role === 'teacher' ? 'Teacher' : 'Student'}</h2>
              <p className="text-muted-foreground">{role === 'teacher' ? 'You can upload new topics!' : 'Keep learning and growing!'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold">{completedHtml + completedCss}</p>
              <p className="text-sm text-muted-foreground">Topics Done</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <Code className="w-8 h-8 mx-auto mb-2 text-html" />
              <p className="text-2xl font-bold">{completedHtml}/{htmlTopics.length}</p>
              <p className="text-sm text-muted-foreground">HTML</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <Palette className="w-8 h-8 mx-auto mb-2 text-css" />
              <p className="text-2xl font-bold">{completedCss}/{cssTopics.length}</p>
              <p className="text-sm text-muted-foreground">CSS</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-playful p-8"
        >
          <h3 className="font-display text-xl font-bold mb-6">Learning Progress</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium flex items-center gap-2">
                  <Code className="w-4 h-4 text-html" />
                  HTML
                </span>
                <span className="text-muted-foreground">{progress.htmlProgress}%</span>
              </div>
              <Progress value={progress.htmlProgress} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium flex items-center gap-2">
                  <Palette className="w-4 h-4 text-css" />
                  CSS
                </span>
                <span className="text-muted-foreground">{progress.cssProgress}%</span>
              </div>
              <Progress value={progress.cssProgress} className="h-3" />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
