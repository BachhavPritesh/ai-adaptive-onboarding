const axios = require('axios');

async function testAuth() {
  console.log('🔐 Testing Registration...\n');
  
  try {
    // Test registration
    console.log('1. Registering user...');
    const registerRes = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: '123456'
    });
    
    console.log('✅ Registration successful!');
    console.log('Response:', registerRes.data);
    console.log('\nToken:', registerRes.data.data.token);
    
  } catch (error) {
    if (error.response) {
      console.log('❌ Error:', error.response.data);
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

testAuth();
