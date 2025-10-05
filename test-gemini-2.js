// Test Gemini 2.0 Flash Experimental
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyC9WlrFYh7dw012iQvh3bdP7kWjSpghaSA';

async function testGemini2() {
  try {
    console.log('🔑 Testing Gemini 2.0 Flash Exp...');
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    console.log('📝 Sending test prompt...');
    const result = await model.generateContent('Say hello in one sentence');
    const response = result.response;
    const text = response.text();
    
    console.log('✅ gemini-2.0-flash-exp WORKS!');
    console.log('Response:', text);
    return true;
  } catch (error) {
    console.error('❌ API test FAILED');
    console.error('Error:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
    return false;
  }
}

testGemini2();
