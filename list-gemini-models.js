// List available Gemini models
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyC9WlrFYh7dw012iQvh3bdP7kWjSpghaSA';

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Try with the correct model name format
    const modelNames = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash-latest',
      'gemini-flash-1.5',
      'models/gemini-1.5-flash',
      'models/gemini-pro'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\n🔍 Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hello');
        const response = result.response;
        console.log(`✅ ${modelName} WORKS!`);
        console.log('Response:', response.text());
        break;
      } catch (error) {
        console.log(`❌ ${modelName} failed:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();
