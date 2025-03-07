<!-- filepath: /c:/Users/Lee/Desktop/stock_management/frontend/src/components/BdcNewStock.vue -->
<template>
    <div class="insertinbdcstoke">
      <div class="input">
        <input type="text" v-model="toolname" placeholder="Tool name" />
      </div>
      <div class="input">
        <input type="number" v-model="amounttools" placeholder="Available amount in stock" />
      </div>
      <div class="submition">
        <button type="submit" class="button" @click="insertnewtool">Add</button>
      </div>
      <AlertsView ref="alertsView" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import AlertsView from './AlertsView.vue';
  
  export default {
    name: 'BdcNewStock',
  
    components: {
      AlertsView,
    },
  
    setup() {
      const toolname = ref('');
      const amounttools = ref('');
      const router = useRouter();
      const alertsView = ref(null);
  
      const insertnewtool = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/insert-new-bdc-stock', {
            toolname: toolname.value,
            availableinstock: amounttools.value, // Corrected field name
          });
          if (response.status === 200) {
            alertsView.value.showModel('Tool inserted in BDC Stock successfully');
            toolname.value = '';
            amounttools.value = '';
          } else {
            alertsView.value.showModel('All fields must be filled.');
          }
        } catch (err) {
          console.error('Error inserting new tool:', err);
          alertsView.value.showModel('Error inserting new tool.');
        }
      };
  
      return { toolname, amounttools, insertnewtool, alertsView, router };
    },
  };
  </script>
  
  <style scoped>
  .insertinbdcstoke {
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
    background-color: #af0a0a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #eb0101;
  }
  </style>