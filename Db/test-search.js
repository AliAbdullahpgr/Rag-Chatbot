import { createClient } from "@supabase/supabase-js";
import { pipeline } from '@xenova/transformers';

const SUPABASE_URL = 'https://xnxknptxhsjfdzowgpnp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGtucHR4aHNqZmR6b3dncG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzYxODEsImV4cCI6MjA3NTIxMjE4MX0.iS_Sm657cbOakO7oZCP8dHAwNzgE7ZCTU6LNPnihQjg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Test questions - these should find matches in your data
const testQuestions = [
    "What laptop does Ali use?",
    "Tell me about Ali's operating system",
    "What is Ali's university?",
    "What editor does Ali prefer?",
    "What is Ali studying?"
];

async function generateEmbedding(text) {
    console.log(`\n🔄 Generating embedding for: "${text}"`);
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
}

async function searchSimilar(questionEmbedding, question) {
    try {
        const {data, error} = await supabase.rpc('match_documents', {
            query_embedding: questionEmbedding,
            match_threshold: 0.3,  // Lower threshold for better results
            match_count: 3
        });
        
        if (error) throw error;

        console.log(`\n✅ Found ${data.length} results for: "${question}"\n`);
        
        if (data.length > 0) {
            console.log('='.repeat(70));
            data.forEach((chunk, index) => {
                console.log(`\n📄 Result #${index + 1}`);
                console.log(`   Similarity: ${(chunk.similarity * 100).toFixed(2)}%`);
                console.log(`   Content: ${chunk.content.substring(0, 150)}...`);
                console.log('-'.repeat(70));
            });
        } else {
            console.log('⚠️  No matches found');
        }
        
        return data;
    } catch (error) {
        console.error("❌ Error:", error.message);
        return [];
    }
}

// Run tests
console.log('\n' + '='.repeat(70));
console.log('🧪 TESTING SIMILARITY SEARCH WITH DIFFERENT QUESTIONS');
console.log('='.repeat(70));

for (const question of testQuestions) {
    const embedding = await generateEmbedding(question);
    await searchSimilar(embedding, question);
}

console.log('\n' + '='.repeat(70));
console.log('✅ TEST COMPLETE!');
console.log('='.repeat(70));
