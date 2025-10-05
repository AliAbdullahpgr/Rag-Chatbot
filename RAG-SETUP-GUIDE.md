# 🤖 RAG AI Chatbot - Setup Guide

A Retrieval-Augmented Generation (RAG) chatbot using React, Supabase, Hugging Face embeddings, and Gemini AI.

## 🎯 Architecture Overview

```
User Question
    ↓
Hugging Face Embeddings (all-MiniLM-L6-v2)
    ↓
Vector Search in Supabase
    ↓
Retrieve Similar Chunks
    ↓
Gemini 2.0 Flash (Generate Response)
    ↓
Enhanced Answer to User
```

## 📋 Prerequisites

1. **Supabase Database** ✅ (Already set up!)
   - 12 documents with embeddings stored
   - `match_documents` function configured
   - pgvector extension enabled

2. **Gemini API Key** ⚠️ (You need to add this)
   - Get free API key from: https://aistudio.google.com/app/apikey

## 🚀 Quick Start

### Step 1: Add Your Gemini API Key

Edit `src/config/ragConfig.js`:

```javascript
gemini: {
  apiKey: 'YOUR_GEMINI_API_KEY_HERE', // ← Add your key here
  chatModel: 'gemini-2.0-flash-exp'
},
```

### Step 2: Install Dependencies (if needed)

```bash
npm install
```

Dependencies already in package.json:
- `@xenova/transformers` - Hugging Face embeddings
- `@google/generative-ai` - Gemini chat API
- `@supabase/supabase-js` - Database connection

### Step 3: Run the Application

```bash
npm run dev
```

Open http://localhost:5173

## 🔧 How It Works

### 1. **User Asks Question**
```
"What laptop does Ali use?"
```

### 2. **Generate Question Embedding**
- Uses **Hugging Face all-MiniLM-L6-v2** model
- Creates 384-dimensional vector
- Runs locally in browser (no API calls!)

### 3. **Search Vector Database**
- Queries Supabase with question embedding
- Uses cosine similarity search
- Returns top 5 most relevant chunks (configurable)
- Minimum 30% similarity threshold

### 4. **Retrieve Context**
```
Found 3 relevant chunks:
- Chunk 1: "Laptop: Dell Latitude 7490..." (87% match)
- Chunk 2: "OS: Arch Linux + Hyprland..." (76% match)
- Chunk 3: "Editor: Neovim with AIChat..." (65% match)
```

### 5. **Generate AI Response**
- Sends context + question to **Gemini 2.0 Flash**
- Gemini creates natural language response
- Based on retrieved context only
- Won't make up information

### 6. **Display Answer**
```
"Ali uses a Dell Latitude 7490 with 8 GB RAM, 256 GB SSD, 
and 8th Gen Intel processor. He runs Arch Linux with Hyprland 
as his custom setup."

📚 Sources: 3 relevant chunks shown
```

## 📁 Project Structure

```
src/
├── config/
│   └── ragConfig.js          # Configuration (Supabase, Gemini, RAG settings)
├── services/
│   └── ragService.js         # RAG workflow logic
├── components/
│   ├── MainCard.jsx          # Chat interface (UPDATED with RAG)
│   ├── Sidebar.jsx           # Navigation sidebar
│   └── FileUpload.jsx        # (Not used - DB pre-populated)
└── App.jsx                   # Main app component

Db/
├── vectorDb/                 # Scripts for populating database
│   ├── supabase.js          # Insert documents
│   ├── embeddings.js        # Generate embeddings
│   └── chunks.js            # Split text
└── vectorDbRes/             # Scripts for testing search
    └── similaritySearch.js  # Test similarity search
```

## ⚙️ Configuration Options

Edit `src/config/ragConfig.js`:

```javascript
// Adjust similarity threshold (0-1)
matchThreshold: 0.3,  // Lower = more results, higher = stricter

// Number of chunks to retrieve
matchCount: 5,        // How many relevant chunks to use

// Gemini model selection
chatModel: 'gemini-2.0-flash-exp'  // or 'gemini-1.5-flash'
```

## 🧪 Testing

### Test the RAG Workflow

Open browser console and try:

```javascript
// Import the service
import { ragWorkflow } from './src/services/ragService.js'

// Test a question
const result = await ragWorkflow("What is Ali studying?")
console.log(result.answer)
console.log(result.sources)
```

### Test Questions to Try

✅ **Good Questions** (data exists):
- "What laptop does Ali use?"
- "Tell me about Ali's operating system"
- "What is Ali's university?"
- "What programming language does Ali prefer?"
- "What is Ali studying?"

❌ **Questions Without Data**:
- "What is Ali's typing speed?" (not in database)
- "Where does Ali live?" (not in database)

## 🔍 Troubleshooting

### Issue: "Error initializing Gemini"
**Solution:** Check your API key in `src/config/ragConfig.js`
- Get a free key: https://aistudio.google.com/app/apikey
- Make sure it's a valid API key string

### Issue: "No similar chunks found"
**Possible causes:**
1. Database is empty (run `Db/vectorDb/supabase.js` to populate)
2. Match threshold too high (lower it in config)
3. Question too different from document content

Check database:
```bash
cd Db
node check-database.js
```

### Issue: Slow first response
**Normal behavior!** 
- First run downloads Hugging Face model (~90MB)
- Model is cached for subsequent uses
- Only happens once per browser

### Issue: CORS errors
**Solution:** Supabase credentials might be wrong
- Verify `supabase.url` and `supabase.anonKey` in config

## 📊 Performance

| Operation | Time | Notes |
|-----------|------|-------|
| **First Load** | ~30s | Downloads HF model (once) |
| **Generate Embedding** | ~0.5s | Local, in-browser |
| **Vector Search** | ~0.1s | Supabase is fast! |
| **Gemini Response** | ~2-3s | API call |
| **Total Response** | ~3-4s | After first load |

## 🎨 Features

✅ **RAG Architecture** - Retrieval-Augmented Generation  
✅ **Local Embeddings** - Hugging Face in browser (free!)  
✅ **Vector Search** - Supabase with pgvector  
✅ **AI Responses** - Gemini 2.0 Flash (free tier available)  
✅ **Source Citations** - Shows which chunks were used  
✅ **Conversation Memory** - Maintains chat history  
✅ **Real-time Updates** - React state management  
✅ **Error Handling** - Graceful fallbacks  

## 🔒 Security Notes

- ⚠️ **API Key**: Don't commit your Gemini API key to version control
- ✅ **Supabase**: anon key is safe for client-side use
- ✅ **Embeddings**: Generated locally, no external API calls

## 📚 Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Vector database
- **pgvector** - Vector similarity search
- **Hugging Face Transformers** - Local embeddings (all-MiniLM-L6-v2)
- **Google Gemini** - AI response generation (2.0 Flash)
- **@xenova/transformers** - Run transformers in browser

## 🚀 Next Steps

1. **Get Gemini API Key** - https://aistudio.google.com/app/apikey
2. **Add to Config** - Edit `src/config/ragConfig.js`
3. **Run App** - `npm run dev`
4. **Start Chatting!** - Ask questions about Ali

## 💡 Tips

- **Specific Questions Work Best**: "What laptop?" vs "Tell me everything"
- **Context Matters**: Questions related to database content
- **Adjust Threshold**: Lower if no results, higher for precision
- **Check Sources**: See which chunks influenced the answer

---

## 📖 How to Add More Data

If you want to add more documents to the database:

```bash
cd Db/vectorDb

# 1. Edit data.js with your new content
# 2. Run the embedding and storage script
node supabase.js
```

This will:
- Split your text into chunks
- Generate embeddings using Hugging Face
- Store in Supabase with vectors

---

**Made with ❤️ using React, Supabase, Hugging Face, and Gemini AI**
