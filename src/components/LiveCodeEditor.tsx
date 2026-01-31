import { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LiveCodeEditorProps {
  initialHtml?: string;
  initialCss?: string;
  height?: string;
}

const defaultHtml = `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Start coding here...</p>
</body>
</html>`;

const defaultCss = `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
}`;

const LiveCodeEditor = ({ 
  initialHtml = defaultHtml, 
  initialCss = defaultCss,
  height = "400px"
}: LiveCodeEditorProps) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [activeTab, setActiveTab] = useState('html');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const generatePreview = useCallback(() => {
    const combinedCode = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html.replace(/<!DOCTYPE html>|<\/?html>|<\/?head>|<\/?body>|<title>.*?<\/title>/gi, '')}
      </body>
      </html>
    `;
    return combinedCode;
  }, [html, css]);

  const handleReset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
    setPreviewKey(prev => prev + 1);
  };

  const handleRun = () => {
    setPreviewKey(prev => prev + 1);
  };

  return (
    <motion.div 
      className={`bg-card border rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}
      layout
    >
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <h3 className="font-semibold text-sm">Live Code Editor</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRun} className="gap-1">
            <Play className="w-4 h-4" />
            Run
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${isFullscreen ? 'h-[calc(100%-56px)]' : ''}`}>
        {/* Editor Panel */}
        <div className="border-r">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b bg-muted/30">
              <TabsTrigger value="html" className="flex-1 rounded-none data-[state=active]:bg-background">
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="flex-1 rounded-none data-[state=active]:bg-background">
                CSS
              </TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="m-0">
              <Editor
                height={isFullscreen ? "calc(100vh - 140px)" : height}
                defaultLanguage="html"
                value={html}
                onChange={(value) => setHtml(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  padding: { top: 16 },
                }}
              />
            </TabsContent>
            <TabsContent value="css" className="m-0">
              <Editor
                height={isFullscreen ? "calc(100vh - 140px)" : height}
                defaultLanguage="css"
                value={css}
                onChange={(value) => setCss(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  padding: { top: 16 },
                }}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="bg-white">
          <div className="p-2 border-b bg-muted/30">
            <span className="text-xs font-medium text-muted-foreground">Preview</span>
          </div>
          <iframe
            key={previewKey}
            srcDoc={generatePreview()}
            title="Preview"
            className="w-full border-0"
            style={{ height: isFullscreen ? "calc(100vh - 140px)" : height }}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LiveCodeEditor;
