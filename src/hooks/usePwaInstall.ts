import { useCallback, useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function detectPlatform(): 'ios' | 'android' | 'desktop' {
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios'
  }
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

export function usePwaInstall() {
  const [platform] = useState(detectPlatform)
  const [installed, setInstalled] = useState(isStandalone)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [apkAvailable, setApkAvailable] = useState(false)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }
    const mq = window.matchMedia('(display-mode: standalone)')
    const onDisplayChange = () => setInstalled(isStandalone())

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    mq.addEventListener('change', onDisplayChange)

    fetch('/downloads/bwt-trainer.apk', { method: 'HEAD' })
      .then((r) => setApkAvailable(r.ok))
      .catch(() => setApkAvailable(false))

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      mq.removeEventListener('change', onDisplayChange)
    }
  }, [])

  const canInstallPwa = !installed && Boolean(deferredPrompt)
  const canInstallIos = !installed && platform === 'ios'
  const showAndroidApk = platform === 'android' && apkAvailable && !installed

  const installPwa = useCallback(async () => {
    if (!deferredPrompt) return false
    setInstalling(true)
    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setInstalled(true)
        setDeferredPrompt(null)
        return true
      }
      return false
    } finally {
      setInstalling(false)
    }
  }, [deferredPrompt])

  return {
    platform,
    installed,
    installing,
    canInstallPwa,
    canInstallIos,
    showAndroidApk,
    apkUrl: '/downloads/bwt-trainer.apk',
    installPwa,
  }
}
