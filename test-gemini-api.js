// Test Gemini API Key
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyC9WlrFYh7dw012iQvh3bdP7kWjSpghaSA';

async function testGeminiAPI() {
  try {
    console.log('🔑 Testing Gemini API with key:', API_KEY.substring(0, 10) + '...');
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    console.log('📝 Sending test prompt...');
    const result = await model.generateContent('Say hello in one sentence');
    const response = result.response;
    const text = response.text();
    
    console.log('✅ API Key is VALID!');
    console.log('Response:', text);
    return true;
  } catch (error) {
    console.error('❌ API Key test FAILED');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

testGeminiAPI();
