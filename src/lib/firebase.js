import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, signInAnonymously } from 'firebase/auth'

// ── CONFIGURACIÓN FIREBASE ─────────────────────────────────────────
// Reemplaza estos valores con los de tu proyecto Firebase
// Panel: https://console.firebase.google.com → Project Settings → Tu app web
const firebaseConfig = {
  apiKey:            'AIzaSyBBhq__ftphQ_13mBJ2t76MirAUFFi6UuU',
  authDomain:        'mundial2026-a94d2.firebaseapp.com',
  databaseURL:       'https://mundial2026-a94d2-default-rtdb.firebaseio.com',
  projectId:         'mundial2026-a94d2',
  storageBucket:     'mundial2026-a94d2.firebasestorage.app',
  messagingSenderId: '844399128536',
  appId:             '1:844399128536:web:a3d77f76d8f661b8724cad',
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(v => v !== '')

let app, db, auth

if (isFirebaseConfigured) {
  app  = initializeApp(firebaseConfig)
  db   = getDatabase(app)
  auth = getAuth(app)
}

export { db, auth, signInAnonymously }
