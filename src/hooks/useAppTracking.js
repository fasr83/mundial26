import { useEffect } from 'react'

const TRACKING_KEY = 'mundial26-tracking'

function getTracking() {
  try {
    return JSON.parse(localStorage.getItem(TRACKING_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveTracking(data) {
  try {
    localStorage.setItem(TRACKING_KEY, JSON.stringify(data))
  } catch {}
}

export function trackEvent(event, value = 1) {
  const data = getTracking()
  const today = new Date().toISOString().slice(0, 10)

  if (!data.events) data.events = {}
  if (!data.events[event]) data.events[event] = 0
  data.events[event] += value

  if (!data.daily) data.daily = {}
  if (!data.daily[today]) data.daily[today] = {}
  if (!data.daily[today][event]) data.daily[today][event] = 0
  data.daily[today][event] += value

  if (!data.firstVisit) data.firstVisit = new Date().toISOString()
  data.lastVisit = new Date().toISOString()

  saveTracking(data)
}

export function getTrackingData() {
  return getTracking()
}

export function useAppTracking(activeModule) {
  useEffect(() => {
    const data = getTracking()
    if (!data.firstVisit) {
      data.firstVisit = new Date().toISOString()
      data.sessions = 0
    }
    data.sessions = (data.sessions || 0) + 1
    data.lastVisit = new Date().toISOString()
    saveTracking(data)
    trackEvent('session')
  }, [])

  useEffect(() => {
    if (activeModule) trackEvent(`module_${activeModule}`)
  }, [activeModule])

  useEffect(() => {
    const handler = () => {
      trackEvent('pwa_install')
      const data = getTracking()
      data.pwaInstalled = true
      data.pwaInstalledAt = new Date().toISOString()
      saveTracking(data)
    }
    window.addEventListener('appinstalled', handler)
    return () => window.removeEventListener('appinstalled', handler)
  }, [])
}
