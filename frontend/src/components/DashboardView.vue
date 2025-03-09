<template>
  <div class="dashboard">
    <div class="main-content">
      <div class="header">
        <h2>Stocks Activity</h2>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
      </div>

      <div v-else>
        <div class="cards">
          <DashboardCard 
            class="dash total-stock" 
            :count="totalStock" 
            title="Total Stock" 
            color="bg-blue-500" 
            apiEndpoint="totalstock" 
          />
          <DashboardCard 
            class="dash low-stock" 
            :count="lowStockCount" 
            title="Low-Stock Alerts" 
            color="bg-red-500" 
            apiEndpoint="lowstock" 
          />
          <DashboardCard 
            class="dash pending-requests" 
            :count="pendingRequests" 
            title="Pending Requests" 
            color="bg-yellow-500" 
            apiEndpoint="pendingrequests" 
          />
          <DashboardCard 
            class="dash approved-requests" 
            :count="approvedRequests" 
            title="Approved Requests" 
            color="bg-green-500" 
            apiEndpoint="approvedrequests" 
          />
        </div>

        <div class="details">
          <div class="stocklife">
            <h3>Stock Life</h3>
            <div v-if="chartLoading" class="loading">
              <div class="spinner"></div>
            </div>
            <StockChart v-else />
          </div>

          <div class="top-selling">
            <h3>Top Requests Items</h3>
            <div v-if="topRequestsLoading" class="loading">
              <div class="spinner"></div>
            </div>
            <div v-else-if="topRequestItems.length > 0" class="items-list">
              <div v-for="(item, index) in topRequestItems" :key="index" class="item">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-count">{{ item.requestCount }}</div>
              </div>
            </div>
            <div v-else class="no-items">
              No request data available
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCard from "../components/DashboardCard.vue";
import StockChart from "../components/StockChart.vue";
import axios from 'axios';

export default {
  name: "DashboardView",
  components: {
    DashboardCard,
    StockChart,
  },
  data() {
    return {
      totalStock: 0,
      lowStockCount: 0,
      pendingRequests: 0,
      approvedRequests: 0,
      topRequestItems: [],
      loading: true,
      chartLoading: true,
      topRequestsLoading: true,
      error: null
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      this.loading = true;
      await Promise.all([
        this.fetchTotalStock(),
        this.fetchLowStockCount(),
        this.fetchPendingRequests(),
        this.fetchApprovedRequests()
      ]);
      this.loading = false;
      
      // Load secondary data
      this.fetchTopRequestItems();
    },
    
    async fetchTotalStock() {
      try {
        const response = await axios.get('http://localhost:3000/api/totalstock');
        if (response.status === 200) {
          this.totalStock = response.data.total;
          console.log("All tools in stock counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while totaling the stock", err);
        this.error = "Failed to load total stock data";
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
        this.error = "Failed to load low stock data";
      }
    },
    
    async fetchPendingRequests() {
      try {
        const response = await axios.get('http://localhost:3000/api/pendingrequests');
        if (response.status === 200) {
          this.pendingRequests = response.data.count;
          console.log("Pending requests counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching pending requests", err);
        this.error = "Failed to load pending requests data";
        this.pendingRequests = 0; // Fallback value
      }
    },
    
    async fetchApprovedRequests() {
      try {
        const response = await axios.get('http://localhost:3000/api/approvedrequests');
        if (response.status === 200) {
          this.approvedRequests = response.data.count;
          console.log("Approved requests counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching approved requests", err);
        this.error = "Failed to load approved requests data";
        this.approvedRequests = 0; // Fallback value
      }
    },
    
    async fetchTopRequestItems() {
      this.topRequestsLoading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/toprequests');
        if (response.status === 200) {
          this.topRequestItems = response.data.items;
          console.log("Top request items fetched successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching top request items", err);
        this.error = "Failed to load top requests data";
      } finally {
        this.topRequestsLoading = false;
      }
      
      // Simulate chart loading completion - remove this when your StockChart component
      // has its own loading state management
      setTimeout(() => {
        this.chartLoading = false;
      }, 1000);
    }
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  float: right;
  margin-left: 280px;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fb;
  min-height: 100vh;
}

.header h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
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
  transition: transform 0.2s, box-shadow 0.2s;
}

.dash:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
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

.stocklife h3, .top-selling h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.low-stock {
  color: #dc3545;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.items-list {
  margin-top: 10px;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.item:hover {
  background-color: #f9f9f9;
}

.item:last-child {
  border-bottom: none;
}

.item-name {
  font-weight: 500;
}

.item-count {
  background-color: #e9ecef;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 14px;
}

.no-items {
  color: #999;
  text-align: center;
  padding: 30px 0;
  font-style: italic;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard {
    margin-left: 0;
  }
  
  .cards {
    grid-template-columns: 1fr;
  }
  
  .details {
    flex-direction: column;
  }
  
  .main-content {
    padding: 15px;
  }
}
</style>x