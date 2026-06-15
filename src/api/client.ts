const API = '/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? 'Anfrage fehlgeschlagen')
  }
  return data as T
}

export interface User {
  id: number
  discordId: string
  displayName: string
  avatarUrl: string | null
}

export const api = {
  me: () => request<{ user: User }>('/auth/me'),
  authConfig: () => request<{ discord: boolean; auth: boolean }>('/auth/config'),
  logout: () => request<{ ok: boolean }>('/auth/logout', { method: 'POST' }),

  marathonState: (categoryIds: string[], questionMap: Record<string, { id: string }[]>) =>
    request<MarathonState>('/marathon/state', {
      method: 'POST',
      body: JSON.stringify({ categoryIds, questionMap }),
    }),

  marathonAnswer: (
    categoryId: string,
    questionId: string,
    correct: boolean,
    categoryIds: string[],
    questionMap: Record<string, { id: string }[]>,
  ) =>
    request<MarathonState>('/marathon/answer', {
      method: 'POST',
      body: JSON.stringify({ categoryId, questionId, correct, categoryIds, questionMap }),
    }),

  completeRun: (
    sections: MarathonSection[],
    totalAnswered: number,
    totalCorrect: number,
    categoryIds: string[],
    questionMap: Record<string, { id: string }[]>,
  ) =>
    request<{ ok: boolean; state: MarathonState }>('/marathon/complete-run', {
      method: 'POST',
      body: JSON.stringify({ sections, totalAnswered, totalCorrect, categoryIds, questionMap }),
    }),

  leaderboard: () => request<{ entries: LeaderboardEntry[] }>('/leaderboard'),
}

export function discordLoginUrl(returnTo = '/') {
  const q = returnTo && returnTo !== '/' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''
  return `${API}/auth/discord${q}`
}

export interface MarathonSection {
  categoryId: string
  total: number
  correctCount: number
  mastered: boolean
  pendingQuestionIds: string[]
}

export interface MarathonState {
  sections: MarathonSection[]
  allMastered: boolean
  pendingQuestions: { categoryId: string; questionId: string }[]
}

export interface LeaderboardEntry {
  rank: number
  displayName: string
  correctAnswers: number
  tracked: number
  totalAttempts: number
  lastRun: string | null
  accuracy: number
}
