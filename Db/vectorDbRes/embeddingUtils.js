import config from '../../src/config/ragConfig.js';

const HF_API_URL = 'https://api-inference.huggingface.co/models/BAAI/bge-small-en-v1.5';


export async function createEmbedding(text) {
    try {
        const apiKey = config.huggingface.apiKey;
        
        if (!apiKey || apiKey.startsWith('YOUR_')) {
            throw new Error('HuggingFace API key is not configured. Please set VITE_HUGGINGFACE_API_KEY in your .env file.')
        }
        
        console.log('🔄 Generating embedding with Hugging Face API...');
        
        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                inputs: text, 
                options: {
                    wait_for_model: true,
                    use_cache: true
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Response:', errorText);
            throw new Error(`HF API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        const embedding = Array.isArray(result) ? result : result[0];
        
        if (!embedding || !Array.isArray(embedding)) {
            throw new Error('Unexpected response format from HF API');
        }
        
        console.log(`Generated ${embedding.length}-dimensional embedding via API`);
        
        return embedding;
    } catch (error) {
        console.error(' Error generating embedding:', error);
        throw new Error(`Failed to generate embedding: ${error.message}`);
    }
}

export default createEmbedding;
