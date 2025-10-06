import { createClient } from "@supabase/supabase-js";
import embeddings from './embeddings.js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY =
    import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function searchSimilar(questionEmbedding, options = {}) {
    const {
        matchThreshold = 0.5,
        matchCount = 5
    } = options;

    console.log("Searching for similar embeddings in Supabase...\n");

    try {
        const {data, error} = await supabase.rpc('match_documents', {
            query_embedding: questionEmbedding,
            match_threshold: matchThreshold,
            match_count: matchCount
        })
        
        if (error) throw error

        console.log(`✅ Found ${data.length} similar chunks!\n`)
        
        if (data.length > 0) {
            console.log('='.repeat(70));
            console.log('SIMILARITY SEARCH RESULTS');
            console.log('='.repeat(70));
            
            data.forEach((chunk, index) => {
                console.log(`\n Result #${index + 1}`);
                console.log(`   Similarity Score: ${(chunk.similarity * 100).toFixed(2)}%`);
                console.log(`   Chunk ID: ${chunk.id || 'N/A'}`);
                console.log(`   Content: ${chunk.content || chunk.text || 'N/A'}`);
                console.log('-'.repeat(70));
            });
            
            console.log('\n' + '='.repeat(70));
        } else {
            console.log(' No similar chunks found. Try lowering the match_threshold.');
        }
        
        return data
    }
    catch (error) {
        console.error("   Error during similarity search:", error.message);
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
    matchThreshold: 0.5,  
    matchCount: 5        
});

console.log(`\n Search completed! Found ${results.length} results.`);


export default searchSimilar;