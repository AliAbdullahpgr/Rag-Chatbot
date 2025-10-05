// Reusable similarity search utilities for RAG workflow
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xnxknptxhsjfdzowgpnp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGtucHR4aHNqZmR6b3dncG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzYxODEsImV4cCI6MjA3NTIxMjE4MX0.iS_Sm657cbOakO7oZCP8dHAwNzgE7ZCTU6LNPnihQjg';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Search for similar documents in Supabase using cosine similarity
 * Same logic as similaritySearch.js but as a reusable function
 * 
 * @param {number[]} queryEmbedding - 384-dimensional embedding vector
 * @param {number} matchThreshold - Similarity threshold (0.0-1.0), default 0.3
 * @param {number} matchCount - Number of results to return, default 5
 * @returns {Promise<Array>} Array of matching documents with similarity scores
 */
export async function searchSimilar(queryEmbedding, matchThreshold = 0.3, matchCount = 5) {
    try {
        console.log(`🔍 Searching for ${matchCount} documents with threshold ${matchThreshold}`);
        console.log(`📊 Query embedding dimensions: ${queryEmbedding.length}`);

        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: queryEmbedding,
            match_threshold: matchThreshold,
            match_count: matchCount
        });

        if (error) {
            console.error('❌ Supabase RPC error:', error);
            throw error;
        }

        console.log(`✅ Found ${data?.length || 0} matching documents`);
        return data || [];
    } catch (error) {
        console.error('❌ Search error:', error.message);
        throw error;
    }
}

export default searchSimilar;
