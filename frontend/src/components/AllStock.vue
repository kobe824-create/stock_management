<!-- filepath: /C:/Users/Lee/Desktop/stock_management/frontend/src/components/AllStock.vue -->
<template>
    <div class="container">
      <div class="scrollable-content">
        <div class="bdcstock">
          <h2>BDC Stock</h2>
          <table>
            <thead>
              <tr>
                <th>Tool Name</th>
                <th>Available in Stock</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in bdcTools" :key="tool.toolname">
                <td>{{ tool.toolname }}</td>
                <td>{{ tool.availableinstock }}</td>
                <td>
                  <button type="button" class="delete-button" @click="deleteBdcTool(tool.toolname)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="pbwstock">
          <h2>PBW Stock</h2>
          <table>
            <thead>
              <tr>
                <th>Tool Name</th>
                <th>Available in Stock</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in pbwTools" :key="tool.toolname">
                <td>{{ tool.toolname }}</td>
                <td>{{ tool.availableinstock }}</td>
                <td>
                  <button type="button" class="delete-button" @click="deletePbwTool(tool.toolname)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="sodstock">
          <h2>SOD Stock</h2>
          <table>
            <thead>
              <tr>
                <th>Tool Name</th>
                <th>Available in Stock</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in sodTools" :key="tool.toolname">
                <td>{{ tool.toolname }}</td>
                <td>{{ tool.availableinstock }}</td>
                <td>
                  <button type="button" class="delete-button" @click="deleteSodTool(tool.toolname)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="csastock">
          <h2>CSA Stock</h2>
          <table>
            <thead>
              <tr>
                <th>Tool Name</th>
                <th>Available in Stock</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in csaTools" :key="tool.toolname">
                <td>{{ tool.toolname }}</td>
                <td>{{ tool.availableinstock }}</td>
                <td>
                  <button type="button" class="delete-button" @click="deleteCsaTool(tool.toolname)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'AllStock',
  
    setup() {
      const bdcTools = ref([]);
      const pbwTools = ref([]);
      const sodTools = ref([]);
      const csaTools = ref([]);
  
      const fetchBdcStock = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/bdc-stock');
          if (response.status === 200) {
            bdcTools.value = response.data.result;
            console.log("All BDC stock fetched successfully");
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      const fetchPbwStock = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/pbw-stock');
          if (response.status === 200) {
            pbwTools.value = response.data.result;
            console.log("All PBW stock fetched successfully");
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      const fetchSodStock = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/sod-stock');
          if (response.status === 200) {
            sodTools.value = response.data.result;
            console.log("All SOD stock fetched successfully");
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      const fetchCsaStock = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/csa-stock');
          if (response.status === 200) {
            csaTools.value = response.data.result;
            console.log("All CSA stock fetched successfully");
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      const deleteBdcTool = async (toolname) => {
        try {
          const response = await axios.delete('http://localhost:3000/api/delete-bdc-stock', {
            data: { toolname }
          });
          if (response.status === 200) {
            bdcTools.value = bdcTools.value.filter(tool => tool.toolname !== toolname);
            console.log('Tool deleted successfully');
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      const deletePbwTool = async (toolname) => {
        try {
          const response = await axios.delete('http://localhost:3000/api/delete-pbw-stock', {
            data: { toolname }
          });
          if (response.status === 200) {
            pbwTools.value = pbwTools.value.filter(tool => tool.toolname !== toolname);
            console.log('Tool deleted successfully');
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      const deleteSodTool = async (toolname) => {
        try {
          const response = await axios.delete('http://localhost:3000/api/delete-sod-stock', {
            data: { toolname }
          });
          if (response.status === 200) {
            sodTools.value = sodTools.value.filter(tool => tool.toolname !== toolname);
            console.log('Tool deleted successfully');
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      const deleteCsaTool = async (toolname) => {
        try {
          const response = await axios.delete('http://localhost:3000/api/delete-csa-stock', {
            data: { toolname }
          });
          if (response.status === 200) {
            csaTools.value = csaTools.value.filter(tool => tool.toolname !== toolname);
            console.log('Tool deleted successfully');
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      onMounted(() => {
        fetchBdcStock();
        fetchPbwStock();
        fetchSodStock();
        fetchCsaStock();
      });
  
      return {
        bdcTools,
        pbwTools,
        sodTools,
        csaTools,
        fetchBdcStock,
        fetchPbwStock,
        fetchSodStock,
        fetchCsaStock,
        deleteBdcTool,
        deletePbwTool,
        deleteSodTool,
        deleteCsaTool,
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin: 5px auto;
    width: 80%;
    padding: 20px;
    background-color: #f9f9f9;
    margin-left: 100px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .scrollable-content {
    max-height: 80vh;
    overflow-y: auto;
    padding-right: 10px; /* Add some padding to avoid scrollbar overlap */
  }
  
  .bdcstock, .pbwstock, .sodstock, .csastock {
    margin-bottom: 40px;
  }
  
  .bdcstock h2, .pbwstock h2, .sodstock h2, .csastock h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
    color: #333;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  .delete-button {
    padding: 8px 12px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .delete-button:hover {
    background-color: #ff1a1a;
  }
  </style>