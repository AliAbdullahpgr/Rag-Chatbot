import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 
 * @param {number[]} queryEmbedding 
 * @param {number} matchThreshold 
 * @param {number} matchCount 
 * @returns {Promise<Array>}
 */
export async function searchSimilar(queryEmbedding, matchThreshold = 0.3, matchCount = 5) {
    try {
        console.log(` Searching for ${matchCount} documents with threshold ${matchThreshold}`);
        console.log(` Query embedding dimensions: ${queryEmbedding.length}`);

        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: queryEmbedding,
            match_threshold: matchThreshold,
            match_count: matchCount
        });

        if (error) {
            console.error(' Supabase RPC error:', error);
            throw error;
        }

        console.log(` Found ${data?.length || 0} matching documents`);
        return data || [];
    } catch (error) {
        console.error(' Search error:', error.message);
        throw error;
    }
}

export default searchSimilar;
