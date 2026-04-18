// components/admin/files/FileContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, Eye, Code, AlertCircle, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { PublicFileRegistry } from '@/types/generated/hephaestus-infrastructure/file_registry';

interface FileContentProps {
  file: PublicFileRegistry;
  defaultOpen?: boolean;
}

export default function FileContent({ file, defaultOpen = false }: FileContentProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  // Load file content when opened
  useEffect(() => {
    if (!isOpen || content !== null) return;

    const loadContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch from API endpoint that reads the file from the filesystem
        const response = await fetch(`/api/admin/files/content?path=${encodeURIComponent(file.file_path)}`);
        if (!response.ok) throw new Error('Failed to load file content');
        const data = await response.json();
        setContent(data.content);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [isOpen, file.file_path, content]);

  const copyContent = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Determine language for syntax highlighting (simplified)
  const getLanguage = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      ts: 'typescript',
      tsx: 'typescript',
      js: 'javascript',
      jsx: 'javascript',
      css: 'css',
      md: 'markdown',
      json: 'json',
      sql: 'sql',
      html: 'html',
    };
    return langMap[ext || ''] || 'plaintext';
  };

  const language = getLanguage(file.file_name);

  // Determine if this file type should be viewable
  const viewableExtensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.json', '.sql', '.html', '.txt'];
  const isViewable = viewableExtensions.some(ext => file.file_name.endsWith(ext));

  if (!isViewable) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <FileCode size={18} className="text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">File Content</h3>
              <p className="text-xs text-white/40">Preview not available for this file type</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-white/40" size={18} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-white/10">
                <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertCircle size={18} className="text-yellow-400" />
                  <p className="text-sm text-yellow-400">
                    Cannot preview binary or unsupported file types
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${
            language === 'typescript' ? 'bg-blue-500/20' :
            language === 'javascript' ? 'bg-yellow-500/20' :
            language === 'css' ? 'bg-pink-500/20' :
            language === 'markdown' ? 'bg-green-500/20' :
            'bg-cyan-500/20'
          } flex items-center justify-center`}>
            <FileCode size={18} className={`${
              language === 'typescript' ? 'text-blue-400' :
              language === 'javascript' ? 'text-yellow-400' :
              language === 'css' ? 'text-pink-400' :
              language === 'markdown' ? 'text-green-400' :
              'text-cyan-400'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">File Content</h3>
            <p className="text-xs text-white/40 flex items-center gap-2">
              <span className={`px-1.5 py-0.5 rounded ${
                language === 'typescript' ? 'bg-blue-500/30 text-blue-300' :
                language === 'javascript' ? 'bg-yellow-500/30 text-yellow-300' :
                'bg-white/20 text-white/60'
              } text-[10px]`}>
                {language}
              </span>
              {content && `${content.split('\n').length} lines`}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          {isOpen && content && (
            <div className="flex items-center gap-1 mr-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRaw(!showRaw);
                }}
                className={`p-1.5 rounded transition-colors ${
                  showRaw ? 'bg-cyan-600/30 text-cyan-400' : 'hover:bg-white/10 text-white/60'
                }`}
                title={showRaw ? 'Show syntax highlighted' : 'Show raw text'}
              >
                {showRaw ? <Code size={14} /> : <Eye size={14} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyContent();
                }}
                className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/60"
                title="Copy content"
              >
                {copySuccess ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
          )}
          <ChevronDown className="text-white/40" size={18} />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-white/10">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400" />
                </div>
              ) : error ? (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle size={18} className="text-red-400" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              ) : content ? (
                <div className="relative">
                  {/* Line numbers + code */}
                  <div className="overflow-x-auto rounded-lg bg-black/50">
                    {showRaw ? (
                      <pre className="p-4 text-xs font-mono text-white/80 whitespace-pre-wrap break-all">
                        {content}
                      </pre>
                    ) : (
                      <div className="flex">
                        {/* Line numbers */}
                        <div className="flex-shrink-0 py-4 pr-4 text-right border-r border-white/10">
                          {content.split('\n').map((_, i) => (
                            <div key={i + 1} className="text-xs text-white/30 font-mono leading-5">
                              {i + 1}
                            </div>
                          ))}
                        </div>
                        {/* Code */}
                        <pre className="flex-1 p-4 overflow-x-auto text-xs font-mono text-white/80 leading-5">
                          <code className={`language-${language}`}>
                            {content}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer stats */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-white/30">
                    <span>📄 {content.split('\n').length} lines</span>
                    <span>📏 {content.length} characters</span>
                    <span>🔤 {language}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <AlertCircle size={18} className="text-white/40" />
                  <p className="text-sm text-white/40">No content available</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}