import { pipeline } from '@xenova/transformers';
import chunks from './chunks.js';


async function createEmbeddings(chunks) {
    
    const extractor = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2'
    );
    
    const embeddings = [];
    
    
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        
        const output = await extractor(chunk, { pooling: 'mean', normalize: true });
        
        const embedding = Array.from(output.data);
        embeddings.push(embedding);
        
    }
    
    console.log('\n✅ All embeddings generated successfully!\n');
    return embeddings;
}

const embeddings = await createEmbeddings(chunks);

export default embeddings;