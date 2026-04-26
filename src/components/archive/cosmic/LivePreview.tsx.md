// components/cosmic/LivePreview.tsx
// Live preview of selected component with current variants

"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { Progress } from "@/components/ui/Progress";
import { Skeleton } from "@/components/ui/Skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { Heart, Star, Mail, Phone, MapPin, AlertCircle, CheckCircle, Info } from "lucide-react";
import { DOMAIN_COLORS } from "@/lib/constants/cosmic/colors";
import { useState } from "react";

export interface LivePreviewProps {
  component: string;
  theme?: string;
  className?: string;
}

// Mock state for interactive components
const previewStyles = {
  quantum: {
    primary: DOMAIN_COLORS.quantum.base,
    secondary: DOMAIN_COLORS.cosmic.base,
    accent: DOMAIN_COLORS.bifrost.base,
  },
  cosmic: {
    primary: DOMAIN_COLORS.cosmic.base,
    secondary: DOMAIN_COLORS.quantum.base,
    accent: DOMAIN_COLORS.music.base,
  },
  nature: {
    primary: DOMAIN_COLORS.library.base,
    secondary: DOMAIN_COLORS.community.base,
    accent: DOMAIN_COLORS.support.base,
  },
  fire: {
    primary: DOMAIN_COLORS.pantheon.base,
    secondary: DOMAIN_COLORS.music.base,
    accent: DOMAIN_COLORS.council.base,
  },
};

export function LivePreview({ component, theme = 'quantum', className }: LivePreviewProps) {
  const themeColors = previewStyles[theme as keyof typeof previewStyles] || previewStyles.quantum;
  const [sliderValue, setSliderValue] = useState(50);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');

  const renderPreview = () => {
    switch (component) {
      case 'button':
        return (
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
          </div>
        );

      case 'badge':
        return (
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error"></Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="quantum">Quantum</Badge>
            <Badge variant="cosmic">Cosmic</Badge>
            <Badge variant="fire">Fire</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        );

      case 'card':
        return (
          <Card className="max-w-sm mx-auto">
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Card Title</h3>
              <p className="text-white/60 text-sm mb-4">
                This is a sample card with some content. Cards can contain images, text, and actions.
              </p>
              <Button variant="primary" size="sm">Action</Button>
            </Card>
          </Card>
        );

      case 'input':
        return (
          <div className="space-y-4 max-w-sm mx-auto">
            <Input placeholder="Default input" />
            <Input placeholder="With error" className="border-red-500" />
            <Input placeholder="Disabled" disabled />
          </div>
        );

      case 'Textarea':
        return (
          <div className="max-w-sm mx-auto">
            <Textarea placeholder="Enter your message here..." rows={4} />
          </div>
        );

      case 'select':
        return (
          <div className="max-w-xs mx-auto">
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex justify-center">
            <Checkbox checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
            <span className="ml-2 text-white/60 text-sm">Checkbox Label</span>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup value={radioValue} onValueChange={setRadioValue} className="flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
          </RadioGroup>
        );

      case 'switch':
        return (
          <div className="flex justify-center">
            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
          </div>
        );

      case 'slider':
        return (
          <div className="max-w-xs mx-auto">
            <Slider
              value={[sliderValue]}
              onValueChange={(val) => setSliderValue(Array.isArray(val) ? val[0] : val)}
              min={0}
              max={100}
              step={1}
            />
            <p className="text-center text-white/60 text-sm mt-2">Value: {sliderValue}%</p>
          </div>
        );

      case 'progress':
        return (
          <div className="max-w-xs mx-auto space-y-2">
            <Progress value={65} />
            <p className="text-center text-white/60 text-sm">65% Complete</p>
          </div>
        );

      case 'skeleton':
        return (
          <div className="space-y-3 max-w-sm mx-auto">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        );

      case 'alert':
        return (
          <div className="space-y-3 max-w-sm mx-auto">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>This is an informational message.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
          </div>
        );

      case 'accordion':
        return (
          <div className="max-w-sm mx-auto">
            <Accordion itemType="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>Section 1</AccordionTrigger>
                <AccordionContent>
                  Content for section 1 goes here.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Section 2</AccordionTrigger>
                <AccordionContent>
                  Content for section 2 goes here.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );

      case 'tabs':
        return (
          <div className="max-w-sm mx-auto">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                Content for Tab 1
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                Content for Tab 2
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                Content for Tab 3
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-white/60">Select a component to preview</p>
          </div>
        );
    }
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white capitalize">{component} Preview</h3>
        <Badge variant="quantum" size="sm">Theme: {theme}</Badge>
      </div>
      <div className="min-h-[300px] flex items-center justify-center bg-black/20 rounded-lg p-4">
        {renderPreview()}
      </div>
    </Card>
  );
}