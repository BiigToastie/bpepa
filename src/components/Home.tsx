import type { CSSProperties } from 'react'
import { useRef } from 'react'
import { categories } from '../data/exercises'
import { getCategoryProgress, resetProgress } from '../hooks/useProgress'
import { AppShell } from './AppShell'

interface Props {
  onSelectCategory: (id: string) => void
}

const FEATURES = [
  {
    step: '01',
    icon: '🎯',
    title: 'Kategorie wählen',
    text: '7 Aufgabentypen wie im echten BPS-Test – von Wort-Analogien bis Textaufgaben.',
  },
  {
    step: '02',
    icon: '⚡',
    title: 'Schwierigkeit setzen',
    text: 'Standard, Schwer oder Extrem – du bestimmst das Tempo und den Anspruch.',
  },
  {
    step: '03',
    icon: '💡',
    title: 'Sofort verstehen',
    text: 'Jede Antwort mit Erklärung und optionalem Tipp – so lernst du wirklich.',
  },
]

export function Home({ onSelectCategory }: Props) {
  const categoriesRef = useRef<HTMLElement>(null)
  const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0)
  const totalDone = categories.reduce((sum, c) => {
    const p = getCategoryProgress(c.id, c.questions.map((q) => q.id))
    return sum + p.done
  }, 0)
  const totalCorrect = categories.reduce((sum, c) => {
    const p = getCategoryProgress(c.id, c.questions.map((q) => q.id))
    return sum + p.correct
  }, 0)

  function scrollToCategories() {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AppShell width="full">
      <div className="landing">
        <nav className="landing-nav" aria-label="Hauptnavigation">
          <button type="button" className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="nav-brand-icon">🧠</span>
            <span className="nav-brand-text">BWT Trainer</span>
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={scrollToCategories}>
            Übungen
          </button>
        </nav>

        <section className="landing-hero">
          <div className="hero-content">
            <span className="hero-badge">Berufspsychologischer Service · BPS</span>
            <h1 className="hero-title">
              Bereit für den
              <span className="gradient-text"> Eignungstest</span>
            </h1>
            <p className="hero-lead">
              Übe intuitiv alle Aufgabentypen des Berufspsychologischen Service –
              mobil unterwegs oder am PC, in deinem Tempo und mit sofortigem Feedback.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn--primary btn--lg" onClick={scrollToCategories}>
                Jetzt üben
              </button>
              <button type="button" className="btn btn--ghost btn--lg" onClick={scrollToCategories}>
                Kategorien ansehen
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>{totalQuestions}</strong>
                <span>Aufgaben</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <strong>7</strong>
                <span>Kategorien</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <strong>3</strong>
                <span>Schwierigkeiten</span>
              </div>
            </div>
            {totalDone > 0 && (
              <div className="hero-progress glass-panel">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(totalDone / totalQuestions) * 100}%` }}
                  />
                </div>
                <p>
                  Dein Fortschritt: <strong>{totalDone}</strong> von {totalQuestions} bearbeitet ·{' '}
                  <strong>{totalCorrect}</strong> richtig
                </p>
              </div>
            )}
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="hero-card hero-card--1 glass-panel">
              <span>💬</span>
              <p>Wort-Beziehungen</p>
            </div>
            <div className="hero-card hero-card--2 glass-panel">
              <span>🔢</span>
              <p>Zahlenreihen</p>
            </div>
            <div className="hero-card hero-card--3 glass-panel">
              <span>📐</span>
              <p>Räumliches Denken</p>
            </div>
            <div className="hero-ring" />
          </div>
        </section>

        <section className="landing-features">
          <div className="section-head">
            <span className="section-label">So einfach geht's</span>
            <h2>In drei Schritten fit werden</h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <article key={f.step} className="feature-card glass-panel">
                <span className="feature-step">{f.step}</span>
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-categories" id="kategorien" ref={categoriesRef}>
          <div className="section-head">
            <span className="section-label">Übungsbereiche</span>
            <h2>Wähle deine Kategorie</h2>
            <p className="section-sub">
              Jede Sektion enthält über 14 Aufgaben in drei Schwierigkeitsstufen.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((cat) => {
              const ids = cat.questions.map((q) => q.id)
              const { done, correct } = getCategoryProgress(cat.id, ids)
              const pct = ids.length > 0 ? (done / ids.length) * 100 : 0

              return (
                <button
                  key={cat.id}
                  type="button"
                  className="category-card-v2 glass-panel"
                  onClick={() => onSelectCategory(cat.id)}
                  style={{ '--card-gradient': cat.gradient } as CSSProperties}
                >
                  <div className="category-card-v2-top">
                    <span className="category-card-v2-icon">{cat.icon}</span>
                    <span className="category-card-v2-arrow" aria-hidden>→</span>
                  </div>
                  <h3>{cat.title}</h3>
                  <p>{cat.questions.length} Aufgaben · Standard · Schwer · Extrem</p>
                  {done > 0 && (
                    <div className="category-card-v2-progress">
                      <div className="mini-progress-bar">
                        <div className="mini-progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span>{correct}/{done} richtig</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        <footer className="landing-footer">
          <p>
            Basierend auf Beispielaufgaben des Berufspsychologischen Service der
            Bundesagentur für Arbeit (BPS).
          </p>
          {totalDone > 0 && (
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                resetProgress()
                window.location.reload()
              }}
            >
              Fortschritt zurücksetzen
            </button>
          )}
        </footer>
      </div>
    </AppShell>
  )
}
