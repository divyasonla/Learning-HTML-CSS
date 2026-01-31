import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TopicProgress, ProgressState } from '@/types';
import { htmlTopics, cssTopics } from '@/data/topicStructure';

interface ProgressContextType {
  progress: ProgressState;
  loading: boolean;
  updateTopicProgress: (topicId: string, updates: Partial<TopicProgress>) => Promise<void>;
  unlockNextTopic: (currentTopicId: string) => Promise<void>;
  completeTopicLesson: (topicId: string) => Promise<void>;
  completeProject: (projectId: string) => Promise<void>;
  syncProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

const getProgressKey = (userId?: string) => `learning_progress_${userId || 'guest'}`;

const getInitialProgress = (): ProgressState => {
  // Initialize first topics as unlocked
  const topicProgress: Record<string, TopicProgress> = {};
  
  [...htmlTopics, ...cssTopics].forEach((topic) => {
    const isFirstHtml = topic.id === 'html-basics';
    const isFirstCss = topic.id === 'css-basics';
    
    topicProgress[topic.id] = {
      topicId: topic.id,
      status: isFirstHtml || isFirstCss ? 'unlocked' : 'locked',
      practiceCompleted: false,
      projectCompleted: false,
      quizScore: null,
      quizAttempts: 0,
      lastUpdated: new Date()
    };
  });

  return {
    htmlProgress: 0,
    cssProgress: 0,
    topicProgress,
    completedProjects: []
  };
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressState>(getInitialProgress);
  const [loading, setLoading] = useState(true);

  // Calculate progress percentages
  const calculateProgress = (topicProgress: Record<string, TopicProgress>) => {
    const htmlCompleted = htmlTopics.filter(t => topicProgress[t.id]?.status === 'completed').length;
    const cssCompleted = cssTopics.filter(t => topicProgress[t.id]?.status === 'completed').length;
    
    return {
      htmlProgress: Math.round((htmlCompleted / htmlTopics.length) * 100),
      cssProgress: Math.round((cssCompleted / cssTopics.length) * 100)
    };
  };

  // Load progress from localStorage
  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      const key = getProgressKey(user?.uid);
      const localData = localStorage.getItem(key);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          const percentages = calculateProgress(parsed.topicProgress);
          setProgress({ ...parsed, ...percentages });
        } catch (e) {
          console.error('Error parsing local progress:', e);
        }
      } else {
        setProgress(getInitialProgress());
      }
      setLoading(false);
    };
    loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const saveProgress = async (newProgress: ProgressState) => {
    const key = getProgressKey(user?.uid);
    localStorage.setItem(key, JSON.stringify(newProgress));
  };

  const updateTopicProgress = async (topicId: string, updates: Partial<TopicProgress>) => {
    const newTopicProgress = {
      ...progress.topicProgress,
      [topicId]: {
        ...progress.topicProgress[topicId],
        ...updates,
        lastUpdated: new Date()
      }
    };
    
    const percentages = calculateProgress(newTopicProgress);
    const newProgress = {
      ...progress,
      ...percentages,
      topicProgress: newTopicProgress
    };
    
    setProgress(newProgress);
    await saveProgress(newProgress);
  };

  const unlockNextTopic = async (currentTopicId: string) => {
    const allTopics = [...htmlTopics, ...cssTopics];
    const currentTopic = allTopics.find(t => t.id === currentTopicId);
    
    if (!currentTopic) return;
    
    // Find next topic in the same category
    const categoryTopics = currentTopic.category === 'html' ? htmlTopics : cssTopics;
    const currentIndex = categoryTopics.findIndex(t => t.id === currentTopicId);
    const nextTopic = categoryTopics[currentIndex + 1];
    
    if (nextTopic && progress.topicProgress[nextTopic.id]?.status === 'locked') {
      await updateTopicProgress(nextTopic.id, { status: 'unlocked' });
    }
  };

  const completeTopicLesson = async (topicId: string) => {
    await updateTopicProgress(topicId, { status: 'completed' });
    await unlockNextTopic(topicId);
  };

  const completeProject = async (projectId: string) => {
    if (!progress.completedProjects.includes(projectId)) {
      const newProgress = {
        ...progress,
        completedProjects: [...progress.completedProjects, projectId]
      };
      setProgress(newProgress);
      await saveProgress(newProgress);
    }
  };

  const syncProgress = async () => {
    await saveProgress(progress);
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, updateTopicProgress, unlockNextTopic, completeTopicLesson, completeProject, syncProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
