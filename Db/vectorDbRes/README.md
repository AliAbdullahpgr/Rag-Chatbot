# Supabase Vector Similarity Search 🔍

Query your Supabase database using semantic similarity search with embeddings!

## 🚨 Issues Fixed

### Before (❌ Broken):
1. ❌ `supabase` variable used but never created
2. ❌ No Supabase credentials provided
3. ❌ Search function never called
4. ❌ No output showing the found chunks
5. ❌ Missing import of embeddings

### After (✅ Fixed):
1. ✅ Supabase client properly initialized
2. ✅ Imports question embeddings
3. ✅ Automatically executes search
4. ✅ Pretty-prints all found chunks with similarity scores
5. ✅ Error handling with helpful troubleshooting messages

## 📋 Setup Instructions

### 1. **Get Supabase Credentials**

Go to your Supabase project:
- Dashboard → Settings → API
- Copy your **Project URL** and **anon/public key**

### 2. **Update `similaritySearch.js`**

Replace these lines with your actual credentials:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your URL
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your key
```

### 3. **Create Supabase Function**

You need a `match_documents` function in Supabase. Run this SQL in your Supabase SQL Editor:

```sql
-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create your documents table (if not exists)
CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(384)  -- 384 dimensions for all-MiniLM-L6-v2
);

-- Create the similarity search function
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(384),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
```

### 4. **Insert Sample Data** (Optional for testing)

```sql
INSERT INTO documents (content, embedding)
VALUES 
  ('Sample text about Ali Abdullah', array_fill(0.1, ARRAY[384])::vector),
  ('Another document', array_fill(0.2, ARRAY[384])::vector);
```

## 🚀 How to Run

```bash
cd c:/Downloads/Gpt/vectorDbRes
node similaritySearch.js
```

## 📊 Expected Output

```
Starting similarity search...
Question embedding dimension: 384

🔍 Searching for similar embeddings in Supabase...

✅ Found 3 similar chunks!

======================================================================
SIMILARITY SEARCH RESULTS
======================================================================

📄 Result #1
   Similarity Score: 87.45%
   Chunk ID: 123
   Content: Ali Abdullah is a software engineer...
----------------------------------------------------------------------

📄 Result #2
   Similarity Score: 76.32%
   Chunk ID: 124
   Content: Information about Ali...
----------------------------------------------------------------------

📄 Result #3
   Similarity Score: 65.18%
   Chunk ID: 125
   Content: Related content...
----------------------------------------------------------------------

======================================================================

✅ Search completed! Found 3 results.
```

## 📁 File Structure

```
vectorDbRes/
├── question.js           # Your search question
├── embeddings.js         # Generates embedding for the question
├── similaritySearch.js   # Searches Supabase (THIS FILE)
└── README.md            # This documentation
```

## 🔧 How It Works

### 1. **Question Embedding**
```javascript
// embeddings.js generates a 384-dimensional vector for:
"Who is Ali Abdullah?"
// → [0.123, -0.456, 0.789, ...]
```

### 2. **Similarity Search**
```javascript
// Searches Supabase for similar vectors using cosine similarity
const results = await supabase.rpc('match_documents', {
    query_embedding: embeddings,  // Your question vector
    match_threshold: 0.5,         // Min 50% similarity
    match_count: 5                // Return top 5 results
});
```

### 3. **Results**
Returns chunks sorted by similarity score with their content.

## ⚙️ Customization

### Change Match Threshold
```javascript
const results = await searchSimilar(embeddings, {
    matchThreshold: 0.7,  // Higher = more strict (70% similarity)
    matchCount: 10        // Return more results
});
```

### Different Questions
Edit `question.js`:
```javascript
export default {
    "question": "What is machine learning?"
}
```

## 🛠️ Troubleshooting

### Error: "relation 'documents' does not exist"
- Create the `documents` table using the SQL above

### Error: "function match_documents does not exist"
- Create the function using the SQL above

### Error: "column 'embedding' does not exist"
- Your table needs an `embedding` column of type `VECTOR(384)`

### No results found
- Check if your database has data
- Lower the `match_threshold` (try 0.3 or 0.1)
- Verify embeddings are stored in the database

### Wrong dimensions error
- Ensure database uses `VECTOR(384)` (not 768 or other)
- All-MiniLM-L6-v2 produces 384-dimensional embeddings

## 📈 Next Steps

1. **Populate Database**: Add your actual documents with embeddings
2. **RAG System**: Use retrieved chunks as context for LLM
3. **API Integration**: Wrap this in an API endpoint
4. **Caching**: Cache frequently searched questions
5. **Hybrid Search**: Combine with full-text search

## 🔗 Related Files

- `../vectorDb/` - For generating embeddings from documents
- `embeddings.js` - Generates query embeddings
- `question.js` - Define your search query

## 📚 Resources

- [Supabase Vector Guide](https://supabase.com/docs/guides/ai/vector-search)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [Sentence Transformers](https://www.sbert.net/)

---

**Made with ❤️ using Supabase + Hugging Face**
