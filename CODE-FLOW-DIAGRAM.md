# 🔄 RAG Workflow - Code Flow Diagram

## Exact Code Execution Path

```
┌─────────────────────────────────────────────────────────────────┐
│ USER TYPES QUESTION IN CHAT                                     │
│ "What laptop does Ali use?"                                     │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│ src/components/MainCard.jsx                                     │
│ → handleSubmit() triggered                                      │
│ → Calls: ragWorkflow(userQuestion)                             │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│ src/services/ragService.js → ragWorkflow()                     │
│                                                                  │
│ Step 1: Generate Embedding                                      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Code: generateEmbedding(question)                              │
│                                                                  │
│ Uses YOUR EXISTING CODE:                                        │
│ ✓ pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')  │
│ ✓ pooling: 'mean', normalize: true                             │
│ ✓ Returns 384-dimensional vector                                │
│                                                                  │
│ Same logic as: Db/vectorDbRes/embeddings.js                    │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│ src/services/ragService.js → ragWorkflow()                     │
│                                                                  │
│ Step 2: Search Similar Documents                                │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Code: searchSimilarDocuments(embedding)                        │
│                                                                  │
│ Uses YOUR EXISTING CODE:                                        │
│ ✓ supabase.rpc('match_documents', {                            │
│     query_embedding: embedding,                                 │
│     match_threshold: 0.3,                                       │
│     match_count: 5                                              │
│   })                                                            │
│ ✓ Returns array of matching chunks with similarity scores      │
│                                                                  │
│ Same logic as: Db/vectorDbRes/similaritySearch.js             │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│ src/services/ragService.js → ragWorkflow()                     │
│                                                                  │
│ Step 3: Generate AI Response (NEW)                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Code: generateRAGResponse(question, chunks)                    │
│                                                                  │
│ NEW CODE (uses Gemini):                                         │
│ ✓ Builds prompt with context from chunks                       │
│ ✓ Calls Gemini 2.0 Flash API                                   │
│ ✓ Returns natural language answer                              │
│                                                                  │
│ This is the ONLY new part!                                      │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│ src/components/MainCard.jsx                                     │
│ → Receives result: { answer, sources }                         │
│ → Displays AI response                                          │
│ → Shows source citations                                        │
│ → Updates chat UI                                               │
└─────────────────────────────────────────────────────────────────┘
```

## Code Mapping

### Your Existing Code (Untouched)

| File | Purpose | Status |
|------|---------|--------|
| `Db/vectorDb/data.js` | Source text (Ali's info) | ✅ Not changed |
| `Db/vectorDb/chunks.js` | Split text into chunks | ✅ Not changed |
| `Db/vectorDb/embeddings.js` | Generate embeddings | ✅ Not changed |
| `Db/vectorDb/supabase.js` | Store in database | ✅ Not changed |
| `Db/vectorDbRes/question.js` | Test questions | ✅ Not changed |
| `Db/vectorDbRes/embeddings.js` | Query embeddings | ✅ Logic copied to RAG service |
| `Db/vectorDbRes/similaritySearch.js` | Search database | ✅ Logic copied to RAG service |

### New Code Added

| File | Purpose | What It Does |
|------|---------|--------------|
| `src/config/ragConfig.js` | Configuration | Stores API keys, settings |
| `src/services/ragService.js` | RAG workflow | **Reuses your embed/search logic + adds Gemini** |
| `src/components/MainCard.jsx` (updated) | Chat UI | Calls RAG workflow, shows results |

## Function Mapping

### From `Db/vectorDbRes/embeddings.js` → `src/services/ragService.js`

```javascript
// YOUR CODE (Db/vectorDbRes/embeddings.js)
async function createEmbeddings(question) {
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    const output = await extractor(question, { pooling: 'mean', normalize: true })
    return Array.from(output.data)
}

// SAME LOGIC (src/services/ragService.js)
export async function generateEmbedding(text) {
    if (!embeddingExtractor) {
        embeddingExtractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    const output = await embeddingExtractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
}
```

### From `Db/vectorDbRes/similaritySearch.js` → `src/services/ragService.js`

```javascript
// YOUR CODE (Db/vectorDbRes/similaritySearch.js)
async function searchSimilar(questionEmbedding, options = {}) {
    const {data, error} = await supabase.rpc('match_documents', {
        query_embedding: questionEmbedding,
        match_threshold: matchThreshold,
        match_count: matchCount
    })
    return data
}

// SAME LOGIC (src/services/ragService.js)
export async function searchSimilarDocuments(queryEmbedding, options = {}) {
    const matchThreshold = options.matchThreshold || 0.3;
    const matchCount = options.matchCount || 5;
    
    const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: matchThreshold,
        match_count: matchCount
    });
    
    return data || [];
}
```

### NEW: Gemini Response Generation

```javascript
// NEW CODE (src/services/ragService.js)
export async function generateRAGResponse(userQuestion, context) {
    const enhancedPrompt = `
You are an AI assistant. Use the following context to answer the question.

CONTEXT:
${context.map((doc, i) => `[${i + 1}] ${doc.content}`).join('\n\n')}

USER QUESTION: ${userQuestion}

ANSWER:`;
    
    const result = await chatModel.generateContent(enhancedPrompt);
    return result.response.text();
}
```

## Data Flow Example

### Input: "What laptop does Ali use?"

```
1. Embedding Generation (YOUR CODE)
   Input: "What laptop does Ali use?"
   Process: Hugging Face all-MiniLM-L6-v2
   Output: [0.0234, -0.0567, ..., 0.0891] (384 numbers)

2. Vector Search (YOUR CODE)
   Input: [0.0234, -0.0567, ..., 0.0891]
   Process: Supabase match_documents()
   Output:
   [
     { content: "Laptop: Dell Latitude 7490...", similarity: 0.87 },
     { content: "8 GB RAM, 256 GB SSD...", similarity: 0.76 },
     { content: "8th Gen Intel processor...", similarity: 0.65 }
   ]

3. Response Generation (NEW CODE)
   Input: Question + 3 chunks above
   Process: Gemini 2.0 Flash API
   Output: "Ali uses a Dell Latitude 7490 laptop with 8 GB RAM,
            256 GB SSD, and an 8th Gen Intel processor."
```

## Summary

### What You Had Before
```
Db/vectorDb/        → Generate embeddings from documents
Db/vectorDbRes/     → Test similarity search
```

### What Was Added
```
src/services/ragService.js
  ├─ generateEmbedding()        ← Your code (copied)
  ├─ searchSimilarDocuments()   ← Your code (copied)
  └─ generateRAGResponse()      ← NEW (Gemini)
  
src/components/MainCard.jsx
  └─ Calls ragWorkflow()        ← NEW (orchestrates everything)
```

### What Didn't Change
- ✅ Your database (12 documents)
- ✅ Your embedding logic (384 dimensions)
- ✅ Your search function (match_documents)
- ✅ Your original files in Db/ folder

---

**You're reusing ~95% of your existing code. Only adding Gemini for final response!** ✅
