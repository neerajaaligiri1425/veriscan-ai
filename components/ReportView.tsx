
import React from 'react';
import { AnalysisResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ReportViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ result, onReset }) => {
  const chartData = [
    { name: 'Original', value: 100 - result.overallScore },
    { name: 'Duplicate', value: result.overallScore },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">Scan Results</h2>
        <button
          onClick={onReset}
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
        >
          <i className="fa-solid fa-rotate-left"></i> Start New Scan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center">
          <h3 className="text-gray-500 font-semibold mb-4 uppercase text-xs tracking-wider">Similarity Score</h3>
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-4xl font-bold ${result.overallScore > 20 ? 'text-red-500' : 'text-emerald-500'}`}>
                {result.overallScore}%
              </span>
              <span className="text-xs text-gray-400">Match Found</span>
            </div>
          </div>
          <div className="mt-4 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-gray-600">Original</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Plagiarized</span>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-800 font-bold mb-4">Textual Breakdown</h3>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100 max-h-64 overflow-y-auto">
            {result.matches.map((match, i) => (
              <span
                key={i}
                className={`mr-1 px-1 rounded transition-colors ${
                  match.isSuspicious ? 'bg-red-100 border-b-2 border-red-400 cursor-help' : ''
                }`}
                title={match.sourceUrl ? `Match found at: ${match.sourceUrl}` : undefined}
              >
                {match.segment}.{' '}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500 italic">
            * Highlighted text indicates segments that have high similarity with web sources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analysis Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-robot text-indigo-500"></i>
            AI Analysis Summary
          </h3>
          <div className="text-gray-600 text-sm whitespace-pre-line bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 italic">
            {result.summary}
          </div>
        </div>

        {/* Sources List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-link text-blue-500"></i>
            Found Web Sources ({result.sources.length})
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {result.sources.length > 0 ? (
              result.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100 group transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {source.title}
                      </h4>
                      <p className="text-xs text-gray-400 truncate mt-1 w-64 sm:w-80">
                        {source.uri}
                      </p>
                    </div>
                    <i className="fa-solid fa-external-link text-gray-300 group-hover:text-indigo-500 text-xs"></i>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-8">
                <i className="fa-solid fa-shield-check text-emerald-400 text-3xl mb-2"></i>
                <p className="text-gray-500 text-sm">No web matches found. Document appears highly original.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
