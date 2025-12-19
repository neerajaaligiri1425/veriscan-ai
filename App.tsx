
import React, { useState } from 'react';
import AnalysisForm from './components/AnalysisForm';
import ReportView from './components/ReportView';
import { analyzePlagiarism } from './services/geminiService';
import { AnalysisResult, AppStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      const report = await analyzePlagiarism(text);
      setResult(report);
      setStatus(AppStatus.COMPLETED);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fa-solid fa-shield-halved text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              VeriScan AI
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Check Originality with AI Precision
          </h2>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl">
            Detect plagiarized content, AI-generated text patterns, and verify sources across billions of web pages instantly.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-4 duration-300">
            <i className="fa-solid fa-circle-exclamation text-xl"></i>
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {status === AppStatus.IDLE || status === AppStatus.ANALYZING ? (
            <AnalysisForm onAnalyze={handleAnalyze} isLoading={status === AppStatus.ANALYZING} />
          ) : result && status === AppStatus.COMPLETED ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ReportView result={result} onReset={handleReset} />
            </div>
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-shield-halved text-indigo-600 text-xl"></i>
                <span className="text-xl font-bold text-gray-900">VeriScan AI</span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm">
                Empowering writers, educators, and publishers with cutting-edge NLP technology to ensure content integrity and intellectual property protection.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-indigo-600">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600">API Access</a></li>
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600">Community</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} VeriScan AI. Powered by Google Gemini. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
