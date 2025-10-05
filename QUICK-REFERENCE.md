# 🎯 RAG AI Workflow - Quick Reference

## Architecture Flow

```
┌─────────────┐
│    USER     │
│  Question   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Hugging Face Embedding Model       │
│  (all-MiniLM-L6-v2)                │
│  → Runs locally in browser          │
│  → Creates 384-dim vector           │
│  → NO API calls, FREE!              │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Supabase Vector Database           │
│  (pgvector + cosine similarity)     │
│  → Searches 12 pre-loaded docs      │
│  → Returns top 5 similar chunks     │
│  → 30% minimum similarity           │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Retrieved Context Chunks           │
│  [Chunk 1] 87% match                │
│  [Chunk 2] 76% match                │
│  [Chunk 3] 65% match                │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Gemini 2.0 Flash API              │
│  → Receives: Question + Context     │
│  → Generates: Natural response      │
│  → Based on retrieved chunks only   │
│  → Free tier available!             │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Enhanced AI Response               │
│  ✓ Accurate (uses real data)        │
│  ✓ Sourced (shows references)       │
│  ✓ Contextual (knows the docs)      │
└─────────────────────────────────────┘
```

## Key Components

### 1. **Embeddings** (Hugging Face)
- **Model**: all-MiniLM-L6-v2
- **Dimensions**: 384
- **Location**: Browser (local)
- **Speed**: ~0.5s per query
- **Cost**: FREE ✅

### 2. **Vector Database** (Supabase)
- **Storage**: 12 documents about Ali
- **Search**: Cosine similarity
- **Index**: IVFFlat for speed
- **Speed**: ~0.1s per search
- **Cost**: FREE tier ✅

### 3. **AI Response** (Gemini)
- **Model**: gemini-2.0-flash-exp
- **Purpose**: Generate natural language
- **Input**: Question + Retrieved context
- **Speed**: ~2-3s per response
- **Cost**: FREE tier (15 req/min) ✅

## File Responsibilities

| File | Purpose |
|------|---------|
| `src/config/ragConfig.js` | Configuration (API keys, settings) |
| `src/services/ragService.js` | RAG logic (embedding, search, generation) |
| `src/components/MainCard.jsx` | Chat UI with RAG integration |
| `Db/vectorDb/` | Scripts to populate database |
| `Db/vectorDbRes/` | Scripts to test similarity search |

## Configuration

```javascript
// src/config/ragConfig.js

supabase: {
  url: 'https://xnxknptxhsjfdzowgpnp.supabase.co',  // ✅ Set
  anonKey: 'ey...'                                   // ✅ Set
},

gemini: {
  apiKey: 'YOUR_KEY_HERE',                           // ⚠️ YOU ADD THIS
  chatModel: 'gemini-2.0-flash-exp'
},

rag: {
  matchThreshold: 0.3,  // 30% similarity required
  matchCount: 5         // Return top 5 chunks
}
```

## API Usage

```javascript
// Main RAG workflow
import { ragWorkflow } from './services/ragService'

const result = await ragWorkflow("What laptop does Ali use?")

// Result structure:
{
  answer: "Ali uses a Dell Latitude 7490...",
  sources: [
    { content: "...", similarity: 0.87 },
    { content: "...", similarity: 0.76 },
    { content: "...", similarity: 0.65 }
  ]
}
```

## Setup Checklist

- [x] Supabase database configured
- [x] Documents uploaded (12 docs)
- [x] Embeddings generated (384-dim)
- [x] match_documents function created
- [x] pgvector extension enabled
- [x] React app structure ready
- [x] RAG service implemented
- [x] Chat UI integrated
- [ ] **Gemini API key added** ← YOU DO THIS

## To Get Started

1. **Get Gemini API Key**
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Add to Config**
   ```javascript
   // src/config/ragConfig.js
   gemini: {
     apiKey: 'AIza...',  // Paste your key here
   }
   ```

3. **Run App**
   ```bash
   npm run dev
   ```

4. **Test Questions**
   - "What laptop does Ali use?"
   - "What is Ali studying?"
   - "Tell me about Ali's OS"

## Cost Breakdown

| Service | Usage | Cost |
|---------|-------|------|
| **Hugging Face** | Embeddings (local) | $0 FREE |
| **Supabase** | Vector DB (12 docs) | $0 FREE tier |
| **Gemini API** | Chat (15 req/min) | $0 FREE tier |
| **Total** | Fully functional RAG | **$0 per month!** |

## Performance

- **First load**: 30s (downloads HF model once)
- **Subsequent queries**: 3-4s total
  - Embedding: 0.5s (local)
  - Search: 0.1s (Supabase)
  - Response: 2-3s (Gemini API)

---

**Everything is set up! Just add your Gemini API key and start chatting!** 🚀
