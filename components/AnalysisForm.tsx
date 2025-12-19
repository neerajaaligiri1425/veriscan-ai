
import React, { useState } from 'react';

interface AnalysisFormProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 50) {
      alert("Please enter at least 50 characters for a meaningful analysis.");
      return;
    }
    onAnalyze(text);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter text to check for plagiarism
          </label>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none text-gray-800"
            placeholder="Paste your document content here (minimum 50 characters)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2">
              <i className="fa-solid fa-file-import"></i>
              Upload .txt file
              <input type="file" className="hidden" accept=".txt" onChange={handleFileUpload} />
            </label>
            <span className="text-xs text-gray-500">
              {text.length} characters | {text.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading || text.trim().length === 0}
            className={`w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                Scanning...
              </>
            ) : (
              <>
                <i className="fa-solid fa-magnifying-glass"></i>
                Check for Plagiarism
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnalysisForm;
