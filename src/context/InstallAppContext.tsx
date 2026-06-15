import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { InstallAppModal } from '../components/InstallAppModal'

interface InstallAppContextValue {
  openInstallModal: () => void
  closeInstallModal: () => void
}

const InstallAppContext = createContext<InstallAppContextValue | null>(null)

export function InstallAppProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openInstallModal = useCallback(() => setOpen(true), [])
  const closeInstallModal = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ openInstallModal, closeInstallModal }),
    [openInstallModal, closeInstallModal],
  )

  return (
    <InstallAppContext.Provider value={value}>
      {children}
      <InstallAppModal open={open} onClose={closeInstallModal} />
    </InstallAppContext.Provider>
  )
}

export function useInstallApp() {
  const ctx = useContext(InstallAppContext)
  if (!ctx) throw new Error('useInstallApp muss innerhalb von InstallAppProvider verwendet werden')
  return ctx
}
