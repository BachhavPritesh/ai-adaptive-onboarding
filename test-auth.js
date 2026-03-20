const axios = require('axios');

async function testAuth() {
  console.log('🔐 Testing Authentication...\n');

  // Test 1: Register
  console.log('1. Registering user...');
  try {
    const registerRes = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Registration successful:', registerRes.data);
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message === 'User already exists') {
      console.log('⚠️ User already exists, proceeding to login...');
    } else {
      console.log('❌ Registration error:', error.response?.data || error.message);
    }
  }

  // Test 2: Login
  console.log('\n2. Logging in...');
  try {
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Login successful!');
    console.log('📧 User:', loginRes.data.data.email);
    console.log('🎫 Token:', loginRes.data.data.token);
    return loginRes.data.data.token;
  } catch (error) {
    console.log('❌ Login error:', error.response?.data || error.message);
  }
}

testAuth();
