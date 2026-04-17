// components/cosmic/CodeExport.tsx
// Export component code with current variants

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { CheckIcon, CopyIcon } from "lucide-react";

export interface CodeExportProps {
  component: string;
  theme?: string;
  className?: string;
}

function generateComponentCode(component: string, theme: string): string {
  const componentCode: Record<string, string> = {
    button: `import { Button } from "@/components/ui/Button";

export function MyComponent() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}`,
    badge: `import { Badge } from "@/components/ui/Badge";

export function MyComponent() {
  return (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="quantum">Quantum</Badge>
    </div>
  );
}`,
    input: `import { Input } from "@/components/ui/Input";

export function MyComponent() {
  return (
    <Input 
      placeholder="Enter text..." 
      className="w-full max-w-sm"
    />
  );
}`,
    card: `import { Card } from "@/components/ui/Card";

export function MyComponent() {
  return (
    <Card className="p-4 max-w-sm">
      <h3 className="text-lg font-semibold text-white mb-2">Card Title</h3>
      <p className="text-white/60 text-sm mb-4">
        Card content goes here.
      </p>
      <Button variant="primary" size="sm">Action</Button>
    </Card>
  );
}`,
    default: `// Component code will appear here when you select a component
// Try selecting Button, Badge, Input, or Card to see examples`
  };

  return componentCode[component] || componentCode.default;
}

export function CodeExport({ component, theme, className }: CodeExportProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('tsx');

  const code = generateComponentCode(component, theme || 'quantum');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white/60">Export Code</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
          <span className="ml-1 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-3">
          <TabsTrigger value="tsx">TSX</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
        </TabsList>
        <TabsContent value="tsx">
          <pre className="text-xs text-white/60 bg-black/30 rounded-lg p-3 overflow-x-auto font-mono max-h-64 overflow-y-auto">
            <code>{code}</code>
          </pre>
        </TabsContent>
        <TabsContent value="css">
          <pre className="text-xs text-white/60 bg-black/30 rounded-lg p-3 overflow-x-auto font-mono max-h-64 overflow-y-auto">
            <code>{`/* Tailwind CSS classes used in this component */
.btn-primary {
  @apply bg-quantum-purple text-white hover:bg-quantum-dark;
}

.btn-secondary {
  @apply bg-cosmic-blue text-white hover:bg-cosmic-dark;
}

/* Import these classes from your Tailwind config */`}
            </code>
          </pre>
        </TabsContent>
      </Tabs>

      <p className="text-xs text-white/30 mt-3">
        Copy and paste this code into your project. Make sure you have the required components installed.
      </p>
    </Card>
  );
}