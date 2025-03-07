<!-- filepath: /C:/Users/Lee/Desktop/stock_management/frontend/src/components/PbwNewStock.vue -->
<template>
    <div class="insertinpbwstock">
      <div class="input">
        <input type="text" v-model="toolname" placeholder="Tool name" />
      </div>
      <div class="input">
        <input type="number" v-model="availabletools" placeholder="Available amounts in stock" />
      </div>
      <button type="submit" class="button" @click="insertnewtool">Add</button>
      <AlertsView ref="alertsView" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import AlertsView from './AlertsView.vue';
  
  export default {
    name: 'PbwNewStock',
  
    components: {
      AlertsView,
    },
  
    setup() {
      const toolname = ref('');
      const availabletools = ref('');
      const router = useRouter();
      const alertsView = ref(null);
  
      const insertnewtool = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/insert-new-pbw-stock', {
            toolname: toolname.value,
            availabletools: availabletools.value,
          });
          if (response.status === 400) {
            alertsView.value.showModel('All fields must be filled.');
            
          } else {
            alertsView.value.showModel('Tool inserted in PBW Stock successfully');
            toolname.value = '';
            availabletools.value = '';
          }
        } catch (err) {
          console.error('Error inserting new tool:', err);
          alertsView.value.showModel('Something went wrong.');
        }
      };
  
      return { toolname, availabletools, insertnewtool, alertsView, router };
    },
  };
  </script>
  
  <style scoped>
  .insertinpbwstock {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .input {
    margin-bottom: 15px;
    width: 100%;
    padding: 10px;
  }
  
  .input input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .button {
    padding: 10px 20px;
    background-color: #ff4d4d; /* Mixed red color */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #ff1a1a; /* Darker red on hover */
  }
  </style>