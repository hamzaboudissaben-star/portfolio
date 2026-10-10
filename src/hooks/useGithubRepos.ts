import { useEffect, useState } from 'react';
import { profile } from '../data/portfolio';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
}

function usernameFrom(url: string, fallback: string): string {
  try {
    const parts = new URL(url).pathname.split('/').filter(Boolean);
    return parts[0] || fallback;
  } catch {
    return fallback;
  }
}

const GH_USER =
  (import.meta.env.VITE_GITHUB_USER as string | undefined) ||
  usernameFrom(profile.socials.github, 'hamzaboudissaben-star');

const CACHE_KEY = 'hb-gh-repos-v1';

export default function useGithubRepos(limit = 6) {
  // instant cache read during render (no cascading effect render)
  const [repos, setRepos] = useState<GithubRepo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]') as GithubRepo[];
    } catch {
      return [];
    }
  });
  const [live, setLive] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=${limit}`)
      .then((r) => {
        if (r.status === 404) {
          // username doesn't exist — keep cache, hide panel if empty
          if (!cancelled) setNotFound(true);
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((data) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        const mapped: GithubRepo[] = data.map((d: Record<string, unknown>) => ({
          id: d.id as number,
          name: d.name as string,
          description: (d.description as string | null) ?? null,
          language: (d.language as string | null) ?? null,
          stars: (d.stargazers_count as number) ?? 0,
          url: (d.html_url as string) ?? profile.socials.github,
        }));
        setRepos(mapped);
        setLive(true);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(mapped));
        } catch { /* ignore */ }
      })
      .catch(() => { /* keep cached fallback, panel hides if empty */ });
    return () => { cancelled = true; };
  }, [limit]);

  // show panel only when we have something to display
  const show = live || repos.length > 0;
  return { repos, live, user: GH_USER, show, notFound };
}
