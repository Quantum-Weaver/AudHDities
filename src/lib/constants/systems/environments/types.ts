// lib/constants/systems/environments/types.ts

import type { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';

export type BaseEnvironmentKey = EnvironmentKey;

export interface PageMetadata {
  title: string;
  subtitle: string;
  environment: BaseEnvironmentKey;
}

export interface PageEnvironmentConfig {
  default: BaseEnvironmentKey;
  title: string;
  subtitle: string;
}

export type PageEnvironmentMap = Record<string, PageEnvironmentConfig>;

export interface HeaderTypography {
  title: string;
  subtitle: string;
  quote?: string;
}

export interface HeaderData {
  defaultTitle: string;
  showAncientQuoteDefault: boolean;
  environmentTitles: Record<BaseEnvironmentKey, string>;
  environmentSubtitles: Record<BaseEnvironmentKey, string>;
  pageTitles: Record<string, string>;
  pageSubtitles: Record<string, string>;
  typography: {
    default: HeaderTypography;
    mobile: HeaderTypography;
    desktop: HeaderTypography;
  };
}