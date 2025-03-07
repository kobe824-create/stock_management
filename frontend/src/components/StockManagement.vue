<!-- filepath: /C:/Users/Lee/Desktop/stock_management/frontend/src/components/StockManagement.vue -->
<template>
  <div class="content-container">
    <div class="top-bar">
      <div class="icons">
        <button :class="['stock-btn', { 'active-btn': !showAddStock && !showAllStock }]" @click="showOverview">
          <font-awesome-icon class="icon sidebar-icon" :icon="['fas', 'chart-line']" />
          <span class="btn-text">Overview</span>
        </button>
        <button :class="['stock-btn', { 'active-btn': showAddStock }]" @click="toggleAddStock">
          <font-awesome-icon class="icon sidebar-icon" :icon="['fas', 'plus-square']" />
          <span class="btn-text">Add Stock</span>
        </button>
        <button :class="['stock-btn', { 'active-btn': showAllStock }]" @click="toggleAllStock">
          <font-awesome-icon class="icon sidebar-icon" :icon="['fas', 'boxes-stacked']" />
          <span class="btn-text">All Stock</span>
        </button>
      </div>
    </div>
    
    <div class="content-area">
      <AddStock v-if="showAddStock" />
      <AllStock v-if="showAllStock" />
      <StockChart class="chart" v-if="!showAddStock && !showAllStock" />
    </div>
  </div>
</template>

<script>
import AddStock from './AddStock.vue';
import AllStock from './AllStock.vue';
import StockChart from './StockChart.vue';
import { ref } from 'vue';

export default {
  name: 'StockManagement',
  components: { AddStock, AllStock, StockChart },
  setup() {
    const showAddStock = ref(false);
    const showAllStock = ref(false);

    const toggleAddStock = () => {
      showAddStock.value = !showAddStock.value;
      showAllStock.value = false;
    };

    const toggleAllStock = () => {
      showAllStock.value = !showAllStock.value;
      showAddStock.value = false;
    };

    const showOverview = () => {
      showAddStock.value = false;
      showAllStock.value = false;
    };

    return { showAddStock, toggleAddStock, showAllStock, toggleAllStock, showOverview };
  }
};
</script>

<style scoped>
.content-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 260px; /* Adjust this based on your sidebar width */
  background-color: #f4f7f9;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.icons {
  display: flex;
  gap: 20px;
}

.stock-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  font-size: 1rem;
  background: #34495e;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
}

.stock-btn:hover {
  background: #2c3e50;
  transform: translateY(-2px);
}

.active-btn {
  background: #ff4d4d;
}

.active-btn:hover {
  background: #ff1a1a;
}

.icon {
  transition: 0.3s ease-in-out;
}

.sidebar-icon {
  font-size: 1.8rem;
  color: white;
}

.btn-text {
  font-size: 1rem;
}

.content-area {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>