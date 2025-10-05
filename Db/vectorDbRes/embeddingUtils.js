// Reusable embedding utilities for RAG workflow
// Uses @xenova/transformers to run model LOCALLY in browser (no API calls!)
import { pipeline, env } from '@xenova/transformers';

// Configure transformers environment
env.allowLocalModels = false; // Use CDN models
env.allowRemoteModels = true;

// Cache the pipeline to avoid reloading the model
let extractor = null;

/**
 * Generate embedding for a text using Hugging Face Transformers (LOCAL)
 * Returns 384-dimensional embedding (matches your database)
 */
export async function createEmbedding(text) {
    try {
        console.log('🔄 Generating embedding with LOCAL Transformers model...');
        
        // Initialize pipeline once and reuse
        if (!extractor) {
            console.log('📥 Loading all-MiniLM-L6-v2 model locally...');
            try {
                extractor = await pipeline(
                    'feature-extraction',
                    'Xenova/all-MiniLM-L6-v2',
                    {
                        // Explicit configuration to avoid ONNX backend issues
                        quantized: true, // Use smaller quantized model
                    }
                );
                console.log('✅ Model loaded successfully!');
            } catch (loadError) {
                console.error('❌ Error loading model:', loadError);
                throw new Error(`Model loading failed: ${loadError.message}`);
            }
        }
        
        // Generate embedding using local model
        const output = await extractor(text, { 
            pooling: 'mean', 
            normalize: true 
        });
        
        // Convert to array format
        const embedding = Array.from(output.data);
        
        console.log(`✅ Generated ${embedding.length}-dimensional embedding locally`);
        
        return embedding;
    } catch (error) {
        console.error('❌ Error generating embedding:', error);
        throw new Error(`Failed to generate embedding: ${error.message}`);
    }
}

export default createEmbedding;
