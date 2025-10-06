
export const config = {
    supabase: {
        url: process.env.SUPABASE_URL,
        anonKey: process.env.SUPABASE_ANON_KEY,
    },

    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
        chatModel: 'gemini-2.0-flash-exp'
    },

    huggingface: {
        apiKey: process.env.HUGGINGFACE_API_KEY, 
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
