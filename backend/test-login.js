const axios = require('axios');

async function testLogin() {
  console.log('🔐 Testing Login...\n');
  
  try {
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: '123456'
    });
    
    console.log('✅ Login successful!');
    console.log('User:', loginRes.data.data.name);
    console.log('Token:', loginRes.data.data.token);
    
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }
}

testLogin();
