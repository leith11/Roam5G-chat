# Roam5G Chat & To-Do App

App completa con:
1. **Roam5G Chat** - App di messagistica real-time
2. **To-Do List** - Gestione task con local storage

## 📁 Struttura Progetto

```
Roam5G-chat/
├── backend/          # API e WebSocket
├── frontend/         # Chat React App
├── todo-app/         # To-Do List App (NUOVO!)
└── README.md
```

## 🚀 Avvio Veloce

### Roam5G Chat
```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

### To-Do List App
```bash
cd todo-app
python -m http.server 8000
# Oppure
npx http-server
```

Poi apri:
- Chat: http://localhost:3000
- To-Do: http://localhost:8000

## ✨ Features

**Chat:**
- Registrazione con OTP
- Messaggi real-time
- Gruppi chat
- Status online/offline

**To-Do:**
- Aggiungi/Elimina task
- Segna come completato
- Local Storage persistente
- UI responsive
