<!-- filepath: /C:/Users/Lee/Desktop/stock_management/frontend/src/components/AddStock.vue -->
<template>
  <div class="add-stock-page">
    <h1>Add New Stock</h1>
    <div class="cards-container">
      <div class="card" @click="toggleBdcForm">
        <h2>Add New Tool in BDC Stock</h2>
      </div>
      <div v-if="showBdcForm" class="modal">
        <div class="modal-content">
          <span class="close" @click="toggleBdcForm">&times;</span>
          <BdcNewStock @submit="handleSubmit('BDC stock added successfully!')" />
        </div>
      </div>

      <div class="card" @click="togglePbwForm">
        <h2>Add New Tool in PBW Stock</h2>
      </div>
      <div v-if="showPbwForm" class="modal">
        <div class="modal-content">
          <span class="close" @click="togglePbwForm">&times;</span>
          <PbwNewStock @submit="handleSubmit('PBW stock added successfully!')" />
        </div>
      </div>

      <div class="card" @click="toggleSodForm">
        <h2>Add New Tool in SOD Stock</h2>
      </div>
      <div v-if="showSodForm" class="modal">
        <div class="modal-content">
          <span class="close" @click="toggleSodForm">&times;</span>
          <SodNewStock @submit="handleSubmit('SOD stock added successfully!')" />
        </div>
      </div>
        
      <div class="card" @click="toggleCsaForm">
        <h2>Add New Tool in CSA Stock</h2>
      </div>
      <div v-if="showCsaForm" class="modal">
        <div class="modal-content">
          <span class="close" @click="toggleCsaForm">&times;</span>
          <CsaNewStock @submit="handleSubmit('CSA stock added successfully!')" />
        </div>
      </div>
    </div>
    <AlertsView v-if="showAlert" :message="alertMessage" @close="handleAlertClose" />
  </div>
</template>

<script>
import { ref } from 'vue';
import BdcNewStock from './BdcNewStock.vue';
import PbwNewStock from './PbwNewStock.vue';
import SodNewStock from './SodNewStock.vue';
import CsaNewStock from './CsaNewStock.vue';
import AlertsView from './AlertsView.vue';

export default {
  name: 'AddStock',
  components: {
    BdcNewStock,
    PbwNewStock,
    SodNewStock,
    CsaNewStock,
    AlertsView,
  },
  setup() {
    const showBdcForm = ref(false);
    const showPbwForm = ref(false);
    const showSodForm = ref(false);
    const showCsaForm = ref(false);
    const showAlert = ref(false);
    const alertMessage = ref('');

    const toggleBdcForm = () => {
      showBdcForm.value = !showBdcForm.value;
    };

    const togglePbwForm = () => {
      showPbwForm.value = !showPbwForm.value;
    };

    const toggleSodForm = () => {
      showSodForm.value = !showSodForm.value;
    };

    const toggleCsaForm = () => {
      showCsaForm.value = !showCsaForm.value;
    };

    const handleSubmit = (message) => {
      alertMessage.value = message;
      showAlert.value = true;
    };

    const handleAlertClose = () => {
      showAlert.value = false;
      showBdcForm.value = false;
      showPbwForm.value = false;
      showSodForm.value = false;
      showCsaForm.value = false;
    };

    return { showBdcForm, toggleBdcForm, showPbwForm, togglePbwForm, showSodForm, toggleSodForm, showCsaForm, toggleCsaForm, showAlert, alertMessage, handleSubmit, handleAlertClose };
  },
};
</script>

<style scoped>
.add-stock-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 0 20px;
}

h1 {
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #34495e;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.card {
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  background-color: #e0f7fa;
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>