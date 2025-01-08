"use client";

import { useEffect, useState } from "react";

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';
import { LuCheck, LuCopy } from "react-icons/lu";

interface CodeBlockProps {
  filename: string;
  code: string;
  language?: string;
}

export const CodeBlockDisplay = ({
  filename,
  code,
  language = "typescript",
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    try {
      const grammar = Prism.languages[language] || Prism.languages.typescript;
      const highlighted = Prism.highlight(code.trim(), grammar, language);
      setHighlightedCode(highlighted);
    } catch (error) {
      console.error('Error highlighting code:', error);
      setHighlightedCode(code); // Fallback to plain text
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-[#1E1E1E] overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-geistMono text-gray-300">{filename}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className={`h-7 w-7 flex items-center justify-center rounded-md transition-all duration-200 ${
            copied ? "bg-green-500" : "bg-black/20 hover:bg-black/30"
          }`}
        >
          <div className="w-3.5 h-3.5 relative">
            <div
              className={`absolute inset-0 transition-all duration-200 ${
                copied ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            >
              <LuCheck className="w-3.5 h-3.5 text-white" />
            </div>
            <div
              className={`absolute inset-0 transition-all duration-200 ${
                copied ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            >
              <LuCopy className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </button>
      </div>
        <div className="h-auto overflow-y-auto">
          <div className="p-4">
            <pre className="!bg-transparent !p-0">
              <code
                className={`language-${language} font-geistMono`}
                style={{ fontSize: "13px", letterSpacing: "0.1px" }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
        </div>
      </div>
    </div>
  );
};
