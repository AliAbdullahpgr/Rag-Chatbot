// RAG AI Configuration
// Add your credentials here

export const config = {
  // Supabase Configuration
  supabase: {
    url: 'https://xnxknptxhsjfdzowgpnp.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGtucHR4aHNqZmR6b3dncG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzYxODEsImV4cCI6MjA3NTIxMjE4MX0.iS_Sm657cbOakO7oZCP8dHAwNzgE7ZCTU6LNPnihQjg'
  },

  // Gemini API Configuration
  gemini: {
    apiKey: 'AIzaSyC9WlrFYh7dw012iQvh3bdP7kWjSpghaSA',
    chatModel: 'gemini-2.0-flash-exp' // Using experimental model that's currently available
  },

  // RAG Settings
  rag: {
    chunkSize: 1000,        // Characters per chunk
    chunkOverlap: 200,      // Overlap between chunks
    matchThreshold: 0.3,    // Minimum similarity score (0-1)
    matchCount: 5,          // Number of similar chunks to retrieve
    embeddingDimensions: 384 // Hugging Face all-MiniLM-L6-v2 creates 384-dimensional vectors
  },

  // Database
  database: {
    tableName: 'documents',
    rpcFunctionName: 'match_documents'
  }
};

export default config;
