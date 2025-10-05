# Free Local Embeddings Generator 🚀

Generate text embeddings completely **FREE** and **LOCAL** using Hugging Face's sentence-transformers model - no API keys required!

## 📦 Installation

```bash
npm install @xenova/transformers
```

## 🎯 What This Does

This code uses the **all-MiniLM-L6-v2** model from Hugging Face to convert text chunks into 384-dimensional embedding vectors. The model runs entirely on your machine - no cloud API calls, no API keys, completely free!

## 🚀 How to Run

```bash
cd c:/Downloads/Gpt/vectorDb
node embeddings.js
```

## 📋 What Happens

1. **First Run**: Downloads the model (~90MB) - this only happens once
2. **Processing**: Generates embeddings for each text chunk
3. **Output**: Displays embedding dimensions and values
4. **Export**: Makes embeddings available for other modules

## 📊 Example Output

```
Loading sentence-transformers model (all-MiniLM-L6-v2)...
This will download the model on first run (~90MB). Please wait...

Processing 5 text chunks...

Generating embedding 1/5...
  → Embedding dimensions: 384
  → First 5 values: [0.0234, -0.0567, 0.1234, 0.0891, -0.0456...]
Generating embedding 2/5...
  → Embedding dimensions: 384
  → First 5 values: [0.0123, -0.0789, 0.0567, 0.0234, -0.0901...]
...

✅ All embeddings generated successfully!

============================================================
EMBEDDINGS SUMMARY
============================================================
Total chunks processed: 5
Embedding dimension: 384
Total embeddings: 5
============================================================
```

## 🔧 How It Works

### 1. **Model Loading**
```javascript
const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2'
);
```

### 2. **Generate Embeddings**
```javascript
const output = await extractor(chunk, { 
    pooling: 'mean',    // Average token embeddings
    normalize: true     // L2 normalization
});
```

### 3. **Convert to Array**
```javascript
const embedding = Array.from(output.data);
```

## 🎨 Features

✅ **100% Free** - No API costs  
✅ **Local Processing** - Runs on your machine  
✅ **No API Keys** - No sign-ups required  
✅ **High Quality** - Using proven sentence-transformers model  
✅ **Fast** - Cached after first download  
✅ **Private** - Your data never leaves your machine  

## 📁 File Structure

```
vectorDb/
├── data.js          # Your source text data
├── chunks.js        # Text chunking logic
├── embeddings.js    # Embedding generation (this file)
└── README.md        # This documentation
```

## 🛠️ Customization

### Change Model
```javascript
// Use a different model (larger = better quality but slower)
const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-mpnet-base-v2'  // 768 dimensions
);
```

### Change Chunk Size
Edit `chunks.js`:
```javascript
const chunks = chunkText(text, 500, 100);  // 500 chars, 100 overlap
```

## 💡 Use Cases

- **Semantic Search**: Find similar documents
- **RAG Systems**: Retrieval-Augmented Generation
- **Clustering**: Group similar texts
- **Recommendations**: Content similarity
- **Q&A Systems**: Match questions to answers

## 🔗 Next Steps

Use these embeddings with:
- Vector databases (Pinecone, Weaviate, Qdrant)
- Similarity search algorithms
- Machine learning pipelines
- RAG chatbots

## 📚 Model Information

**Model**: sentence-transformers/all-MiniLM-L6-v2
- **Dimensions**: 384
- **Max Tokens**: 256
- **Performance**: Good balance of speed and quality
- **Best For**: General-purpose semantic similarity

## 🆘 Troubleshooting

### Model Download Fails
- Check internet connection
- Try again - models are cached after first download

### Out of Memory
- Process chunks in smaller batches
- Use a smaller model

### Slow Performance
- First run is slower (downloading model)
- Subsequent runs use cached model
- Consider batch processing for large datasets

## 📝 License

This code uses the MIT-licensed @xenova/transformers library and the Apache 2.0 licensed all-MiniLM-L6-v2 model.

---

**Made with ❤️ using Hugging Face Transformers**
