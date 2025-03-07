<template>
  <div class="dashboard">  
    <div class="main-content">
      <div class="header">
        <h2>Stocks Activity</h2>
      </div>

      <div class="cards">
        <DashboardCard class="dash total-stock" :count="totalStock" title="Total Stock" color="bg-blue-500" apiEndpoint="totalstock" />
        <DashboardCard class="dash low-stock" :count="lowStockCount" title="Low-Stock Alerts" color="bg-red-500" apiEndpoint="lowstock" />
        <DashboardCard class="dash pending-requests" count="0" title="Pending Requests" color="bg-yellow-500" />
        <DashboardCard class="dash approved-requests" count="0" title="Approved Requests" color="bg-green-500" />
      </div>

      <div class="details">
        <div class="stocklife">
          <h3>Stock Life</h3>
         
        </div>

        <div class="top-selling">
          <h3>Top Requests Items</h3>
          <!-- Items should be dynamically rendered here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCard from "../components/DashboardCard.vue";
import axios from 'axios';

export default {
  name: "DashboardView",
  components: {
    DashboardCard,
  },
  data() {
    return {
      totalStock: 0,
      lowStockCount: 0,
    };
  },
  mounted() {
    this.fetchTotalStock();
    this.fetchLowStockCount();
  },
  methods: {
    async fetchTotalStock() {
      try {
        const response = await axios.get('http://localhost:3000/api/totalstock');
        if (response.status === 200) {
          this.totalStock = response.data.total;
          console.log("All tools in stock counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while totaling the stock", err);
      }
    },
    async fetchLowStockCount() {
      try {
        const response = await axios.get('http://localhost:3000/api/lowstock');
        if (response.status === 200) {
          this.lowStockCount = response.data.lowStockItems.length;
          console.log("Low stock items counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching low stock items", err);
      }
    },
  },
};
</script>

<style>
.dashboard {
  display: flex;
  float: right;
  margin-left: 280px;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fb;
}

.header h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.dash {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.details {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.stocklife, .top-selling {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.low-stock {
  color: #dc3545;
}

.unconfirmed-items {
  color: #ffc107;
}
</style>