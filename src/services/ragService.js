import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/ragConfig.js';

// Import existing vectorDbRes utilities - REUSING YOUR EXISTING CODE
import createEmbedding from '../../Db/vectorDbRes/embeddingUtils.js';
import searchSimilar from '../../Db/vectorDbRes/searchUtils.js';

// Initialize Gemini AI (only for chat responses)
let genAI = null;
let chatModel = null;

/**
 * Initialize Gemini API with API key (only for chat)
 */
export function initializeGemini(apiKey) {
  try {
    const key = apiKey || config.gemini.apiKey;
    if (!key || key === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error('Gemini API key is not configured');
    }
    console.log('🔑 Initializing Gemini with API key:', key.substring(0, 10) + '...');
    genAI = new GoogleGenerativeAI(key);
    chatModel = genAI.getGenerativeModel({ model: config.gemini.chatModel });
    console.log('✅ Gemini initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing Gemini:', error);
    return false;
  }
}

/**
 * Generate embedding for question using YOUR EXISTING vectorDbRes/embeddingUtils.js
 */
export async function generateEmbedding(text) {
  return await createEmbedding(text);
}

/**
 * Search for similar documents using YOUR EXISTING vectorDbRes/searchUtils.js
 */
export async function searchSimilarDocuments(queryEmbedding, options = {}) {
  const matchThreshold = options.matchThreshold || config.rag.matchThreshold;
  const matchCount = options.matchCount || config.rag.matchCount;
  
  return await searchSimilar(queryEmbedding, matchThreshold, matchCount);
}

/**
 * Generate AI response using Gemini with RAG context
 */
export async function generateRAGResponse(userQuestion, context) {
  try {
    if (!chatModel) {
      console.log('⚠️ Chat model not initialized, initializing now...');
      const initialized = initializeGemini();
      if (!initialized) {
        throw new Error('Failed to initialize Gemini API. Please check your API key in src/config/ragConfig.js');
      }
    }
    
    // Build enhanced prompt with context
    const enhancedPrompt = `You are an AI assistant. Use the following context to answer the user's question accurately and helpfully.

CONTEXT:
${context.map((doc, i) => `[${i + 1}] ${doc.content}`).join('\n\n')}

USER QUESTION: ${userQuestion}

INSTRUCTIONS:
- Answer based on the provided context
- If the context doesn't contain relevant information, say so politely
- Be concise but thorough
- Use a friendly, conversational tone

ANSWER:`;
    
    console.log('📝 Sending prompt to Gemini...');
    const result = await chatModel.generateContent(enhancedPrompt);
    const response = result.response;
    const text = response.text();
    console.log('✅ Received response from Gemini');
    return text;
  } catch (error) {
    console.error('❌ Error generating RAG response:', error);
    if (error.message && error.message.includes('API key')) {
      throw new Error('Invalid Gemini API key. Please check your API key in src/config/ragConfig.js');
    }
    throw error;
  }
}

/**
 * Complete RAG workflow: Question → Embedding → Search → Generate Response
 */
export async function ragWorkflow(userQuestion) {
  try {
    // Step 1: Generate embedding for the question
    console.log('🔄 Generating question embedding...');
    const questionEmbedding = await generateEmbedding(userQuestion);
    
    // Step 2: Search for similar documents
    console.log('🔍 Searching for similar documents...');
    const similarDocs = await searchSimilarDocuments(questionEmbedding);
    
    if (similarDocs.length === 0) {
      return {
        answer: "I don't have enough information in my knowledge base to answer this question. Please upload relevant documents first.",
        sources: []
      };
    }
    
    // Step 3: Generate response with context
    console.log('🤖 Generating AI response...');
    const answer = await generateRAGResponse(userQuestion, similarDocs);
    
    return {
      answer,
      sources: similarDocs.map(doc => ({
        content: doc.content,
        similarity: doc.similarity
      }))
    };
  } catch (error) {
    console.error('Error in RAG workflow:', error);
    throw error;
  }
}

export default {
  initializeGemini,
  generateEmbedding,
  searchSimilarDocuments,
  generateRAGResponse,
  ragWorkflow
};
