// Test the embedding utility with better error handling
import createEmbedding from './Db/vectorDbRes/embeddingUtils.js';

async function testEmbedding() {
  try {
    console.log('🧪 Testing embedding generation...');
    const text = 'Hello world';
    console.log(`📝 Input text: "${text}"`);
    
    const embedding = await createEmbedding(text);
    
    console.log('✅ Embedding generated successfully!');
    console.log(`📊 Embedding dimensions: ${embedding.length}`);
    console.log(`🔢 First 5 values: [${embedding.slice(0, 5).join(', ')}]`);
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

testEmbedding();
