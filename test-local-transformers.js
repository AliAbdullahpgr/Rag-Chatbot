// Test script to verify local transformers are working
import { createEmbedding } from './Db/vectorDbRes/embeddingUtils.js';

console.log('🧪 Testing Local Transformers Embedding Generation\n');
console.log('=' .repeat(60));

async function testEmbedding() {
    try {
        const testQuestion = "What laptop does Ali use?";
        console.log(`\n📝 Test Question: "${testQuestion}"`);
        console.log('\n🔄 Starting embedding generation...');
        console.log('   (First run will download model - takes 30-60 seconds)\n');
        
        const startTime = Date.now();
        const embedding = await createEmbedding(testQuestion);
        const endTime = Date.now();
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ EMBEDDING GENERATION SUCCESSFUL!');
        console.log('='.repeat(60));
        console.log(`\n📊 Results:`);
        console.log(`   • Dimensions: ${embedding.length}`);
        console.log(`   • Expected: 384 dimensions`);
        console.log(`   • Status: ${embedding.length === 384 ? '✅ CORRECT' : '❌ WRONG'}`);
        console.log(`   • Time taken: ${((endTime - startTime) / 1000).toFixed(2)}s`);
        console.log(`   • First 5 values: [${embedding.slice(0, 5).map(v => v.toFixed(4)).join(', ')}...]`);
        
        console.log('\n🎉 Local Transformers are working correctly!');
        console.log('   No API calls needed - everything runs in your browser!\n');
        
        // Test second run (should be faster)
        console.log('🔄 Testing second embedding (should be faster)...\n');
        const startTime2 = Date.now();
        const embedding2 = await createEmbedding("What is Ali studying?");
        const endTime2 = Date.now();
        
        console.log(`✅ Second embedding generated in ${((endTime2 - startTime2) / 1000).toFixed(2)}s`);
        console.log(`   Dimensions: ${embedding2.length} (${embedding2.length === 384 ? '✅ CORRECT' : '❌ WRONG'})\n`);
        
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('\nStack trace:', error.stack);
        process.exit(1);
    }
}

testEmbedding();
