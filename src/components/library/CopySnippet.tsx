import { useCallback, useEffect, useRef, useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

interface SnippetProps {
  snippets: Record<string, string>;
}

export const CopySnippet = ({ snippets }: SnippetProps) => {
  const [activeTab, setActiveTab] = useState(Object.keys(snippets)[0]);
  const [copied, setCopied] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: 'translateX(0)' });
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    const activeButton = buttonsRef.current[Object.keys(snippets).indexOf(activeTab)];
    const container = containerRef.current;
    
    if (activeButton && container) {
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      setIndicatorStyle({
        width: buttonRect.width,
        transform: `translateX(${buttonRect.left - containerRect.left}px) scale(1)`,
      });
    }
  }, [activeTab, snippets]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const calculateMaxWidth = useCallback(() => {
    const tempDiv = document.createElement('div');
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';
    tempDiv.style.whiteSpace = 'pre';
    tempDiv.style.fontFamily = 'monospace';
    tempDiv.style.fontSize = '0.875rem';
    document.body.appendChild(tempDiv);

    let maxCommandWidth = 0;
    Object.values(snippets).forEach(cmd => {
      tempDiv.textContent = cmd;
      maxCommandWidth = Math.max(maxCommandWidth, tempDiv.offsetWidth);
    });

    document.body.removeChild(tempDiv);
    return Math.max(maxCommandWidth, 200);
  }, [snippets]);

  const maxWidth = calculateMaxWidth();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Try the modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for iOS Safari
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '0';
        textArea.style.top = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="inline-flex h-9 items-center rounded-xl bg-[#1C1C1C] px-2 py-0.5 relative">
        <div ref={containerRef} className="relative flex items-center h-8">
          <div
            className="absolute h-6 bg-white/30 backdrop-blur-sm rounded-md transition-all duration-300"
            style={{
              ...indicatorStyle,
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
          {Object.keys(snippets).map((manager, index) => (
            <button
              key={manager}
              ref={(el) => {
                buttonsRef.current[index] = el;
              }}
              onClick={() => handleTabChange(manager)}
              className={`h-8 px-2 flex items-center justify-center text-sm transition-colors relative z-10 font-geistMono tracking-wide ${
                activeTab === manager
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {manager}
            </button>
          ))}
        </div>
      </div>
      <div
        className="inline-flex h-11 items-center bg-[#1C1C1C] rounded-xl overflow-hidden transition-all duration-200 min-w-[280px] relative"
        style={{ width: maxWidth ? `${maxWidth + 48}px` : "auto" }}
      >
        <div className="flex-1 px-3 pr-12 pb-1 overflow-x-auto no-scrollbar">
          <code
            key={snippets[activeTab]}
            className="text-[#98c379] text-sm whitespace-pre animate-blurFade leading-none font-geistMono tracking-wide"
          >
            {snippets[activeTab]}
          </code>
        </div>
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
          <button
            onClick={() => copyToClipboard(snippets[activeTab])}
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
      </div>
    </div>
  );
};
