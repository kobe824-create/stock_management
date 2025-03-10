<!-- filepath: c:\Users\Lee\Desktop\stock_management\stock_management\frontend\src\components\AdminLogin.vue -->
<template>
    <div class="container">
      <div class="form">
        <h2>Admin Login</h2>
        <div class="input">
          <input type="text" v-model="email" placeholder="Email">
        </div>
        <div class="input">
          <input type="password" v-model="password" placeholder="Password">
        </div>
        <div class="button">
          <button @click="login">Log In</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AdminLogin',
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
  
      const login = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/adminlogin', {
            email: email.value,
            password: password.value,
          });
          if (response.status === 200) {
            email.value = "";
            password.value = "";
            errorMessage.value = "";
            router.push('/dashboard');
          }
        } catch (err) {
          console.log("Something went wrong", err);
          errorMessage.value = "Invalid email or password";
        }
      };
  
      return { login, email, password, errorMessage };
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  .form h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .input {
    margin-bottom: 1rem;
  }
  
  .input input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button {
    margin-top: 1rem;
  }
  
  .button button {
    width: 100%;
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    margin-top: 1rem;
    color: #ff0000;
  }
  </style>