import { createClient } from "@supabase/supabase-js";
import embeddings from './embeddings.js';

// ⚠️ REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://xnxknptxhsjfdzowgpnp.supabase.co' // e.g., 'https://xxxxx.supabase.co'
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGtucHR4aHNqZmR6b3dncG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzYxODEsImV4cCI6MjA3NTIxMjE4MX0.iS_Sm657cbOakO7oZCP8dHAwNzgE7ZCTU6LNPnihQjg' // Your public anon key

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function searchSimilar(questionEmbedding, options = {}) {
    const {
        matchThreshold = 0.5,
        matchCount = 5
    } = options;

    console.log("🔍 Searching for similar embeddings in Supabase...\n");

    try {
        const {data, error} = await supabase.rpc('match_documents', {
            query_embedding: questionEmbedding,
            match_threshold: matchThreshold,
            match_count: matchCount
        })
        
        if (error) throw error

        console.log(`✅ Found ${data.length} similar chunks!\n`)
        
        // Print each chunk with details
        if (data.length > 0) {
            console.log('='.repeat(70));
            console.log('SIMILARITY SEARCH RESULTS');
            console.log('='.repeat(70));
            
            data.forEach((chunk, index) => {
                console.log(`\n📄 Result #${index + 1}`);
                console.log(`   Similarity Score: ${(chunk.similarity * 100).toFixed(2)}%`);
                console.log(`   Chunk ID: ${chunk.id || 'N/A'}`);
                console.log(`   Content: ${chunk.content || chunk.text || 'N/A'}`);
                console.log('-'.repeat(70));
            });
            
            console.log('\n' + '='.repeat(70));
        } else {
            console.log('⚠️  No similar chunks found. Try lowering the match_threshold.');
        }
        
        return data
    }
    catch (error) {
        console.error("❌ Error during similarity search:", error.message);
        console.error("\nTroubleshooting:");
        console.error("1. Check if Supabase credentials are correct");
        console.error("2. Verify the 'match_documents' function exists in Supabase");
        console.error("3. Ensure your table has data with embeddings");
        return [];
    }
}

// Execute the search
console.log('Starting similarity search...');
console.log(`Question embedding dimension: ${embeddings.length}\n`);

const results = await searchSimilar(embeddings, {
    matchThreshold: 0.5,  // Minimum similarity (0-1)
    matchCount: 5         // Number of results to return
});

console.log(`\n✅ Search completed! Found ${results.length} results.`);


export default searchSimilar;