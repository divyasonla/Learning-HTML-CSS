import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    description: 'Build your first portfolio website using HTML & CSS',
    difficulty: 'beginner',
    concepts: ['HTML Structure', 'CSS Styling', 'Flexbox'],
    thumbnail: '🎨',
  },
  {
    id: 'blog-layout',
    title: 'Blog Layout',
    description: 'Create a responsive blog with semantic HTML',
    difficulty: 'intermediate',
    concepts: ['Semantic HTML', 'CSS Grid', 'Media Queries'],
    thumbnail: '📝',
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Design a modern landing page with animations',
    difficulty: 'intermediate',
    concepts: ['CSS Animations', 'Flexbox', 'Forms'],
    thumbnail: '🚀',
  },
  {
    id: 'dashboard-ui',
    title: 'Dashboard UI',
    description: 'Build a complex dashboard interface',
    difficulty: 'advanced',
    concepts: ['CSS Grid', 'Variables', 'Advanced Layouts'],
    thumbnail: '📊',
  },
];

const aiProjectDetails = (project) => {
  // Simulate AI-generated details (replace with real AI call if needed)
  return {
    overview: `The ${project.title} project helps you master ${project.concepts.join(", ")}. You'll build a real-world solution and learn best practices for modern web development.`,
    steps: [
      `Understand the project requirements and plan your layout.`,
      `Set up the basic HTML structure for the project.`,
      `Apply CSS for layout and styling, using concepts like ${project.concepts.join(", ")}.`,
      `Test your project on different devices and screen sizes.`,
      `Refine and polish your project for a professional finish.`
    ],
    tips: [
      `Break the project into small, manageable tasks.`,
      `Use semantic HTML for better accessibility.`,
      `Keep your CSS organized and use comments.`,
      `Preview your work often and iterate.`
    ]
  };
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold">Projects</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-muted-foreground">
            Apply your knowledge with real-world projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-playful p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => { setSelectedProject(project); setShowModal(true); }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl shrink-0">
                  {project.thumbnail}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      project.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.concepts.map((concept, i) => (
                      <span key={i} className="px-2 py-1 bg-muted rounded text-xs">
                        {concept}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full gap-2" disabled>
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        {showModal && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-background rounded-xl shadow-2xl w-full max-w-lg mx-auto relative flex flex-col max-h-[90vh]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-primary"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {selectedProject.thumbnail}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl mb-1">{selectedProject.title}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      selectedProject.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      selectedProject.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {selectedProject.difficulty}
                    </span>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground">{selectedProject.description}</p>
                {/* AI-generated details */}
                {(() => {
                  const details = aiProjectDetails(selectedProject);
                  return (
                    <>
                      <h3 className="font-semibold mt-4 mb-2">Project Overview</h3>
                      <p className="mb-3">{details.overview}</p>
                      <h4 className="font-semibold mb-2">Steps to Complete</h4>
                      <ol className="list-decimal pl-5 mb-3">
                        {details.steps.map((step, i) => <li key={i}>{step}</li>)}
                      </ol>
                      <h4 className="font-semibold mb-2">Tips</h4>
                      <ul className="list-disc pl-5">
                        {details.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                      </ul>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;
