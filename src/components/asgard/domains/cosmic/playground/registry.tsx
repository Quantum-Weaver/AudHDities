// src/components/asgard/domains/cosmic/playground/registry.tsx
'use client';

import { useState, type ReactNode } from 'react';
import { Bell, Home, Info, Search, Sparkles, Star } from 'lucide-react';

import { Footer } from '@/components/bifrost/Footer';
import Header from '@/components/bifrost/Header';
import { LayoutChrome } from '@/components/bifrost/LayoutChrome';
import LearscailScroll from '@/components/bifrost/LearscailScroll';
import MapDialog from '@/components/bifrost/MapDialog';
import { MarkdownBio } from '@/components/bifrost/MarkdownBio';
import { Navigation } from '@/components/bifrost/Navigation';
import { Page } from '@/components/bifrost/Page';
import {
  Section,
  MutedSection,
  GlowSection,
  GradientSection,
  GlassSection,
  HeroSection,
  SectionHeader,
  SectionDivider as BifrostSectionDivider,
  SectionGroup,
} from '@/components/bifrost/Section';
import StreetTree from '@/components/bifrost/StreetTree';

import { Checkbox, CheckboxGroup } from '@/components/forging/Checkbox';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import {
  FormValidationProvider,
  ValidatedInput,
  ValidationSummary as ContextValidationSummary,
  ValidationSuccess as ContextValidationSuccess,
} from '@/components/forging/FormValidation';
import { Input } from '@/components/forging/Input';
import { RadioGroup, Radio } from '@/components/forging/Radio';
import { Select } from '@/components/forging/Select';
import { Slider } from '@/components/forging/Slider';
import { Switch } from '@/components/forging/Switch';
import { Textarea } from '@/components/forging/Textarea';
import { ValidationSuccess } from '@/components/forging/forms/ValidationSuccess';
import { ValidationSummary } from '@/components/forging/forms/ValidationSummary';

import {
  AspectRatio,
  SquareRatio,
  PhotoRatio,
  VideoRatio,
  VerticalVideoRatio,
  GoldenRatio,
  PortraitRatio,
  AspectRatioImage,
} from '@/components/hof/AspectRatio';
import {
  Container,
  PageContainer,
  SectionContainer,
  NarrowContainer,
  WideContainer,
  HeroContainer,
  FooterContainer,
  ContainerHeader,
  ContainerBody,
  ContainerFooter,
} from '@/components/hof/Container';
import {
  Divider,
  LightDivider,
  SubtleDivider,
  BoldDivider,
  GlowDivider,
  GradientDivider,
  VerticalDivider,
  DashedDivider,
  DottedDivider,
  DividerWithText,
  SectionDivider as HofSectionDivider,
} from '@/components/hof/Divider';
import {
  Flex,
  Row,
  Column,
  CenteredFlex,
  SpaceBetweenFlex,
  WrapFlex,
  ResponsiveFlex,
  FlexItem,
} from '@/components/hof/Flex';
import {
  Grid,
  GridItem,
  ResponsiveGrid,
  DashboardGrid,
  MasonryGrid,
  FormGrid,
} from '@/components/hof/Grid';
import {
  ScrollArea,
  VScrollArea,
  HScrollArea,
  AutoHideScrollArea,
  ThinScrollArea,
  CardScrollArea,
  ScrollToTopButton,
} from '@/components/hof/ScrollArea';
import {
  Spacer,
  VSpacer,
  HSpacer,
  FlexSpacer,
  TopSpacer,
  BottomSpacer,
  LeftSpacer,
  RightSpacer,
  SpacerGroup,
} from '@/components/hof/Spacer';
import { Stack, VStack, HStack, ResponsiveStack } from '@/components/hof/Stack';

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarStatusIndicator,
  AvatarGroup,
  QuantumAvatar,
  CosmicAvatar,
  GlowingAvatar,
  InteractiveAvatar,
} from '@/components/runes/Avatar';
import AvatarUpload from '@/components/runes/AvatarUpload';
import { Badge, BadgeGroup } from '@/components/runes/Badge';
import { Card, SmartCard } from '@/components/runes/Card';
import { EmptyState } from '@/components/runes/EmptyState';
import { ErrorBoundary } from '@/components/runes/ErrorBoundary';
import { Kbd, KbdGroup } from '@/components/runes/Kbd';
import { Progress, CircularProgress } from '@/components/runes/Progress';
import {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  ImageSkeleton,
  CardSkeletonShortcut,
  ButtonSkeleton,
  BadgeSkeleton,
  CardSkeletonComponent,
  ListSkeleton,
  ProfileSkeleton,
  DashboardSkeleton,
  ChatSkeleton,
} from '@/components/runes/Skeleton';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/runes/Table';
import { DifficultyBadge } from '@/components/runes/badges/DifficultyBadge';
import { PriceBadge } from '@/components/runes/badges/PriceBadge';
import { StatusBadge } from '@/components/runes/badges/StatusBadge';
import { TierBadge } from '@/components/runes/badges/TierBadge';
import { CardContent } from '@/components/runes/cards/CardContent';
import { CardFooter } from '@/components/runes/cards/CardFooter';
import { CardHeader } from '@/components/runes/cards/CardHeader';
import { CardMedia } from '@/components/runes/cards/CardMedia';
import { CardRibbon } from '@/components/runes/cards/CardRibbon';
import { CouncilCardRenderer } from '@/components/runes/cards/CouncilCardRenderer';
import { FileCardRenderer } from '@/components/runes/cards/FileCardRenderer';
import { InvitationCardRenderer } from '@/components/runes/cards/InvitationCardRenderer';
import { PathwayCardRenderer } from '@/components/runes/cards/PathwayCardRenderer';
import { PillarCardRenderer } from '@/components/runes/cards/PillarCardRenderer';
import { PrincipleCardRenderer } from '@/components/runes/cards/PrincipleCardRenderer';
import { ProductCardRenderer } from '@/components/runes/cards/ProductCardRenderer';
import { ProposalCardRenderer } from '@/components/runes/cards/ProposalCardRenderer';
import { QuestCardRenderer } from '@/components/runes/cards/QuestCardRenderer';
import { SchemaEnumCardRenderer } from '@/components/runes/cards/SchemaEnumCardRenderer';
import { SchemaFunctionCardRenderer } from '@/components/runes/cards/SchemaFunctionCardRenderer';
import { SchemaTableCardRenderer } from '@/components/runes/cards/SchemaTableCardRenderer';
import { StepCardRenderer } from '@/components/runes/cards/StepCardRenderer';
import { ValueCardRenderer } from '@/components/runes/cards/ValueCardRenderer';

import {
  Alert,
  InfoAlert,
  SuccessAlert,
  WarningAlert,
  ErrorAlert,
  QuantumAlert,
  AlertGroup,
} from '@/components/seidr/Alert';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/seidr/Dialog';
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FilterDrawer,
} from '@/components/seidr/Drawer';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ConfirmationModal,
} from '@/components/seidr/Modal';
import { ToastProvider, Toaster } from '@/components/seidr/Toast';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DarkTooltip,
  QuantumTooltip,
  CosmicTooltip,
  TooltipWithIcon,
  TooltipWithShortcut,
  TooltipGroup,
} from '@/components/seidr/Tooltip';
import { ConstellationViewer } from '@/components/seidr/immersive/ConstellationViewer';
import ContinuityBeam from '@/components/seidr/immersive/ContinuityBeam';
import EnvironmentLayer from '@/components/seidr/immersive/EnvironmentLayer';
import { EnvironmentPortal } from '@/components/seidr/immersive/EnvironmentPortal';
import Learscail from '@/components/seidr/immersive/Learscail';
import PanoramaViewer from '@/components/seidr/immersive/PanoramaViewer';
import { QuantumBackground } from '@/components/seidr/immersive/QuantumBackground';
import { StatusBar } from '@/components/seidr/immersive/StatusBar';
import { ZoomTarget } from '@/components/seidr/immersive/ZoomTarget';

import { Carousel } from '@/components/shapes/Carousel';
import { Gallery } from '@/components/shapes/Gallery';
import { Procession } from '@/components/shapes/Procession';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbWithDropdown,
} from '@/components/vegvisir/Breadcrumb';
import { FilterBar } from '@/components/vegvisir/FilterBar';
import {
  Pagination,
  CompactPagination,
  SimplePagination,
  PaginationInfo,
} from '@/components/vegvisir/Pagination';
import { SearchBar } from '@/components/vegvisir/SearchBar';
import {
  Sidebar,
  SidebarNavItem,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
} from '@/components/vegvisir/Sidebar';
import { SortDropdown } from '@/components/vegvisir/SortDropdown';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
  AnimatedTabsPanel,
  IconTabsTrigger,
  BadgeTabsTrigger,
} from '@/components/vegvisir/Tabs';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  IconAccordionTrigger,
  NestedAccordion,
} from '@/components/yggdrasil/Accordion';
import { Button, IconButton } from '@/components/yggdrasil/Button';
import { Inline } from '@/components/yggdrasil/Inline';
import { Label } from '@/components/yggdrasil/Label';
import { Spinner } from '@/components/yggdrasil/Spinner';

import type { CardData } from '@/types/components/runes/card.types';
import type { SortDirection } from '@/types/components/vegvisir/sort_dropdown.types';

export type Grouping =
  | 'bifrost'
  | 'forging'
  | 'hof'
  | 'runes'
  | 'seidr'
  | 'shapes'
  | 'vegvisir'
  | 'yggdrasil';

export interface RegistryEntry {
  /** The name the component is exported under. */
  name: string;
  grouping: Grouping;
  /** The module the component is imported from. */
  importPath: string;
  /** A minimal props example; absent when no example can render. */
  render?: () => ReactNode;
  /** What the entry needs before it can render. */
  note?: string;
}

export const GROUPINGS: readonly Grouping[] = [
  'bifrost',
  'forging',
  'hof',
  'runes',
  'seidr',
  'shapes',
  'vegvisir',
  'yggdrasil',
];

const BOX = 'rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-star-dust/70';

const valueCard: CardData = {
  id: 'demo-value',
  type: 'value',
  title: 'Sovereignty',
  description: 'A demo card.',
  value: '72%',
  trend: 'up',
  change: 4,
};

function SwitchDemo() {
  const [on, setOn] = useState(false);
  return <Switch label="Dyslexia-friendly mode" checked={on} onChange={setOn} />;
}

function RadioDemo() {
  const [choice, setChoice] = useState('one');
  return (
    <RadioGroup name="playground-radio" value={choice} onChange={setChoice}>
      <Radio value="one" label="One" />
      <Radio value="two" label="Two" />
    </RadioGroup>
  );
}

function ValidationField({ children }: { children?: ReactNode }) {
  return (
    <FormValidationProvider
      validateOnChange
      validators={[
        {
          field: 'email',
          validate: (value) => (String(value).includes('@') ? null : 'An address needs an @'),
        },
      ]}
    >
      <ValidatedInput name="email" label="Email" />
      {children}
    </FormValidationProvider>
  );
}

function FilterBarDemo() {
  const [selected, setSelected] = useState<string | null>('quests');
  return (
    <FilterBar
      options={[
        { id: 'quests', label: 'Quests', count: 12 },
        { id: 'lessons', label: 'Lessons', count: 5 },
      ]}
      selectedId={selected}
      onSelect={setSelected}
    />
  );
}

function SortDropdownDemo() {
  const [value, setValue] = useState('title');
  const [direction, setDirection] = useState<SortDirection>('asc');
  return (
    <SortDropdown
      options={[
        { id: 'title', label: 'Title' },
        { id: 'date', label: 'Date' },
      ]}
      value={value}
      direction={direction}
      onChange={(next, way) => {
        setValue(next);
        setDirection(way);
      }}
    />
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(2);
  return <Pagination currentPage={page} totalPages={6} onPageChange={setPage} />;
}

function CompactPaginationDemo() {
  const [page, setPage] = useState(2);
  return <CompactPagination currentPage={page} totalPages={6} onPageChange={setPage} />;
}

function SimplePaginationDemo() {
  const [page, setPage] = useState(2);
  return <SimplePagination currentPage={page} totalPages={6} onPageChange={setPage} />;
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>A drawer</DrawerHeader>
        <DrawerBody>Its body.</DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

function FilterDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open filters</Button>
      <FilterDrawer open={open} onClose={() => setOpen(false)} filters={{ realm: 'forge' }} />
    </>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>A modal</ModalHeader>
        <ModalBody>Its body.</ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function ConfirmationModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Ask for confirmation</Button>
      <ConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Release the draft?"
        description="The draft becomes readable by the community."
      />
    </>
  );
}

function ToasterDemo() {
  const [toasts, setToasts] = useState([
    { id: 'demo-toast', title: 'Saved', description: 'The change stands.' },
  ]);
  return (
    <>
      <Button
        onClick={() =>
          setToasts([{ id: 'demo-toast', title: 'Saved', description: 'The change stands.' }])
        }
      >
        Raise a toast
      </Button>
      <Toaster toasts={toasts} onClose={(id) => setToasts(toasts.filter((t) => t.id !== id))} />
    </>
  );
}

function SidebarWrap({ children }: { children?: ReactNode }) {
  return (
    <Sidebar
      items={[
        { id: 'home', label: 'Home', href: '/' },
        { id: 'forge', label: 'Forge', href: '/forge' },
      ]}
    >
      {children}
    </Sidebar>
  );
}

function DialogWhole({ children }: { children?: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>Open the dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>A dialog</DialogTitle>
          <DialogDescription>What it asks of the reader.</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TooltipWhole({ label }: { label: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{label}</TooltipTrigger>
        <TooltipContent>A tooltip.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const REGISTRY: readonly RegistryEntry[] = [
  // ── bifrost ──────────────────────────────────────────────────────────────
  { name: 'Footer', grouping: 'bifrost', importPath: '@/components/bifrost/Footer', render: () => <Footer /> },
  { name: 'Header', grouping: 'bifrost', importPath: '@/components/bifrost/Header', render: () => <Header /> },
  {
    name: 'LayoutChrome',
    grouping: 'bifrost',
    importPath: '@/components/bifrost/LayoutChrome',
    render: () => (
      <LayoutChrome>
        <p className={BOX}>The chrome wraps a route.</p>
      </LayoutChrome>
    ),
  },
  { name: 'LearscailScroll', grouping: 'bifrost', importPath: '@/components/bifrost/LearscailScroll', render: () => <LearscailScroll /> },
  { name: 'MapDialog', grouping: 'bifrost', importPath: '@/components/bifrost/MapDialog', render: () => <MapDialog /> },
  { name: 'MarkdownBio', grouping: 'bifrost', importPath: '@/components/bifrost/MarkdownBio', render: () => <MarkdownBio content={'### A bio\n\nWritten in markdown.'} /> },
  { name: 'Navigation', grouping: 'bifrost', importPath: '@/components/bifrost/Navigation', render: () => <Navigation /> },
  {
    name: 'Page',
    grouping: 'bifrost',
    importPath: '@/components/bifrost/Page',
    render: () => (
      <Page showForeground={false}>
        <p className={BOX}>A page carries an environment.</p>
      </Page>
    ),
  },
  { name: 'Section', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <Section><p className={BOX}>A section.</p></Section> },
  { name: 'MutedSection', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <MutedSection><p className={BOX}>A muted section.</p></MutedSection> },
  { name: 'GlowSection', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <GlowSection><p className={BOX}>A glowing section.</p></GlowSection> },
  { name: 'GradientSection', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <GradientSection><p className={BOX}>A gradient section.</p></GradientSection> },
  { name: 'GlassSection', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <GlassSection><p className={BOX}>A glass section.</p></GlassSection> },
  { name: 'HeroSection', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <HeroSection><p className={BOX}>A hero section.</p></HeroSection> },
  { name: 'SectionHeader', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <SectionHeader title="A section header" /> },
  { name: 'SectionDivider', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <BifrostSectionDivider /> },
  { name: 'SectionGroup', grouping: 'bifrost', importPath: '@/components/bifrost/Section', render: () => <SectionGroup><p className={BOX}>Sections grouped.</p></SectionGroup> },
  { name: 'StreetTree', grouping: 'bifrost', importPath: '@/components/bifrost/StreetTree', render: () => <StreetTree compact /> },

  // ── forging ──────────────────────────────────────────────────────────────
  { name: 'Checkbox', grouping: 'forging', importPath: '@/components/forging/Checkbox', render: () => <Checkbox label="Keep me signed in" /> },
  {
    name: 'CheckboxGroup',
    grouping: 'forging',
    importPath: '@/components/forging/Checkbox',
    render: () => (
      <CheckboxGroup
        options={[
          { value: 'quiet', label: 'Quiet hours' },
          { value: 'motion', label: 'Reduced motion' },
        ]}
      />
    ),
  },
  { name: 'Form', grouping: 'forging', importPath: '@/components/forging/Form', render: () => <Form><Input label="Display name" /></Form> },
  { name: 'FormActions', grouping: 'forging', importPath: '@/components/forging/Form', render: () => <FormActions><Button>Save</Button></FormActions> },
  { name: 'FormField', grouping: 'forging', importPath: '@/components/forging/FormField', render: () => <FormField label="Display name"><Input /></FormField> },
  { name: 'FormValidationProvider', grouping: 'forging', importPath: '@/components/forging/FormValidation', render: () => <ValidationField /> },
  { name: 'ValidatedInput', grouping: 'forging', importPath: '@/components/forging/FormValidation', render: () => <ValidationField /> },
  { name: 'ValidationSummary', grouping: 'forging', importPath: '@/components/forging/FormValidation', render: () => <ValidationField><ContextValidationSummary /></ValidationField> },
  { name: 'ValidationSuccess', grouping: 'forging', importPath: '@/components/forging/FormValidation', render: () => <ValidationField><ContextValidationSuccess message="Every field is valid" /></ValidationField> },
  { name: 'Input', grouping: 'forging', importPath: '@/components/forging/Input', render: () => <Input label="Display name" placeholder="How shall you be known?" /> },
  { name: 'RadioGroup', grouping: 'forging', importPath: '@/components/forging/Radio', render: () => <RadioDemo /> },
  { name: 'Radio', grouping: 'forging', importPath: '@/components/forging/Radio', render: () => <RadioDemo /> },
  {
    name: 'Select',
    grouping: 'forging',
    importPath: '@/components/forging/Select',
    render: () => (
      <Select
        label="Variant"
        defaultValue="primary"
        options={[
          { value: 'primary', label: 'primary' },
          { value: 'secondary', label: 'secondary' },
        ]}
      />
    ),
  },
  { name: 'Slider', grouping: 'forging', importPath: '@/components/forging/Slider', render: () => <Slider label="Intensity" defaultValue={40} /> },
  { name: 'Switch', grouping: 'forging', importPath: '@/components/forging/Switch', render: () => <SwitchDemo /> },
  { name: 'Textarea', grouping: 'forging', importPath: '@/components/forging/Textarea', render: () => <Textarea label="A note" placeholder="Write here" /> },
  { name: 'ValidationSuccess', grouping: 'forging', importPath: '@/components/forging/forms/ValidationSuccess', render: () => <ValidationField><ValidationSuccess message="Every field is valid" /></ValidationField> },
  { name: 'ValidationSummary', grouping: 'forging', importPath: '@/components/forging/forms/ValidationSummary', render: () => <ValidationField><ValidationSummary /></ValidationField> },

  // ── hof ──────────────────────────────────────────────────────────────────
  { name: 'AspectRatio', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <AspectRatio className="w-48"><div className={BOX}>16 by 9</div></AspectRatio> },
  { name: 'SquareRatio', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <SquareRatio className="w-32"><div className={BOX}>Square</div></SquareRatio> },
  { name: 'PhotoRatio', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <PhotoRatio className="w-40"><div className={BOX}>Photo</div></PhotoRatio> },
  { name: 'VideoRatio', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <VideoRatio className="w-48"><div className={BOX}>Video</div></VideoRatio> },
  { name: 'VerticalVideoRatio', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <VerticalVideoRatio className="w-24"><div className={BOX}>Vertical</div></VerticalVideoRatio> },
  { name: 'GoldenRatio', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <GoldenRatio className="w-40"><div className={BOX}>Golden</div></GoldenRatio> },
  { name: 'PortraitRatio', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <PortraitRatio className="w-28"><div className={BOX}>Portrait</div></PortraitRatio> },
  { name: 'AspectRatioImage', grouping: 'hof', importPath: '@/components/hof/AspectRatio', render: () => <AspectRatioImage className="w-40" src="/images/logo.png" alt="The sanctuary mark" /> },
  { name: 'AspectRatioVideo', grouping: 'hof', importPath: '@/components/hof/AspectRatio', note: 'Needs a video file; public/ carries none.' },
  { name: 'AspectRatioEmbed', grouping: 'hof', importPath: '@/components/hof/AspectRatio', note: 'Needs an embeddable URL and a title.' },
  { name: 'Container', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <Container><p className={BOX}>Held.</p></Container> },
  { name: 'PageContainer', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <PageContainer><p className={BOX}>A page width.</p></PageContainer> },
  { name: 'SectionContainer', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <SectionContainer><p className={BOX}>A section width.</p></SectionContainer> },
  { name: 'NarrowContainer', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <NarrowContainer><p className={BOX}>Narrow.</p></NarrowContainer> },
  { name: 'WideContainer', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <WideContainer><p className={BOX}>Wide.</p></WideContainer> },
  { name: 'HeroContainer', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <HeroContainer><p className={BOX}>A hero width.</p></HeroContainer> },
  { name: 'FooterContainer', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <FooterContainer><p className={BOX}>A footer width.</p></FooterContainer> },
  { name: 'ContainerHeader', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <ContainerHeader><p className={BOX}>A header row.</p></ContainerHeader> },
  { name: 'ContainerBody', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <ContainerBody><p className={BOX}>A body.</p></ContainerBody> },
  { name: 'ContainerFooter', grouping: 'hof', importPath: '@/components/hof/Container', render: () => <ContainerFooter><p className={BOX}>A footer row.</p></ContainerFooter> },
  { name: 'Divider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <Divider /> },
  { name: 'LightDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <LightDivider /> },
  { name: 'SubtleDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <SubtleDivider /> },
  { name: 'BoldDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <BoldDivider /> },
  { name: 'GlowDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <GlowDivider /> },
  { name: 'GradientDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <GradientDivider /> },
  { name: 'VerticalDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <div className="flex h-16 items-center gap-4"><span className="text-sm text-star-dust/70">left</span><VerticalDivider /><span className="text-sm text-star-dust/70">right</span></div> },
  { name: 'DashedDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <DashedDivider /> },
  { name: 'DottedDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <DottedDivider /> },
  { name: 'DividerWithText', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <DividerWithText text="or" /> },
  { name: 'SectionDivider', grouping: 'hof', importPath: '@/components/hof/Divider', render: () => <HofSectionDivider title="A section" /> },
  { name: 'Flex', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <Flex><p className={BOX}>one</p><p className={BOX}>two</p></Flex> },
  { name: 'Row', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <Row><p className={BOX}>one</p><p className={BOX}>two</p></Row> },
  { name: 'Column', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <Column><p className={BOX}>one</p><p className={BOX}>two</p></Column> },
  { name: 'CenteredFlex', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <CenteredFlex><p className={BOX}>centred</p></CenteredFlex> },
  { name: 'SpaceBetweenFlex', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <SpaceBetweenFlex><p className={BOX}>left</p><p className={BOX}>right</p></SpaceBetweenFlex> },
  { name: 'WrapFlex', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <WrapFlex><p className={BOX}>one</p><p className={BOX}>two</p><p className={BOX}>three</p></WrapFlex> },
  { name: 'ResponsiveFlex', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <ResponsiveFlex><p className={BOX}>one</p><p className={BOX}>two</p></ResponsiveFlex> },
  { name: 'FlexItem', grouping: 'hof', importPath: '@/components/hof/Flex', render: () => <Flex><FlexItem><p className={BOX}>an item</p></FlexItem></Flex> },
  { name: 'Grid', grouping: 'hof', importPath: '@/components/hof/Grid', render: () => <Grid><p className={BOX}>one</p><p className={BOX}>two</p></Grid> },
  { name: 'GridItem', grouping: 'hof', importPath: '@/components/hof/Grid', render: () => <Grid><GridItem><p className={BOX}>a cell</p></GridItem></Grid> },
  { name: 'ResponsiveGrid', grouping: 'hof', importPath: '@/components/hof/Grid', render: () => <ResponsiveGrid><p className={BOX}>one</p><p className={BOX}>two</p></ResponsiveGrid> },
  { name: 'DashboardGrid', grouping: 'hof', importPath: '@/components/hof/Grid', render: () => <DashboardGrid><p className={BOX}>one</p><p className={BOX}>two</p></DashboardGrid> },
  { name: 'MasonryGrid', grouping: 'hof', importPath: '@/components/hof/Grid', render: () => <MasonryGrid><p className={BOX}>one</p><p className={BOX}>two</p></MasonryGrid> },
  { name: 'FormGrid', grouping: 'hof', importPath: '@/components/hof/Grid', render: () => <FormGrid><Input label="First" /><Input label="Second" /></FormGrid> },
  { name: 'ScrollArea', grouping: 'hof', importPath: '@/components/hof/ScrollArea', render: () => <ScrollArea className="h-24"><p className={BOX}>A tall body in a short frame.</p><p className={BOX}>More body.</p><p className={BOX}>Still more.</p></ScrollArea> },
  { name: 'VScrollArea', grouping: 'hof', importPath: '@/components/hof/ScrollArea', render: () => <VScrollArea className="h-24"><p className={BOX}>one</p><p className={BOX}>two</p><p className={BOX}>three</p></VScrollArea> },
  { name: 'HScrollArea', grouping: 'hof', importPath: '@/components/hof/ScrollArea', render: () => <HScrollArea className="w-48"><div className="flex gap-2 w-[40rem]"><p className={BOX}>one</p><p className={BOX}>two</p></div></HScrollArea> },
  { name: 'AutoHideScrollArea', grouping: 'hof', importPath: '@/components/hof/ScrollArea', render: () => <AutoHideScrollArea className="h-24"><p className={BOX}>one</p><p className={BOX}>two</p><p className={BOX}>three</p></AutoHideScrollArea> },
  { name: 'ThinScrollArea', grouping: 'hof', importPath: '@/components/hof/ScrollArea', render: () => <ThinScrollArea className="h-24"><p className={BOX}>one</p><p className={BOX}>two</p><p className={BOX}>three</p></ThinScrollArea> },
  { name: 'CardScrollArea', grouping: 'hof', importPath: '@/components/hof/ScrollArea', render: () => <CardScrollArea className="h-24"><p className={BOX}>one</p><p className={BOX}>two</p><p className={BOX}>three</p></CardScrollArea> },
  { name: 'ScrollToTopButton', grouping: 'hof', importPath: '@/components/hof/ScrollArea', render: () => <ScrollToTopButton /> },
  { name: 'ScrollIndicator', grouping: 'hof', importPath: '@/components/hof/ScrollArea', note: 'Needs a ref to a scrolling parent; renders nothing without one.' },
  { name: 'Spacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex flex-col"><p className={BOX}>above</p><Spacer /><p className={BOX}>below</p></div> },
  { name: 'VSpacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex flex-col"><p className={BOX}>above</p><VSpacer /><p className={BOX}>below</p></div> },
  { name: 'HSpacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex"><p className={BOX}>left</p><HSpacer /><p className={BOX}>right</p></div> },
  { name: 'FlexSpacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex"><p className={BOX}>left</p><FlexSpacer /><p className={BOX}>right</p></div> },
  { name: 'TopSpacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex flex-col"><TopSpacer /><p className={BOX}>under a top spacer</p></div> },
  { name: 'BottomSpacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex flex-col"><p className={BOX}>over a bottom spacer</p><BottomSpacer /></div> },
  { name: 'LeftSpacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex"><LeftSpacer /><p className={BOX}>right of a left spacer</p></div> },
  { name: 'RightSpacer', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <div className="flex"><p className={BOX}>left of a right spacer</p><RightSpacer /></div> },
  { name: 'SpacerGroup', grouping: 'hof', importPath: '@/components/hof/Spacer', render: () => <SpacerGroup><p className={BOX}>one</p><p className={BOX}>two</p></SpacerGroup> },
  { name: 'Stack', grouping: 'hof', importPath: '@/components/hof/Stack', render: () => <Stack><p className={BOX}>one</p><p className={BOX}>two</p></Stack> },
  { name: 'VStack', grouping: 'hof', importPath: '@/components/hof/Stack', render: () => <VStack><p className={BOX}>one</p><p className={BOX}>two</p></VStack> },
  { name: 'HStack', grouping: 'hof', importPath: '@/components/hof/Stack', render: () => <HStack><p className={BOX}>one</p><p className={BOX}>two</p></HStack> },
  { name: 'ResponsiveStack', grouping: 'hof', importPath: '@/components/hof/Stack', render: () => <ResponsiveStack><p className={BOX}>one</p><p className={BOX}>two</p></ResponsiveStack> },

  // ── runes ────────────────────────────────────────────────────────────────
  { name: 'Avatar', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <Avatar src="/images/logo.png" alt="The sanctuary mark" /> },
  { name: 'AvatarImage', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <Avatar><AvatarImage src="/images/logo.png" alt="The sanctuary mark" /></Avatar> },
  { name: 'AvatarFallback', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <Avatar><AvatarFallback>KP</AvatarFallback></Avatar> },
  { name: 'AvatarBadge', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <Avatar><AvatarFallback>KP</AvatarFallback><AvatarBadge>3</AvatarBadge></Avatar> },
  { name: 'AvatarStatusIndicator', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <Avatar><AvatarFallback>KP</AvatarFallback><AvatarStatusIndicator status="online" /></Avatar> },
  { name: 'AvatarGroup', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <AvatarGroup><Avatar><AvatarFallback>KP</AvatarFallback></Avatar><Avatar><AvatarFallback>AE</AvatarFallback></Avatar></AvatarGroup> },
  { name: 'QuantumAvatar', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <QuantumAvatar><AvatarFallback>KP</AvatarFallback></QuantumAvatar> },
  { name: 'CosmicAvatar', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <CosmicAvatar><AvatarFallback>KP</AvatarFallback></CosmicAvatar> },
  { name: 'GlowingAvatar', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <GlowingAvatar><AvatarFallback>KP</AvatarFallback></GlowingAvatar> },
  { name: 'InteractiveAvatar', grouping: 'runes', importPath: '@/components/runes/Avatar', render: () => <InteractiveAvatar><AvatarFallback>KP</AvatarFallback></InteractiveAvatar> },
  { name: 'AvatarUpload', grouping: 'runes', importPath: '@/components/runes/AvatarUpload', render: () => <AvatarUpload userId="playground" onUploadComplete={() => undefined} /> },
  { name: 'Badge', grouping: 'runes', importPath: '@/components/runes/Badge', render: () => <Badge>New</Badge> },
  { name: 'BadgeGroup', grouping: 'runes', importPath: '@/components/runes/Badge', render: () => <BadgeGroup><Badge>One</Badge><Badge>Two</Badge></BadgeGroup> },
  { name: 'Card', grouping: 'runes', importPath: '@/components/runes/Card', render: () => <Card data={valueCard} variant="glass" radius="lg" shadow="md" className="p-6 max-w-sm">A card.</Card> },
  { name: 'SmartCard', grouping: 'runes', importPath: '@/components/runes/Card', render: () => <SmartCard data={valueCard} radius="lg" shadow="md" className="max-w-sm" /> },
  { name: 'EmptyState', grouping: 'runes', importPath: '@/components/runes/EmptyState', render: () => <EmptyState title="Nothing here yet" description="What lands here will show." icon={<Star size={20} />} /> },
  { name: 'ErrorBoundary', grouping: 'runes', importPath: '@/components/runes/ErrorBoundary', render: () => <ErrorBoundary><p className={BOX}>Guarded children.</p></ErrorBoundary> },
  { name: 'Kbd', grouping: 'runes', importPath: '@/components/runes/Kbd', render: () => <Kbd>Esc</Kbd> },
  { name: 'KbdGroup', grouping: 'runes', importPath: '@/components/runes/Kbd', render: () => <KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup> },
  { name: 'Progress', grouping: 'runes', importPath: '@/components/runes/Progress', render: () => <Progress value={65} /> },
  { name: 'CircularProgress', grouping: 'runes', importPath: '@/components/runes/Progress', render: () => <CircularProgress value={65} /> },
  { name: 'Skeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <Skeleton className="h-6 w-40" /> },
  { name: 'TextSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <TextSkeleton className="w-40" /> },
  { name: 'AvatarSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <AvatarSkeleton /> },
  { name: 'ImageSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <ImageSkeleton className="h-24 w-40" /> },
  { name: 'CardSkeletonShortcut', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <CardSkeletonShortcut className="w-48" /> },
  { name: 'ButtonSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <ButtonSkeleton /> },
  { name: 'BadgeSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <BadgeSkeleton /> },
  { name: 'CardSkeletonComponent', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <CardSkeletonComponent className="w-64" /> },
  { name: 'ListSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <ListSkeleton className="w-64" /> },
  { name: 'ProfileSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <ProfileSkeleton className="w-64" /> },
  { name: 'DashboardSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <DashboardSkeleton className="w-full" /> },
  { name: 'ChatSkeleton', grouping: 'runes', importPath: '@/components/runes/Skeleton', render: () => <ChatSkeleton className="w-64" /> },
  {
    name: 'Table',
    grouping: 'runes',
    importPath: '@/components/runes/Table',
    render: () => (
      <Table>
        <TableCaption>Two realms.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Realm</TableHead>
            <TableHead>Kind</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>AudHDities</TableCell>
            <TableCell>Next</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>One row</TableCell>
            <TableCell>shown</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    ),
  },
  { name: 'TableHeader', grouping: 'runes', importPath: '@/components/runes/Table', render: () => <Table><TableHeader><TableRow><TableHead>Realm</TableHead></TableRow></TableHeader></Table> },
  { name: 'TableBody', grouping: 'runes', importPath: '@/components/runes/Table', render: () => <Table><TableBody><TableRow><TableCell>AudHDities</TableCell></TableRow></TableBody></Table> },
  { name: 'TableFooter', grouping: 'runes', importPath: '@/components/runes/Table', render: () => <Table><TableFooter><TableRow><TableCell>One realm</TableCell></TableRow></TableFooter></Table> },
  { name: 'TableRow', grouping: 'runes', importPath: '@/components/runes/Table', render: () => <Table><TableBody><TableRow><TableCell>A row</TableCell></TableRow></TableBody></Table> },
  { name: 'TableHead', grouping: 'runes', importPath: '@/components/runes/Table', render: () => <Table><TableHeader><TableRow><TableHead>A head</TableHead></TableRow></TableHeader></Table> },
  { name: 'TableCell', grouping: 'runes', importPath: '@/components/runes/Table', render: () => <Table><TableBody><TableRow><TableCell>A cell</TableCell></TableRow></TableBody></Table> },
  { name: 'TableCaption', grouping: 'runes', importPath: '@/components/runes/Table', render: () => <Table><TableCaption>A caption.</TableCaption><TableBody><TableRow><TableCell>A cell</TableCell></TableRow></TableBody></Table> },
  { name: 'DifficultyBadge', grouping: 'runes', importPath: '@/components/runes/badges/DifficultyBadge', render: () => <DifficultyBadge difficulty="beginner" /> },
  { name: 'PriceBadge', grouping: 'runes', importPath: '@/components/runes/badges/PriceBadge', render: () => <PriceBadge data={{ priceCommunity: 8, priceAlly: 16, priceCorporate: 32 }} /> },
  { name: 'StatusBadge', grouping: 'runes', importPath: '@/components/runes/badges/StatusBadge', render: () => <StatusBadge status="active" /> },
  { name: 'TierBadge', grouping: 'runes', importPath: '@/components/runes/badges/TierBadge', render: () => <TierBadge tier="community" /> },
  { name: 'CardContent', grouping: 'runes', importPath: '@/components/runes/cards/CardContent', render: () => <CardContent description="What the card carries." metadata={[{ label: 'Realm', value: 'AudHDities' }]} /> },
  { name: 'CardFooter', grouping: 'runes', importPath: '@/components/runes/cards/CardFooter', render: () => <CardFooter actions={[<Button key="open">Open</Button>]} /> },
  { name: 'CardHeader', grouping: 'runes', importPath: '@/components/runes/cards/CardHeader', render: () => <CardHeader title="A card header" subtitle="and its subtitle" badge={<Badge>New</Badge>} /> },
  { name: 'CardMedia', grouping: 'runes', importPath: '@/components/runes/cards/CardMedia', render: () => <CardMedia src="/images/logo.png" alt="The sanctuary mark" /> },
  { name: 'CardRibbon', grouping: 'runes', importPath: '@/components/runes/cards/CardRibbon', render: () => <div className="relative h-24 w-48 overflow-hidden rounded-lg border border-white/10"><CardRibbon text="New" /></div> },
  { name: 'CouncilCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/CouncilCardRenderer', render: () => <CouncilCardRenderer data={{ id: 'c', type: 'council', title: 'The Council', description: 'Seats and their hours.', members: 7 }} radius="lg" /> },
  { name: 'FileCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/FileCardRenderer', render: () => <FileCardRenderer data={{ id: 'f', type: 'file', title: 'plan.md', fileType: 'md', size: 4096 }} radius="lg" /> },
  { name: 'InvitationCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/InvitationCardRenderer', render: () => <InvitationCardRenderer data={{ id: 'i', type: 'invitation', title: 'An invitation', inviter: 'The Weaver' }} radius="lg" /> },
  { name: 'PathwayCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/PathwayCardRenderer', render: () => <PathwayCardRenderer data={{ id: 'p', type: 'pathway', title: 'A pathway', progress: 40, modules: 5, completedModules: 2 }} radius="lg" /> },
  { name: 'PillarCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/PillarCardRenderer', render: () => <PillarCardRenderer data={{ id: 'pi', type: 'pillar', title: 'Sovereignty', description: 'A pillar of the house.', order: 1 }} radius="lg" /> },
  { name: 'PrincipleCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/PrincipleCardRenderer', render: () => <PrincipleCardRenderer data={{ id: 'pr', type: 'principle', title: 'Consent gates every door.', order: 1 }} radius="lg" /> },
  { name: 'ProductCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/ProductCardRenderer', render: () => <ProductCardRenderer data={{ id: 'pd', type: 'product', title: 'A product', priceCommunity: 8, priceAlly: 16 }} radius="lg" /> },
  { name: 'ProposalCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/ProposalCardRenderer', render: () => <ProposalCardRenderer data={{ id: 'pp', type: 'proposal', title: 'A proposal', status: 'active', votesFor: 12, votesAgainst: 3 }} radius="lg" /> },
  { name: 'QuestCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/QuestCardRenderer', render: () => <QuestCardRenderer data={{ id: 'q', type: 'quest', title: 'A quest', difficulty: 'beginner', reward: 50 }} radius="lg" /> },
  { name: 'SchemaEnumCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/SchemaEnumCardRenderer', render: () => <SchemaEnumCardRenderer data={{ id: 'se', type: 'schema-enum', title: 'tier', values: ['community', 'ally'], valueCount: 2 }} radius="lg" /> },
  { name: 'SchemaFunctionCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/SchemaFunctionCardRenderer', render: () => <SchemaFunctionCardRenderer data={{ id: 'sf', type: 'schema-function', title: 'award_sigil', parameters: ['vessel_id'], returnType: 'void' }} radius="lg" /> },
  { name: 'SchemaTableCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/SchemaTableCardRenderer', render: () => <SchemaTableCardRenderer data={{ id: 'st', type: 'schema-table', title: 'community_profiles', columns: 18, rows: 120 }} radius="lg" /> },
  { name: 'StepCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/StepCardRenderer', render: () => <StepCardRenderer data={{ id: 's', type: 'step', title: 'A step', stepNumber: 1, totalSteps: 3 }} radius="lg" /> },
  { name: 'ValueCardRenderer', grouping: 'runes', importPath: '@/components/runes/cards/ValueCardRenderer', render: () => <ValueCardRenderer data={valueCard} radius="lg" /> },

  // ── seidr ────────────────────────────────────────────────────────────────
  { name: 'Alert', grouping: 'seidr', importPath: '@/components/seidr/Alert', render: () => <Alert title="Heard" description="A plain alert." /> },
  { name: 'InfoAlert', grouping: 'seidr', importPath: '@/components/seidr/Alert', render: () => <InfoAlert title="For your notice" description="An informing alert." /> },
  { name: 'SuccessAlert', grouping: 'seidr', importPath: '@/components/seidr/Alert', render: () => <SuccessAlert title="Saved" description="The change stands." /> },
  { name: 'WarningAlert', grouping: 'seidr', importPath: '@/components/seidr/Alert', render: () => <WarningAlert title="Careful" description="This one is irreversible." /> },
  { name: 'ErrorAlert', grouping: 'seidr', importPath: '@/components/seidr/Alert', render: () => <ErrorAlert title="Refused" description="The door did not open." /> },
  { name: 'QuantumAlert', grouping: 'seidr', importPath: '@/components/seidr/Alert', render: () => <QuantumAlert title="Entangled" description="Two states at once." /> },
  { name: 'AlertGroup', grouping: 'seidr', importPath: '@/components/seidr/Alert', render: () => <AlertGroup><InfoAlert title="One" description="First." /><SuccessAlert title="Two" description="Second." /></AlertGroup> },
  { name: 'Dialog', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogTrigger', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogContent', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogHeader', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogTitle', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogDescription', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogFooter', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogClose', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <DialogWhole /> },
  { name: 'DialogPortal', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <Dialog><DialogTrigger>Open the dialog</DialogTrigger><DialogPortal><DialogContent><DialogTitle>A portalled dialog</DialogTitle></DialogContent></DialogPortal></Dialog> },
  { name: 'DialogOverlay', grouping: 'seidr', importPath: '@/components/seidr/Dialog', render: () => <Dialog><DialogTrigger>Open the dialog</DialogTrigger><DialogPortal><DialogOverlay /><DialogContent><DialogTitle>A dialog behind an overlay</DialogTitle></DialogContent></DialogPortal></Dialog> },
  { name: 'Drawer', grouping: 'seidr', importPath: '@/components/seidr/Drawer', render: () => <DrawerDemo /> },
  { name: 'DrawerHeader', grouping: 'seidr', importPath: '@/components/seidr/Drawer', render: () => <DrawerDemo /> },
  { name: 'DrawerBody', grouping: 'seidr', importPath: '@/components/seidr/Drawer', render: () => <DrawerDemo /> },
  { name: 'DrawerFooter', grouping: 'seidr', importPath: '@/components/seidr/Drawer', render: () => <DrawerDemo /> },
  { name: 'FilterDrawer', grouping: 'seidr', importPath: '@/components/seidr/Drawer', render: () => <FilterDrawerDemo /> },
  { name: 'Modal', grouping: 'seidr', importPath: '@/components/seidr/Modal', render: () => <ModalDemo /> },
  { name: 'ModalHeader', grouping: 'seidr', importPath: '@/components/seidr/Modal', render: () => <ModalDemo /> },
  { name: 'ModalBody', grouping: 'seidr', importPath: '@/components/seidr/Modal', render: () => <ModalDemo /> },
  { name: 'ModalFooter', grouping: 'seidr', importPath: '@/components/seidr/Modal', render: () => <ModalDemo /> },
  { name: 'ConfirmationModal', grouping: 'seidr', importPath: '@/components/seidr/Modal', render: () => <ConfirmationModalDemo /> },
  { name: 'ToastProvider', grouping: 'seidr', importPath: '@/components/seidr/Toast', render: () => <ToastProvider><p className={BOX}>The toast seam wraps a tree.</p></ToastProvider> },
  { name: 'Toaster', grouping: 'seidr', importPath: '@/components/seidr/Toast', render: () => <ToasterDemo /> },
  { name: 'TooltipProvider', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipWhole label="Hover for a tooltip" /> },
  { name: 'Tooltip', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipWhole label="Hover for a tooltip" /> },
  { name: 'TooltipTrigger', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipWhole label="The trigger" /> },
  { name: 'TooltipContent', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipWhole label="The content hangs above" /> },
  { name: 'DarkTooltip', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipProvider><DarkTooltip><TooltipTrigger>Dark</TooltipTrigger><TooltipContent>A dark tooltip.</TooltipContent></DarkTooltip></TooltipProvider> },
  { name: 'QuantumTooltip', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipProvider><QuantumTooltip><TooltipTrigger>Quantum</TooltipTrigger><TooltipContent>A quantum tooltip.</TooltipContent></QuantumTooltip></TooltipProvider> },
  { name: 'CosmicTooltip', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipProvider><CosmicTooltip><TooltipTrigger>Cosmic</TooltipTrigger><TooltipContent>A cosmic tooltip.</TooltipContent></CosmicTooltip></TooltipProvider> },
  { name: 'TooltipWithIcon', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipProvider><TooltipWithIcon icon={<Info size={16} />} content="What the icon means." /></TooltipProvider> },
  { name: 'TooltipWithShortcut', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipProvider><TooltipWithShortcut label="Search" shortcut="Ctrl K" /></TooltipProvider> },
  { name: 'TooltipGroup', grouping: 'seidr', importPath: '@/components/seidr/Tooltip', render: () => <TooltipProvider><TooltipGroup><TooltipWithIcon icon={<Info size={16} />} content="One." /><TooltipWithIcon icon={<Bell size={16} />} content="Two." /></TooltipGroup></TooltipProvider> },
  {
    name: 'ConstellationViewer',
    grouping: 'seidr',
    importPath: '@/components/seidr/immersive/ConstellationViewer',
    render: () => (
      <ConstellationViewer
        nodes={[
          { id: 'a', x: 20, y: 30, label: 'Hearth' },
          { id: 'b', x: 70, y: 60, label: 'Forge' },
        ]}
        edges={[{ from: 'a', to: 'b', strength: 0.6 }]}
      />
    ),
  },
  { name: 'ContinuityBeam', grouping: 'seidr', importPath: '@/components/seidr/immersive/ContinuityBeam', render: () => <ContinuityBeam /> },
  { name: 'EnvironmentLayer', grouping: 'seidr', importPath: '@/components/seidr/immersive/EnvironmentLayer', render: () => <EnvironmentLayer environment="home" /> },
  { name: 'EnvironmentPortal', grouping: 'seidr', importPath: '@/components/seidr/immersive/EnvironmentPortal', render: () => <EnvironmentPortal from="home" to="library"><p className={BOX}>Walked from one environment to another.</p></EnvironmentPortal> },
  { name: 'Learscail', grouping: 'seidr', importPath: '@/components/seidr/immersive/Learscail', render: () => <Learscail /> },
  { name: 'PanoramaViewer', grouping: 'seidr', importPath: '@/components/seidr/immersive/PanoramaViewer', render: () => <PanoramaViewer environment="home" /> },
  { name: 'QuantumBackground', grouping: 'seidr', importPath: '@/components/seidr/immersive/QuantumBackground', render: () => <QuantumBackground environment="home" /> },
  { name: 'StatusBar', grouping: 'seidr', importPath: '@/components/seidr/immersive/StatusBar', render: () => <StatusBar /> },
  { name: 'ZoomTarget', grouping: 'seidr', importPath: '@/components/seidr/immersive/ZoomTarget', render: () => <ZoomTarget target="a-mark"><p className={BOX}>Zoomable.</p></ZoomTarget> },

  // ── shapes ───────────────────────────────────────────────────────────────
  {
    name: 'Carousel',
    grouping: 'shapes',
    importPath: '@/components/shapes/Carousel',
    render: () => (
      <Carousel
        label="A rail of stops"
        stops={[
          { id: 'one', title: 'First stop' },
          { id: 'two', title: 'Second stop' },
          { id: 'three', title: 'Third stop' },
        ]}
      >
        {(stop) => <div className={BOX}>{stop.title}</div>}
      </Carousel>
    ),
  },
  {
    name: 'Gallery',
    grouping: 'shapes',
    importPath: '@/components/shapes/Gallery',
    render: () => (
      <Gallery
        label="Filter the gallery"
        items={[
          { id: 'hearth', name: 'Hearth' },
          { id: 'forge', name: 'Forge' },
        ]}
        config={{
          searchIn: [(item) => item.name],
          card: {
            id: (item) => item.id,
            title: (item) => item.name,
            address: () => '/playground',
          },
          empty: { silent: 'Nothing stands here yet.', unmatched: 'Nothing matches that.' },
        }}
      />
    ),
  },
  {
    name: 'Procession',
    grouping: 'shapes',
    importPath: '@/components/shapes/Procession',
    render: () => (
      <Procession
        label="A corridor"
        sections={[
          {
            id: 'section',
            title: 'A section',
            rooms: [
              { id: 'one', name: 'First room' },
              { id: 'two', name: 'Second room' },
            ],
          },
        ]}
      >
        {(room) => <div className={BOX}>{room.name}</div>}
      </Procession>
    ),
  },

  // ── vegvisir ─────────────────────────────────────────────────────────────
  { name: 'Breadcrumb', grouping: 'vegvisir', importPath: '@/components/vegvisir/Breadcrumb', render: () => <Breadcrumb items={[{ label: 'Sanctuary', href: '/' }, { label: 'Playground', isCurrent: true }]} /> },
  { name: 'BreadcrumbItem', grouping: 'vegvisir', importPath: '@/components/vegvisir/Breadcrumb', render: () => <BreadcrumbList><BreadcrumbItem label="Sanctuary" href="/" /><BreadcrumbItem label="Playground" isCurrent isLast /></BreadcrumbList> },
  { name: 'BreadcrumbSeparator', grouping: 'vegvisir', importPath: '@/components/vegvisir/Breadcrumb', render: () => <BreadcrumbList><BreadcrumbItem label="Sanctuary" href="/" /><BreadcrumbSeparator /><BreadcrumbItem label="Playground" isCurrent isLast /></BreadcrumbList> },
  { name: 'BreadcrumbList', grouping: 'vegvisir', importPath: '@/components/vegvisir/Breadcrumb', render: () => <BreadcrumbList><BreadcrumbItem label="Sanctuary" href="/" /><BreadcrumbItem label="Playground" isCurrent isLast /></BreadcrumbList> },
  { name: 'BreadcrumbWithDropdown', grouping: 'vegvisir', importPath: '@/components/vegvisir/Breadcrumb', render: () => <BreadcrumbWithDropdown maxItems={2} items={[{ label: 'Sanctuary', href: '/' }, { label: 'Cosmic', href: '/playground' }, { label: 'Playground', isCurrent: true }]} /> },
  { name: 'FilterBar', grouping: 'vegvisir', importPath: '@/components/vegvisir/FilterBar', render: () => <FilterBarDemo /> },
  { name: 'Pagination', grouping: 'vegvisir', importPath: '@/components/vegvisir/Pagination', render: () => <PaginationDemo /> },
  { name: 'CompactPagination', grouping: 'vegvisir', importPath: '@/components/vegvisir/Pagination', render: () => <CompactPaginationDemo /> },
  { name: 'SimplePagination', grouping: 'vegvisir', importPath: '@/components/vegvisir/Pagination', render: () => <SimplePaginationDemo /> },
  { name: 'PaginationInfo', grouping: 'vegvisir', importPath: '@/components/vegvisir/Pagination', render: () => <PaginationInfo currentPage={2} pageSize={10} totalItems={64} /> },
  { name: 'SearchBar', grouping: 'vegvisir', importPath: '@/components/vegvisir/SearchBar', render: () => <SearchBar onSearch={() => undefined} placeholder="Search the sanctuary" /> },
  { name: 'Sidebar', grouping: 'vegvisir', importPath: '@/components/vegvisir/Sidebar', render: () => <SidebarWrap /> },
  { name: 'SidebarNavItem', grouping: 'vegvisir', importPath: '@/components/vegvisir/Sidebar', render: () => <SidebarWrap><SidebarNavItem item={{ id: 'forge', label: 'Forge', href: '/forge' }} /></SidebarWrap> },
  { name: 'SidebarGroup', grouping: 'vegvisir', importPath: '@/components/vegvisir/Sidebar', render: () => <SidebarWrap><SidebarGroup label="Rooms"><SidebarNavItem item={{ id: 'forge', label: 'Forge', href: '/forge' }} /></SidebarGroup></SidebarWrap> },
  { name: 'SidebarHeader', grouping: 'vegvisir', importPath: '@/components/vegvisir/Sidebar', render: () => <SidebarWrap><SidebarHeader brand="AudHDities" /></SidebarWrap> },
  { name: 'SidebarFooter', grouping: 'vegvisir', importPath: '@/components/vegvisir/Sidebar', render: () => <SidebarWrap><SidebarFooter name="A vessel" /></SidebarWrap> },
  { name: 'SortDropdown', grouping: 'vegvisir', importPath: '@/components/vegvisir/SortDropdown', render: () => <SortDropdownDemo /> },
  { name: 'Tabs', grouping: 'vegvisir', importPath: '@/components/vegvisir/Tabs', render: () => <Tabs defaultValue="one"><TabsList><TabsTrigger value="one">One</TabsTrigger><TabsTrigger value="two">Two</TabsTrigger></TabsList><TabsPanel value="one"><p className={BOX}>The first panel.</p></TabsPanel><TabsPanel value="two"><p className={BOX}>The second panel.</p></TabsPanel></Tabs> },
  { name: 'TabsList', grouping: 'vegvisir', importPath: '@/components/vegvisir/Tabs', render: () => <Tabs defaultValue="one"><TabsList><TabsTrigger value="one">One</TabsTrigger><TabsTrigger value="two">Two</TabsTrigger></TabsList></Tabs> },
  { name: 'TabsTrigger', grouping: 'vegvisir', importPath: '@/components/vegvisir/Tabs', render: () => <Tabs defaultValue="one"><TabsList><TabsTrigger value="one">One</TabsTrigger></TabsList></Tabs> },
  { name: 'TabsPanel', grouping: 'vegvisir', importPath: '@/components/vegvisir/Tabs', render: () => <Tabs defaultValue="one"><TabsPanel value="one"><p className={BOX}>A panel.</p></TabsPanel></Tabs> },
  { name: 'AnimatedTabsPanel', grouping: 'vegvisir', importPath: '@/components/vegvisir/Tabs', render: () => <Tabs defaultValue="one"><AnimatedTabsPanel value="one"><p className={BOX}>A panel that fades in.</p></AnimatedTabsPanel></Tabs> },
  { name: 'IconTabsTrigger', grouping: 'vegvisir', importPath: '@/components/vegvisir/Tabs', render: () => <Tabs defaultValue="one"><TabsList><IconTabsTrigger value="one" icon={<Home size={14} />}>Home</IconTabsTrigger></TabsList></Tabs> },
  { name: 'BadgeTabsTrigger', grouping: 'vegvisir', importPath: '@/components/vegvisir/Tabs', render: () => <Tabs defaultValue="one"><TabsList><BadgeTabsTrigger value="one" badge={3}>Heralds</BadgeTabsTrigger></TabsList></Tabs> },

  // ── yggdrasil ────────────────────────────────────────────────────────────
  { name: 'Accordion', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Accordion', render: () => <Accordion defaultValue={['one']}><AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionContent>The first fold.</AccordionContent></AccordionItem><AccordionItem value="two"><AccordionTrigger>Two</AccordionTrigger><AccordionContent>The second fold.</AccordionContent></AccordionItem></Accordion> },
  { name: 'AccordionItem', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Accordion', render: () => <Accordion><AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionContent>The first fold.</AccordionContent></AccordionItem></Accordion> },
  { name: 'AccordionTrigger', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Accordion', render: () => <Accordion><AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionContent>The first fold.</AccordionContent></AccordionItem></Accordion> },
  { name: 'AccordionContent', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Accordion', render: () => <Accordion defaultValue={['one']}><AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionContent>The first fold.</AccordionContent></AccordionItem></Accordion> },
  { name: 'IconAccordionTrigger', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Accordion', render: () => <Accordion><AccordionItem value="one"><IconAccordionTrigger icon={<Sparkles size={14} />}>One</IconAccordionTrigger><AccordionContent>The first fold.</AccordionContent></AccordionItem></Accordion> },
  { name: 'NestedAccordion', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Accordion', render: () => <NestedAccordion level={2}><AccordionItem value="one"><AccordionTrigger>A nested fold</AccordionTrigger><AccordionContent>Its body.</AccordionContent></AccordionItem></NestedAccordion> },
  { name: 'Button', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Button', render: () => <Button>Sanctuary button</Button> },
  { name: 'IconButton', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Button', render: () => <IconButton icon={<Search size={16} />} aria-label="Search" /> },
  { name: 'Inline', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Inline', render: () => <Inline><Badge>One</Badge><Badge>Two</Badge></Inline> },
  { name: 'Label', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Label', render: () => <Label required>Display name</Label> },
  { name: 'Spinner', grouping: 'yggdrasil', importPath: '@/components/yggdrasil/Spinner', render: () => <Spinner /> },
];

export function entriesIn(grouping: Grouping): RegistryEntry[] {
  return REGISTRY.filter((entry) => entry.grouping === grouping);
}
