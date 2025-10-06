
export const config = {
    supabase: {
        url: import.meta.env.VITE_SUPABASE_URL,
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    },

    gemini: {
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        chatModel: 'gemini-2.0-flash-exp',
    },

    huggingface: {
        apiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY,
        embeddingModel: 'BAAI/bge-small-en-v1.5',
        
    },

    rag: {
        chunkSize: 1000,
        chunkOverlap: 200,
        matchThreshold: 0.2,
        matchCount: 5,
        embeddingDimensions: 384,
    },

    database: {
        tableName: 'documents',
        rpcFunctionName: 'match_documents',
    },
}

export default config;
