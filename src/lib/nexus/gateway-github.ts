// src/lib/nexus/gateway-github.ts
// GitHub's public API, read server-side with no credential of any kind.

import {
  missLine,
  parseRepoAddress,
  readableOnGitHub,
  type GatewayBeacon,
  type GitHubRead,
  type RepoAddress,
  type RepoFacts,
  type UserFacts,
} from './gateway-contract';

const GITHUB_API = 'https://api.github.com';
const GITHUB_ACCEPT = 'application/vnd.github+json';
const GITHUB_AGENT = 'audhdities-gateway';
const REVALIDATE_SECONDS = 3600;

/** The answer shape the reads need. */
export interface GatewayResponse {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}

export type GatewayFetch = (url: string, init?: RequestInit) => Promise<GatewayResponse>;

const houseFetch: GatewayFetch = (url, init) => fetch(url, init);

function record(body: unknown): Record<string, unknown> {
  return body && typeof body === 'object' ? (body as Record<string, unknown>) : {};
}

function text(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function count(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

async function readJson(url: string, fetcher: GatewayFetch): Promise<GitHubRead<unknown>> {
  let answer: GatewayResponse;
  try {
    answer = await fetcher(url, {
      headers: { Accept: GITHUB_ACCEPT, 'User-Agent': GITHUB_AGENT },
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch {
    return { facts: null, miss: missLine('no answer') };
  }
  if (!answer.ok) return { facts: null, miss: missLine(answer.status) };
  try {
    return { facts: await answer.json(), miss: null };
  } catch {
    return { facts: null, miss: missLine(answer.status) };
  }
}

/** One repo as GitHub holds it. */
export async function readRepoFacts(
  address: RepoAddress,
  fetcher: GatewayFetch = houseFetch
): Promise<GitHubRead<RepoFacts>> {
  const answer = await readJson(
    `${GITHUB_API}/repos/${encodeURIComponent(address.owner)}/${encodeURIComponent(address.repo)}`,
    fetcher
  );
  if (answer.miss !== null) return { facts: null, miss: answer.miss };
  const body = record(answer.facts);
  return {
    facts: {
      description: text(body.description),
      pushed_at: text(body.pushed_at),
      stargazers_count: count(body.stargazers_count),
      language: text(body.language),
      open_issues_count: count(body.open_issues_count),
      archived: body.archived === true,
    },
    miss: null,
  };
}

/** One profile as GitHub holds it. */
export async function readUserFacts(
  login: string,
  fetcher: GatewayFetch = houseFetch
): Promise<GitHubRead<UserFacts>> {
  const answer = await readJson(`${GITHUB_API}/users/${encodeURIComponent(login)}`, fetcher);
  if (answer.miss !== null) return { facts: null, miss: answer.miss };
  const body = record(answer.facts);
  return {
    facts: {
      name: text(body.name),
      bio: text(body.bio),
      public_repos: count(body.public_repos),
      followers: count(body.followers),
    },
    miss: null,
  };
}

/** A GitHub read for an open beacon only; null for every other beacon. */
export async function readBeaconFacts(
  beacon: GatewayBeacon,
  fetcher: GatewayFetch = houseFetch
): Promise<GitHubRead<RepoFacts> | null> {
  if (!readableOnGitHub(beacon)) return null;
  const address = parseRepoAddress(beacon.repo_url);
  if (!address) return null;
  return readRepoFacts(address, fetcher);
}
