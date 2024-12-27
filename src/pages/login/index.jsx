import React from 'react';
import GoogleLoginBtn from './components/GoogleLoginBtn';
import supabase from '../../supabase';

const LoginPage = () => {
  const insertTestData = async () => {
    const { data, error } = await supabase
        .from('users')
        .insert({
            email: "test@example.com",
            name: "Test User",
        });

    if (error) {
        console.error("Error inserting test data:", error.message);
    } else {
        console.log("Test data inserted:", data);
    }
};


return (
  <div>
      <GoogleLoginBtn/>
      <button onClick={insertTestData}>테스트</button>
    </div>
  )
}

export default LoginPage
