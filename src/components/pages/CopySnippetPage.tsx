import { getComponentSource } from "@/utils/getComponentSource";
import { useEffect, useState } from 'react';
import { CodeBlockDisplay } from "../library/CodeBlock";
import { CopySnippet } from "../library/CopySnippet";
import { LivePreview } from "../library/LivePreview";

export const CopySnippetPage = () => {
    const [componentSource, setComponentSource] = useState('');
    const packageCommands = {
        "npm": "npm install @geist-ui/core",
        "yarn": "yarn add @geist-ui/core",
        "pnpm": "pnpm add @geist-ui/core"
    };

    useEffect(() => {
      getComponentSource('/src/components/library/CopySnippet.tsx')
        .then(setComponentSource)
        .catch(console.error);
    }, []);

    return (
      <main className="h-full">
        <div className="flex flex-col gap-4">
          <LivePreview>
            <CopySnippet snippets={packageCommands} />
          </LivePreview>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-geistMono text-textPrimary -mb-2 tracking-wide">
              Usage
            </h2>
          </div>
          <CodeBlockDisplay
            filename="Usage.tsx"
            language="tsx"
            code={`export const Usage =() => {
     const packageCommands = {
        "npm": "npm install @geist-ui/core",
        "yarn": "yarn add @geist-ui/core",
        "pnpm": "pnpm add @geist-ui/core"
        
    };

    return <CopySnippet snippets={packageCommands} />;
};`}
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-geistMono text-textPrimary -mb-2 tracking-wide">
              Code
            </h2>
          </div>
          <CodeBlockDisplay
            filename="tailwind.config.ts"
            language="ts"
            code={`keyframes: {
        blurFade: {
          '0%': { 
            opacity: '0',
            filter: 'blur(12px)',
            transform: 'translateY(4px)'
          },
          '20%': {
            opacity: '0.2',
            filter: 'blur(8px)',
            transform: 'translateY(3px)'
          },
          '40%': {
            opacity: '0.4',
            filter: 'blur(6px)',
            transform: 'translateY(2px)'
          },
          '60%': {
            opacity: '0.6',
            filter: 'blur(4px)',
            transform: 'translateY(1px)'
          },
          '80%': {
            opacity: '0.8',
            filter: 'blur(2px)',
            transform: 'translateY(0px)'
          },
          '100%': { 
            opacity: '1',
            filter: 'blur(0)',
            transform: 'translateY(0)'
          },
        },
        spring: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        blurFade: 'blurFade 0.5s ease-out forwards',
        spring: 'spring 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },`}
          />
          {componentSource && (
            <CodeBlockDisplay
              filename="CopySnippet.tsx"
              language="tsx"
              code={componentSource}
            />
          )}
        </div>
        <div className="h-36" /> {/* Spacer */}
      </main>
    );
};
