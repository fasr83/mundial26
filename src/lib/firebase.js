import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, signInAnonymously } from 'firebase/auth'

// ── CONFIGURACIÓN FIREBASE ─────────────────────────────────────────
// Reemplaza estos valores con los de tu proyecto Firebase
// Panel: https://console.firebase.google.com → Project Settings → Tu app web
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || '',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL       || '',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || '',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| '',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '',
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(v => v !== '')

let app, db, auth

if (isFirebaseConfigured) {
  app  = initializeApp(firebaseConfig)
  db   = getDatabase(app)
  auth = getAuth(app)
}

export { db, auth, signInAnonymously }
