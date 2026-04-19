// components/ui/index.ts
// Component Index - Single export file for all UI components
// Last Updated: April 18, 2026

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export {
  Stack,
  VStack,
  HStack,
  ResponsiveStack,
  type StackProps,
  type StackSpacing,
  type StackAlign,
  type StackJustify,
} from './Stack';

export {
  Grid,
  GridItem,
  ResponsiveGrid,
  DashboardGrid,
  MasonryGrid,
  FormGrid,
  type GridProps,
  type GridSpacing,
  type GridAlign,
  type GridJustify,
  type GridFlow,
} from './Grid';

export {
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
  type ContainerProps,
  type ContainerSize,
  type ContainerPadding,
} from './Container';

export {
  AspectRatio,
  SquareRatio,
  PhotoRatio,
  VideoRatio,
  VerticalVideoRatio,
  GoldenRatio,
  PortraitRatio,
  AspectRatioImage,
  AspectRatioVideo,
  AspectRatioEmbed,
  type AspectRatioProps,
  type AspectRatioValue,
  type ObjectFit,
} from './AspectRatio';

export {
  Spacer,
  VSpacer,
  HSpacer,
  FlexSpacer,
  TopSpacer,
  BottomSpacer,
  LeftSpacer,
  RightSpacer,
  SpacerGroup,
  type SpacerProps,
  type SpacerSize,
  type SpacerAxis,
  type SpacerDirection,
} from './Spacer';

export {
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
  SectionDivider,
  type DividerProps,
  type DividerVariant,
  type DividerOrientation,
  type DividerStyle,
} from './Divider';

export {
  ScrollArea,
  VScrollArea,
  HScrollArea,
  AutoHideScrollArea,
  ThinScrollArea,
  CardScrollArea,
  ScrollToTopButton,
  ScrollIndicator,
  type ScrollAreaProps,
  type ScrollbarVisibility,
  type ScrollOrientation,
} from './ScrollArea';

export {
  Flex,
  Row,
  Column,
  CenteredFlex,
  SpaceBetweenFlex,
  WrapFlex,
  ResponsiveFlex,
  FlexItem,
  type FlexProps,
  type FlexDirection,
  type FlexWrap,
  type FlexJustify,
  type FlexAlign,
  type FlexGap,
} from './Flex';

export {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  ImageSkeleton,
  CardSkeleton,
  ButtonSkeleton,
  BadgeSkeleton,
  CardSkeletonComponent,
  ListSkeleton,
  ProfileSkeleton,
  DashboardSkeleton,
  ChatSkeleton,
  type SkeletonProps,
  type SkeletonVariant,
  type SkeletonAnimation,
  type SkeletonSize,
} from './Skeleton';

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
  type TableVariant,
  type TableSize,
} from './Table';

export {
  Badge,
  BadgeGroup,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from './Badge';

export {
  Progress,
  CircularProgress,
  type ProgressProps,
  type ProgressVariant,
  type ProgressSize,
} from './Progress';

export {
  Avatar,
  AvatarGroup,
  type AvatarProps,
  type AvatarSize,
  type AvatarStatus,
} from './Avatar';

// ============================================================================
// CARD & SECTION COMPONENTS
// ============================================================================

export {
  Card,
  CardHeader,
  CardFooter,
  type CardProps,
} from './Card';

export {
  Section,
  MutedSection,
  GlowSection,
  GradientSection,
  GlassSection,
  HeroSection,
  SectionHeader,
  SectionDivider as SectionDividerComponent,
  SectionGroup,
  type SectionProps,
  type SectionSpacing,
  type SectionVariant,
} from './Section';

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
  AnimatedTabsPanel,
  IconTabsTrigger,
  BadgeTabsTrigger,
  type TabsProps,
  type TabsVariant,
  type TabsSize,
  type TabsOrientation,
} from './Tabs';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  IconAccordionTrigger,
  NestedAccordion,
  type AccordionProps,
  type AccordionType,
  type AccordionVariant,
  type AccordionSize,
} from './Accordion';

export {
  Pagination,
  CompactPagination,
  SimplePagination,
  PaginationInfo,
  type PaginationProps,
  type PaginationSize,
  type PaginationVariant,
} from './Pagination';

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbWithDropdown,
  type BreadcrumbProps,
  type BreadcrumbItem as BreadcrumbItemType,
  type BreadcrumbSize,
  type BreadcrumbSeparator as BreadcrumbSeparatorType,
} from './Breadcrumb';

export {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarNavItem,
  useSidebar,
  type SidebarProps,
  type SidebarItem,
  type SidebarVariant,
  type SidebarPosition,
} from './Sidebar';

// ============================================================================
// FORM COMPONENTS
// ============================================================================

export {
  Input,
  type InputProps,
  type InputSize,
  type InputVariant,
} from './Input';

export {
  Textarea,
  type TextareaProps,
  type TextareaSize,
} from './Textarea';

export {
  Select,
  type SelectProps,
  type SelectSize,
  type SelectOption,
} from './Select';

export {
  Checkbox,
  type CheckboxProps,
} from './Checkbox';

export {
  RadioGroup,
  Radio,
  type RadioGroupProps,
  type RadioProps,
  type RadioSize,
} from './Radio';

export {
  Switch,
  type SwitchProps,
  type SwitchSize,
} from './Switch';

export {
  Label,
  type LabelProps,
  type LabelSize,
} from './Label';

export {
  FormField,
  type FormFieldProps,
  type FormFieldSize,
  type FormFieldLayout,
} from './FormField';

export {
  Form,
  FormActions,
  useFormContext,
  type FormProps,
  type FormLayout,
  type FormSpacing,
} from './Form';

export {
  FormValidationProvider,
  ValidatedInput,
  ValidationSummary,
  ValidationSuccess,
  useFormValidation,
  type FormValidationProviderProps,
  type ValidatedInputProps,
  type ValidationResult,
  type ValidatorFunction,
} from './FormValidation';

// ============================================================================
// FEEDBACK COMPONENTS
// ============================================================================

export {
  Alert,
  InfoAlert,
  SuccessAlert,
  WarningAlert,
  ErrorAlert,
  QuantumAlert,
  AlertGroup,
  type AlertProps,
  type AlertVariant,
} from './Alert';

export {
  ToastProvider,
  Toaster,
  useToast,
  type Toast,
  type ToastProps,
  type ToastVariant,
  type ToastPosition,
} from './Toast';

export {
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
  type TooltipProviderProps,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type TooltipVariant,
  type TooltipSide,
  type TooltipAlign,
} from './Tooltip';

export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ConfirmationModal,
  useModal,
  type ModalProps,
  type ModalSize,
  type ModalPosition,
} from './Modal';

export {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FilterDrawer,
  useDrawer,
  type DrawerProps,
  type DrawerSide,
  type DrawerSize,
} from './Drawer';